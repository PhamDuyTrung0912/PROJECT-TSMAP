<!-- eslint-disable max-len -->
<template>
    <t-tab class="w-full h-[200px] shadow-md rounded-md bg-white">
        <template v-slot:menu>
            <ul class="flex items-center justify-around py-0 px-3">
                <li
                    v-for="(menu, index) in tabItems"
                    :key="index"
                    @click="switchTab(index)"
                    :class="
                        tab === index ? 'ct_item_menu after:bg-primary after:duration-100 after:ease-linear after:w-[100%] after:transition-all' : ''
                    "
                    class="p-[10px] cursor-pointer text-secondary text-sm hover:bg-slate-100 hover:transition-all transition-all relative after:w-0 min-w-[200px] text-center">
                    {{ menu.label }}
                </li>
            </ul>
        </template>
        <template v-slot:content>
            <div v-show="tab === 0" class="pa-1 ma-2 p-[10px]" style="height: calc(275px - 60px); overflow: auto">
                <div class="text-sm">
                    <div class="grid grid-cols-12 gap-2">
                        <div class="text-sm col-span-7 text-secondary mb-1">
                            <div class="text-secondary mb-1 font-bold">Thông tin nghĩa trang</div>
                            <div class="grid grid-cols-12 gap-2">
                                <div class="text-sm text-[#55686D] col-span-2">Tên nghĩa trang</div>
                                <div class="text-sm text-secondary col-span-10 truncate ...">
                                    {{ $utils.formatName(cemeterySelected.name) }}
                                </div>
                            </div>
                            <div class="grid grid-cols-12 gap-2">
                                <div class="text-sm text-[#55686D] col-span-2">Địa chỉ</div>
                                <div class="text-sm text-secondary col-span-10 truncate ...">
                                    125 Phố Phùng Hưng - Phường Cửa Đông - Quận Hoàn Kiếm - Hà Nội
                                </div>
                            </div>
                            <div class="grid grid-cols-12 gap-2">
                                <div class="text-sm text-[#55686D] col-span-2">Hotline</div>
                                <div class="text-sm text-secondary col-span-10 truncate ...">024.38285688 | 024.39232323</div>
                            </div>
                            <div class="grid grid-cols-12 gap-2">
                                <div class="text-sm text-[#55686D] col-span-2">Email</div>
                                <div class="text-sm text-secondary col-span-10 truncate ...">bpvlt_soldtbxh@hanoi.gov.vn</div>
                            </div>
                            <div class="grid grid-cols-12 gap-2">
                                <div class="text-sm text-[#55686D] col-span-2">Fax</div>
                                <div class="text-sm text-secondary col-span-10 truncate ...">024.38288100</div>
                            </div>
                        </div>
                        <div class="text-sm col-span-5 text-secondary mb-1">
                            <div class="text-secondary mb-1 font-bold">Giờ làm việc</div>
                            <div class="grid grid-cols-12 gap-2">
                                <div class="text-sm text-secondary col-span-10 truncate ...">Thời gian từ 6h sáng đến 22h</div>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-12 gap-2"></div>
                </div>
            </div>
            <div v-show="tab === 1" class="pa-1 ma-2 p-[10px]" style="height: calc(275px - 60px); overflow: auto">
                <div class="text-sm">
                    <div class="grid grid-cols-12 gap-2">
                        <div class="text-sm col-span-7 text-secondary mb-1">
                            <div class="text-secondary mb-1 font-bold">Thông tin liệt sỹ</div>
                            <div class="grid grid-cols-12 gap-2">
                                <div class="text-sm text-[#55686D] col-span-2">Họ tên</div>
                                <div class="text-sm text-secondary col-span-10 truncate ...">
                                    {{ $utils.formatName(tombItemSelected.hoten) }}
                                </div>
                            </div>
                            <div class="grid grid-cols-12 gap-2">
                                <div class="text-sm text-[#55686D] col-span-2">Năm sinh</div>
                                <div class="text-sm text-secondary col-span-10 truncate ...">
                                    {{ tombItemSelected.namsinh }}
                                </div>
                            </div>
                            <div class="grid grid-cols-12 gap-2">
                                <div class="text-sm text-[#55686D] col-span-2">Năm hy sinh</div>
                                <div class="text-sm text-secondary col-span-10 truncate ...">
                                    {{ tombItemSelected.namhysinh }}
                                </div>
                            </div>
                            <div class="grid grid-cols-12 gap-2">
                                <div class="text-sm text-[#55686D] col-span-2">Địa chỉ</div>
                                <div class="text-sm text-secondary col-span-10 truncate ...">{{ $utils.getLocation(tombItemSelected) }}</div>
                            </div>
                        </div>
                        <div class="text-sm col-span-5 text-secondary mb-1">
                            <div class="text-secondary mb-1 font-bold">Vị trí</div>
                            <div class="grid grid-cols-12 gap-2">
                                <div class="text-sm text-[#55686D] col-span-3">Số hàng</div>
                                <div class="text-sm text-secondary col-span-6 truncate ...">
                                    {{ tombItemSelected.hangmo }}
                                </div>
                            </div>
                            <div class="grid grid-cols-12 gap-2">
                                <div class="text-sm text-[#55686D] col-span-3">Số cột</div>
                                <div class="text-sm text-secondary col-span-6 truncate ...">
                                    {{ tombItemSelected.somo }}
                                </div>
                            </div>
                            <div class="grid grid-cols-12 gap-2">
                                <div class="text-sm text-[#55686D] col-span-3">Khu vực</div>
                                <div class="text-sm text-secondary col-span-6 truncate ...">
                                    {{ tombItemSelected.khu }}
                                </div>
                            </div>
                            <div class="grid grid-cols-12 gap-2">
                                <div class="text-sm text-[#55686D] col-span-3">Nghĩa trang</div>
                                <div class="text-sm text-secondary col-span-6 truncate ...">
                                    {{ $utils.formatName(cemeterySelected.name) }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-12 gap-2"></div>
                </div>
            </div>
            <div v-show="tab === 2" class="pa-1 ma-2 p-[10px]" style="height: calc(275px - 60px); overflow: auto">
                <div class="text-secondary mb-1 font-bold text-sm">Các danh hiệu</div>
                <div class="grid grid-cols-12 gap-2">
                    <div class="text-sm text-secondary col-span-10 truncate ...">Liệt sỹ</div>
                </div>
            </div>
            <div v-show="tab === 3" class="pa-1 ma-2 p-[10px]" style="height: calc(275px - 60px); overflow: auto">
                <div class="text-secondary mb-1 font-bold text-sm">Tiểu sử liệt sỹ {{ $utils.formatName(tombItemSelected.hoten) }}</div>
                <div class="text-sm h-[100px] overflow-auto">
                    {{ $utils.formatName(tombItemSelected.hoten) }} là một anh hùng liệt sỹ và anh hùng của cuộc kháng chiến chống Mỹ của Việt Nam.
                    Anh sinh ra tại làng Trung Hòa, huyện Hải Hậu, tỉnh Nam Định, Việt Nam. {{ $utils.formatName(tombItemSelected.hoten) }} đã tham
                    gia vào phong trào kháng chiến chống Mỹ và được biết đến với những hành động anh dũng và lòng dũng cảm. Một trong những hành động
                    nổi tiếng của {{ $utils.formatName(tombItemSelected.hoten) }} là việc anh tham gia vào cuộc đánh bom sân bay Tân Sơn Nhất, thành
                    phố Sài Gòn (nay là Thành phố Hồ Chí Minh) vào ngày 8 tháng 4 năm 1964. Cuộc đánh bom này đã có tầm ảnh hưởng lớn đến cuộc chiến
                    tranh Việt Nam và đánh dấu sự hy sinh của anh và đồng đội của mình. Sau cuộc đánh bom này, Nguyễn Văn Trỗi bị bắt giữ và cuối cùng
                    bị xử bắn tử hình vào ngày 15 tháng 10 năm 1964. Anh đã trở thành biểu tượng của lòng dũng cảm và sự hy sinh trong cuộc chiến
                    tranh của Việt Nam chống lại cuộc xâm lược của Mỹ. {{ $utils.formatName(tombItemSelected.hoten) }} là một trong những anh hùng
                    liệt sỹ nổi tiếng của Việt Nam và được tưởng nhớ và kính trọng rộng rãi trong lịch sử và văn hóa của quốc gia.
                </div>
            </div>
            <div v-show="tab === 4" class="pa-1 ma-2 p-[10px]" style="height: calc(275px - 60px); overflow: auto">
                <div class="text-secondary mb-1 font-bold text-sm">Tình trạng phần mộ</div>
                <div class="grid grid-cols-12 gap-2">
                    <div class="text-sm col-span-12 truncate ... text-yellow-800 rounded-lg" role="alert">Nhiều cỏ um tùm, Gạch nền vỡ, Sơn mờ</div>
                </div>
            </div>
            <div v-show="tab === 5" class="pa-1 ma-2 p-[10px]" style="height: calc(275px - 60px); overflow: auto">
                <div class="text-secondary mb-1 font-bold text-sm">Ảnh phần mộ</div>
                <div class="grid grid-cols-12 gap-2">
                </div>
            </div>
        </template>
    </t-tab>
</template>

<script>
import TTab from '../../../tailwind/TTab.vue';

export default {
    props: {
        cemeterySelected: {
            type: Object,
        },
        tombItemSelected: {
            type: Object,
        },
    },
    components: { TTab },
    data() {
        return {
            tab: 1,

            tabItems: [
                {
                    label: 'Nghĩa trang',
                    value: 0,
                },
                {
                    label: 'Thông tin cơ bản',
                    value: 1,
                },
                {
                    label: 'Danh hiệu',
                    value: 2,
                },
                {
                    label: 'Tiểu sử',
                    value: 3,
                },
                {
                    label: 'Tình trạng',
                    value: 4,
                },
                {
                    label: 'Ảnh',
                    value: 5,
                },
            ],
        };
    },
    methods: {
        switchTab(tab) {
            this.tab = tab;
        },
    },
    created() {},
};
</script>

<style></style>
