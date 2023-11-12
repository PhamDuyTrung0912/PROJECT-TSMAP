export default {
    methods: {
        euclideanDistance(point1, point2) {
            const [x1, y1] = point1;
            const [x2, y2] = point2;
            const dx = x2 - x1;
            const dy = y2 - y1;
            return Math.sqrt(dx * dx + dy * dy);
        },

        findNearestFourPoints(startPoint, endPoint, points) {
            // Tạo một mảng để lưu trữ các điểm và khoảng cách tương ứng
            let nearestPoints = [];

            for (const point of points) {
                const distanceStartToPoint = this.euclideanDistance(startPoint, point.geometry.coordinates);
                const distancePointToEnd = this.euclideanDistance(endPoint, point.geometry.coordinates);
                const distance = distanceStartToPoint + distancePointToEnd;

                // Thêm điểm và khoảng cách tương ứng vào mảng nearestPoints
                nearestPoints.push({ point, distance, distanceStartToPoint });
            }
            nearestPoints = nearestPoints.filter((e) => e.distanceStartToPoint < this.defaultStep);

            // Sắp xếp mảng nearestPoints theo khoảng cách tăng dần
            nearestPoints.sort((a, b) => a.distance - b.distance);

            // Lấy 4 điểm gần nhất từ mảng đã sắp xếp
            const nearestFourPoints = nearestPoints.slice(0, 4);
            return nearestFourPoints[0]?.point;
        },

        filterPointsRecursive(points, startPoint, endPoint, result = []) {
            if (points.length === 0) {
                return result;
            }

            if (startPoint?.id === endPoint?.id) {
                return result;
            }

            const point = this.findNearestFourPoints(startPoint.geometry.coordinates, endPoint.geometry.coordinates, points);
            if (!point) {
                return result;
            }

            let nearestPoint = null;

            nearestPoint = point;

            // Thêm điểm đã chọn vào kết quả
            result.push(nearestPoint.geometry.coordinates);
            points = points.filter((e) => e.id !== nearestPoint.id);

            // Tiếp tục đệ quy với mảng còn lại
            return this.filterPointsRecursive(points, nearestPoint, endPoint, result);
        },
        showDirect() {
            this.initStartPoint();
            // Tọa độ của hai điểm đầu và cuối của đường thẳng
            const startPoint = this.findNearestPoint(this.startCoordinates, this.streetPoints);
            const endPoint = this.findNearestPoint(this.endCoordinates, this.streetPoints);

            // Sử dụng hàm đệ quy để lọc các điểm
            const filteredPoints = this.filterPointsRecursive([...this.streetPoints], startPoint, endPoint);

            // Thêm một lớp dạng đường thẳng vào bản đồ
            if (this.mapInstance.mapbox.getLayer('line-layer')) {
                this.mapInstance.mapbox.removeLayer('line-layer');
                this.mapInstance.mapbox.removeSource('line-layer');
            }
            this.mapInstance.mapbox.addLayer({
                id: 'line-layer',
                type: 'line',
                source: {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: [
                            {
                                type: 'Feature',
                                geometry: {
                                    type: 'LineString',
                                    coordinates: [...filteredPoints],
                                },
                            },
                            // Các đoạn đường thẳng khác nếu cần
                        ],
                    },
                },
                paint: {
                    'line-color': 'blue', // Màu sắc của đường thẳng
                    'line-width': 4, // Độ dày của đường thẳng
                },
            });
        },
    },
};
