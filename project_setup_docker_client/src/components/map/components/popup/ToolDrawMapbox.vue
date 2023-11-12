<template>
    <div>
        <!-- Nút vẽ polygon -->
        <div v-if="showPolygonButton" class="custom-polygon-icon" @click="startDrawingPolygon">
            <i class="text-xl absolute px-2 mdi mdi-shape-polygon-plus"></i>
        </div>

        <!-- Nút vẽ Line String -->
        <div v-if="showLineStringButton" class="custom-linestring-icon" @click="startDrawingLineString">
            <i class="text-xl absolute px-2 mdi mdi-chart-line-variant"></i>
        </div>

        <!-- Nút vẽ Point -->
        <div v-if="showPointButton" class="custom-point-icon" @click="startDrawingPoint">
            <i class="text-xl absolute px-2 mdi mdi-map-marker"></i>
        </div>

        <!-- Nút xóa -->
        <div v-if="showDeleteButton" class="custom-delete-icon" @click="deleteSelectedFeature">
            <i class="text-xl absolute px-2 mdi mdi-delete"></i>
        </div>
    </div>
</template>

<script>
import MapboxDraw from '@mapbox/mapbox-gl-draw';

export default {
    name: 'ToolDrawMapbox',
    props: {
        mapInstance: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            drawControl: null,
            showPolygonButton: true,
            showRectangleButton: true,
            showLineStringButton: true,
            showPointButton: true,
            showDeleteButton: true, // Hiển thị nút xóa
            drawnFeatures: [], // Mảng để lưu trữ các đối tượng được vẽ
            activeButton: null,
            colorActive: '#3BB2D0',
        };
    },
    watch: {},
    methods: {
        startDrawingPolygon() {
            this.activeButton = 'draw_polygon';
            this.startDrawingMode('draw_polygon');
        },
        startDrawingRectangle() {
            this.activeButton = 'draw_rectangle';
            this.startDrawingMode('draw_rectangle');
        },
        startDrawingLineString() {
            this.activeButton = 'draw_line_string';
            this.startDrawingMode('draw_line_string');
        },
        startDrawingPoint() {
            this.activeButton = 'draw_point';
            this.startDrawingMode('draw_point');
        },
        startDrawingMode(mode) {
            if (!this.drawControl) {
                this.drawControl = new MapboxDraw({
                    displayControlsDefault: false,
                    controls: {
                        polygon: true,
                        line_string: true,
                        point: true,
                        trash: false,
                    },
                });
                this.mapInstance.mapbox.addControl(this.drawControl);
            }

            this.drawControl.changeMode(mode);
            this.pollForDrawnFeatures();
        },
        pollForDrawnFeatures() {
            const pollInterval = setInterval(() => {
                const updatedFeatures = this.drawControl.getAll().features;
                const isFeatureUpdated = this.checkFeatureChanges(updatedFeatures);

                if (isFeatureUpdated) {
                    clearInterval(pollInterval);
                    this.handleDrawnPolygon(updatedFeatures);
                }
            }, 500);
        },
        checkFeatureChanges(updatedFeatures) {
            const oldFeatures = this.drawnFeatures;
            if (updatedFeatures.length !== oldFeatures.length) {
                return true;
            }
            for (let i = 0; i < updatedFeatures.length; i++) {
                if (updatedFeatures[i].id !== oldFeatures[i].id) {
                    return true;
                }
            }
            return false;
        },
        handleDrawnPolygon(updatedFeatures) {
            this.drawnFeatures = updatedFeatures;
            // Sử dụng Vue.set để thông báo sự thay đổi trong mảng
        },
        deleteSelectedFeature() {
            this.activeButton = 'draw_delete';
            if (this.drawControl) {
                const selectedIds = this.drawControl.getSelectedIds();
                selectedIds.forEach((id) => {
                    this.drawControl.delete(id);
                });
                this.drawControl.changeMode('simple_select');
                this.activeButton = null;
            }
        },
    },
};
</script>

<style scoped>
.custom-polygon-icon,
.custom-rectangle-icon,
.custom-linestring-icon,
.custom-point-icon,
.custom-delete-icon {
    position: absolute;
    width: 30px;
    height: 30px;
    background-color: white;
    border-radius: 15%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: 1px solid rgb(190, 181, 181);
}

.custom-polygon-icon {
    top: 105px;
    right: 10px;
}
.custom-rectangle-icon {
    position: absolute;
    top: 245px;
    right: 10px;
}

.custom-linestring-icon {
    top: 140px;
    right: 10px;
}

.custom-point-icon {
    top: 175px;
    right: 10px;
}

.custom-delete-icon {
    top: 210px;
    right: 10px;
}
</style>
