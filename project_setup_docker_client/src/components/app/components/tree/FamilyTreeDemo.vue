<template>
    <div>
        <div ref="tree" class="h-[100vh]"></div>
    </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import FamilyTree from '@balkangraph/familytree.js';
import apiService from '../../../../apiService';

export default {
    props: {
        dataTreeUsers: {
            type: Array,
            default: () => [],
        },
        treeId: {
            type: Number,
            default: null,
        },
    },
    data() {
        return {
            family: null,
            familyData: [],
            updateNodesData: [],
            fileUploaded: null,
        };
    },
    methods: {
        initTree() {
            FamilyTree.SEARCH_PLACEHOLDER = 'Nhập tên để tìm kiếm...';
            FamilyTree.templates.main = { ...FamilyTree.templates.base };
            // eslint-disable-next-line max-len, operator-linebreak
            FamilyTree.templates.tommy_male.field_2 =
                '<text class="field_2" style="font-size: 14px;" fill="#ffffff" x="10" y="40" text-anchor="start">{val}</text>';
            // eslint-disable-next-line max-len, operator-linebreak
            FamilyTree.templates.tommy_female.field_2 =
                '<text class="field_2" style="font-size: 14px;" fill="#ffffff" x="10" y="40" text-anchor="start">{val}</text>';
            this.family = new FamilyTree(this.$refs.tree, {
                // showXScroll: FamilyTree.scroll.visible,
                // showYScroll: FamilyTree.scroll.visible,
                // mouseScrool: FamilyTree.action.zoom,
                nodeTreeMenu: true,
                scaleInitial: FamilyTree.match.boundary,
                nodeBinding: {
                    field_0: 'name',
                    field_1: 'birth_day',
                    img_0: 'photo',
                },
                nodeMenu: {
                    details: { text: 'Details' },
                    edit: { text: 'Edit' },
                },
                editForm: {
                    titleBinding: 'name',
                    photoBinding: 'photo',
                    generateElementsFromFields: false,
                    addMore: null,
                    addMoreBtn: null,
                    addMoreFieldName: null,
                    // cancelBtn: 'Hủy',
                    // saveAndCloseBtn: 'Đóng và lưu',
                    elements: [
                        { type: 'textbox', label: 'Họ và tên', binding: 'name' },
                        [
                            { type: 'date', label: 'Năm sinh', binding: 'birth_day' },
                            { type: 'date', label: 'Năm mất', binding: 'death_day' },
                        ],
                        // [{ type: 'textbox', label: 'Giới tính', binding: 'gender' }],
                        [{ type: 'textbox', label: 'Quê quán', binding: 'address' }],
                        {
                            type: 'textbox',
                            label: 'Đường dẫn file',
                            binding: 'photo',
                            btn: 'Tải lên',
                        },
                    ],
                    buttons: {
                        edit: {
                            icon: FamilyTree.icon.edit(24, 24, '#fff'),
                            text: 'Edit',
                            hideIfEditMode: true,
                            hideIfDetailsMode: false,
                        },
                        share: null,
                        pdf: {
                            icon: FamilyTree.icon.pdf(24, 24, '#fff'),
                            text: 'Save as PDF',
                        },
                    },
                },
            });
            this.family.on('click', (sender, args) => {
                if (args.node === 'birth_day') {
                    // Xử lý ngày sinh ở đây, ví dụ:
                    const birthDayValue = args.value ? this.$utils.convertDate(args.value) : '';
                    // Đặt giá trị mặc định cho trường birth_day trong form chỉnh sửa
                    this.family.editForm.fields.find((field) => field.binding === 'birth_day').defaultValue = birthDayValue;
                }
            });
            this.family.on('field', (sender, args) => {
                if (args.name === 'photo') {
                    if (!args.data.photo) {
                        if (args.data.gender === 'male') {
                            args.value = this.$utils.apiAsset('images/male.jpg');
                        } else if (args.data.gender === 'female') {
                            args.value = this.$utils.apiAsset('images/female.jpg');
                        }
                    }
                }
                if (args.name === 'birth_day') {
                    args.value = args.value ? this.$utils.convertDate(args.value) : '';
                }
            });

            this.family.onUpdateNode((args) => {
                if (args.updateNodesData?.length > 0) {
                    this.updateNodesData = args.updateNodesData;
                    this.saveNode();
                }
            });
            this.family.editUI.on('element-btn-click', () => {
                FamilyTree.fileUploadDialog((file) => {
                    this.fileUploaded = file;
                });
            });
            this.family.editUI.on('show', (sender, args, args1) => {
                console.log('edit.sender', sender);
                console.log('edit.args', args);
                console.log('edit.args1', args1);
            });
            this.family.load(this.familyData);
        },
        saveNode() {
            const dataSend = this.updateNodesData.map((e) => ({
                uid: e.uid,
                id: e.id,
                name: e.name,
                fid: e.fid,
                mid: e.mid,
                pids: e.pids?.length > 0 ? JSON.stringify(e.pids) : [],
                birth_day: e.birth_day,
                death_day: e.death_day,
                address: e.address,
                gender: e.gender,
                photo: e.ImgUrl,
                tree_id: this.treeId,
            }));

            const formData = { ...dataSend[0] };

            const dataForm = new FormData();
            for (const key in formData) {
                if (formData[key] !== null && formData[key]) {
                    if (formData[key] === true) dataForm.append(key, 1);
                    else if (formData[key] === false) dataForm.append(key, 0);
                    else dataForm.append(key, formData[key]);
                }
            }
            if (this.fileUploaded) {
                dataForm.append('file', this.fileUploaded);
            }

            apiService.updateNodeTreeUser(dataForm).then((res) => {
                if (res.data) {
                    const itemRes = res.data[0];
                    this.familyData = this.familyData.map((e) => {
                        if (e.id === itemRes.id) {
                            return {
                                ...itemRes,
                                pids: itemRes.pids ? JSON.parse(itemRes.pids) : null,
                            };
                        }
                        return e;
                    });
                    this.updateNodesData = this.updateNodesData.map((e) => {
                        if (e.id === itemRes.id) {
                            return {
                                ...itemRes,
                                pids: itemRes.pids ? JSON.parse(itemRes.pids) : null,
                            };
                        }
                        return e;
                    });
                    if (this.fileUploaded) {
                        this.initTree();
                        this.fileUploaded = null;
                    }
                }
            });
        },
    },
    watch: {
        dataTreeUsers: {
            immediate: false,
            deep: true,
            handler(val) {
                if (val.length > 0) {
                    this.familyData = this.dataTreeUsers;
                } else if (!this.isTreeInitialized) {
                    // Nếu cây chưa được khởi tạo và không có dữ liệu
                    // Gán dữ liệu mẫu để khởi tạo node đầu tiên
                    this.familyData = [
                        {
                            id: uuidv4(),
                            gender: 'male',
                            name: 'Thành viên đầu tiên',
                            photo: this.$utils.apiAsset('images/male.jpg'),
                        },
                    ];
                    this.isTreeInitialized = true;
                }
                this.initTree();
            },
        },
    },
    mounted() {},
    created() {},
};
</script>

<style>
/* Thêm CSS tùy chỉnh nếu cần */
</style>
