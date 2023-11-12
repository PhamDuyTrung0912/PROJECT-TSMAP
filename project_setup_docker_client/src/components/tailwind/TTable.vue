<!-- eslint-disable vuejs-accessibility/label-has-for -->
<!-- eslint-disable max-len -->
<template>
    <div>
        <div class="flex flex-col">
            <div class="-m-1.5 overflow-x-auto">
                <div class="p-1.5 min-w-full inline-block align-middle">
                    <div class="border px-0 pt-1 border-solid bg-white border-gray-200 rounded-lg">
                        <div class="overflow-hidden">
                            <table class="min-w-full shadow-md">
                                <thead class="" style="border-bottom: 1px solid rgb(235, 235, 235)">
                                    <tr>
                                        <th scope="col" class="relative w-12" v-if="isCheck">
                                            <input
                                                @click="selectAll"
                                                type="checkbox"
                                                style="top: 50%; left: 50%; transform: translate(-50%, -50%)"
                                                class="border-gray-200 rounded text-primary focus:ring-primary w-4 h-4 cursor-pointer absolute" />
                                        </th>
                                        <th v-for="header in headers" :key="header.value" class="px-2 py-2 text-left text-xs text-gray-500">
                                            {{ header.label }}
                                        </th>
                                        <th scope="col" class="px-2 py-2 text-right text-sm text-gray-500">
                                            {{ actionHeader }}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class=" ">
                                    <tr
                                        v-for="(row, index) in data"
                                        :key="index"
                                        style="border-top: 1px solid rgb(235, 235, 235)"
                                        class="hover:bg-gray-100">
                                        <td class="relative w-12" v-if="isCheck">
                                            <input
                                                style="top: 50%; left: 50%; transform: translate(-50%, -50%)"
                                                @click="handleCheckItem(row)"
                                                type="checkbox"
                                                class="border-gray-200 absolute rounded text-primary focus:ring-primary w-4 h-4 cursor-pointer" />
                                        </td>
                                        <td
                                            v-for="header in headers"
                                            :key="header.value"
                                            class="px-2 py-2 whitespace-nowrap text-xs font-medium text-gray-800">
                                            <slot v-if="header.slot" :name="header.value" :row="row"></slot>
                                            <span v-else>
                                                {{ header.object ? row[header.keyObject][header.valueObject] : row[header.value] }}
                                            </span>
                                        </td>
                                        <td class="px-2 py-1 whitespace-nowrap text-right text-xs font-medium">
                                            <!-- <div>
                                                <i class="text-xl px-2 mdi mdi-pencil cursor-pointer"></i>
                                            </div> -->
                                        </td>
                                    </tr>
                                </tbody>
                                <div></div>
                            </table>
                        </div>
                        <img
                            v-if="data.length === 0"
                            class="object-cover w-[200px] rounded-full mx-auto"
                            :src="$utils.apiAsset('images/norecordfound.png')"
                            alt="nodata" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        headers: {
            type: Array,
            required: true,
        },
        data: {
            type: Array,
            required: true,
        },
        actionHeader: {
            type: String,
            default: '',
        },
        isCheck: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            itemsChecked: [],
        };
    },
    methods: {
        selectAll() {},
        handleCheckItem(item) {
            console.log('checked', item);
        },
    },
};
</script>

<style scoped></style>
