import mapboxgl from 'mapbox-gl';

export default {
    methods: {
        data() {
            return {
                marker: null,
            };
        },
        euclideanDistance(point1, point2) {
            const [x1, y1] = point1;
            const [x2, y2] = point2;
            const dx = x2 - x1;
            const dy = y2 - y1;
            return Math.sqrt(dx * dx + dy * dy);
        },
        findNearestPoint(startPoint, points) {
            let nearestPoint = null;
            let nearestDistance = Number.MAX_VALUE;

            for (const point of points) {
                const distance = this.euclideanDistance(startPoint, point);
                if (distance < nearestDistance) {
                    nearestPoint = point;
                    nearestDistance = distance;
                }
            }

            return nearestPoint;
        },
        calculateDistance(point1, point2) {
            const lat1 = point1[1];
            const lon1 = point1[0];
            const lat2 = point2[1];
            const lon2 = point2[0];
            const R = 6371; // Bán kính trái đất (đơn vị kilômét)
            const dLat = (lat2 - lat1) * (Math.PI / 180);
            const dLon = (lon2 - lon1) * (Math.PI / 180);
            // eslint-disable-next-line operator-linebreak
            const a =
                // eslint-disable-next-line operator-linebreak
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = R * c;
            return distance;
        },

        findShortestPath(points, start, end, defaultStep) {
            const visited = new Set();
            const distances = Array(points.length).fill(Infinity);
            const previous = Array(points.length).fill(null);
            const startIndex = points.findIndex((point) => point[0] === start[0] && point[1] === start[1]);
            const endIndex = points.findIndex((point) => point[0] === end[0] && point[1] === end[1]);

            distances[startIndex] = 0;

            while (visited.size !== points.length) {
                const currNode = this.getMinDistanceNode(distances, visited);
                visited.add(currNode);

                for (let neighbor = 0; neighbor < points.length; neighbor++) {
                    if (!visited.has(neighbor)) {
                        const distance = this.calculateDistance(points[currNode], points[neighbor]);

                        if (distance < defaultStep && distances[currNode] + distance < distances[neighbor]) {
                            distances[neighbor] = distances[currNode] + distance;
                            previous[neighbor] = currNode;
                        }
                    }
                }
            }

            const path = [endIndex];
            let current = endIndex;
            while (current !== startIndex) {
                current = previous[current];
                path.unshift(current);
            }

            return path.map((index) => points[index]);
        },

        getMinDistanceNode(distances, visited) {
            let minDistance = Infinity;
            let minNode = null;
            for (let i = 0; i < distances.length; i++) {
                if (!visited.has(i) && distances[i] < minDistance) {
                    minDistance = distances[i];
                    minNode = i;
                }
            }
            return minNode;
        },
        showDirect() {
            this.initDirect();
            this.initStartPoint();
            this.isDiriect = true;
        },
        // Hàm tính trung tâm của polygon
        calculatePolygonCenter(polygon) {
            // eslint-disable-next-line no-underscore-dangle
            const coordinates = polygon;
            let sumX = 0;
            let sumY = 0;
            for (const point of coordinates) {
                sumX += point[0];
                sumY += point[1];
            }
            const centerX = sumX / coordinates.length;
            const centerY = sumY / coordinates.length;
            return { x: centerX, y: centerY };
        },

        // Hàm di chuyển trung tâm lên một khoảng cách
        // Hàm di chuyển trung tâm lên một khoảng cách
        // Hàm di chuyển trung tâm lên một khoảng cách bằng một nửa chiều dài
        moveCenterUp(polygon) {
            const center = this.calculatePolygonCenter(polygon);

            // Tính chiều dài của polygon
            const coordinates = polygon;
            let minX = Infinity;
            let maxX = -Infinity;
            for (const point of coordinates) {
                const x = point[0];
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
            }
            const polygonLength = maxX - minX;

            // Di chuyển trung tâm lên một khoảng bằng một nửa chiều dài
            const newCenterY = center.y - polygonLength / 3;

            // Tính khoảng chênh lệch Y giữa trung tâm mới và cũ
            const deltaY = newCenterY - center.y;

            // Di chuyển trung tâm lên một khoảng bằng một nửa chiều dài
            const newCenterX = center.x - polygonLength / 3;

            // Tính khoảng chênh lệch Y giữa trung tâm mới và cũ
            const deltaX = newCenterX - center.x;

            // Cập nhật tất cả các điểm trong polygon
            for (let i = 0; i < coordinates.length; i++) {
                coordinates[i][0] += deltaX;
                coordinates[i][1] += deltaY;
            }

            return polygon;
        },
        movePointPopup(polygon) {
            const center = this.calculatePolygonCenter(polygon);

            // Tính chiều dài của polygon
            const coordinates = polygon;
            let minX = Infinity;
            let maxX = -Infinity;
            for (const point of coordinates) {
                const x = point[0];
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
            }
            const polygonLength = maxX - minX;

            // Di chuyển trung tâm lên một khoảng bằng một nửa chiều dài
            const newCenterY = center.y + polygonLength / 2;

            // Tính khoảng chênh lệch Y giữa trung tâm mới và cũ
            const deltaY = newCenterY - center.y;

            // Di chuyển trung tâm lên một khoảng bằng một nửa chiều dài
            const newCenterX = center.x + polygonLength / 2;

            // Tính khoảng chênh lệch Y giữa trung tâm mới và cũ
            const deltaX = newCenterX - center.x;

            // Cập nhật tất cả các điểm trong polygon
            for (let i = 0; i < coordinates.length; i++) {
                coordinates[i][0] += deltaX;
                coordinates[i][1] += deltaY;
            }

            return polygon;
        },
        initDirect() {
            // Điểm xuất phát và điểm kết thúc
            // Tọa độ của hai điểm đầu và cuối của đường thẳng
            const startPoint = this.findNearestPoint(this.startCoordinates, [...this.arrayPointStreets, ...this.arrayPointRows]);
            const endPoint = this.findNearestPoint(this.endCoordinates, this.arrayPointRows);
            // Mảng điểm của bạn
            // Khoảng cách mặc định

            // Tìm đường đi ngắn nhất
            const shortestPath = this.findShortestPath([...this.arrayPointStreets, ...this.arrayPointRows], startPoint, endPoint, this.defaultStep);
            // Sử dụng hàm đệ quy để lọc các điểm

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
                                    coordinates: [this.startCoordinates, ...shortestPath, this.endCoordinates],
                                },
                            },
                            // Các đoạn đường thẳng khác nếu cần
                        ],
                    },
                },
                paint: {
                    'line-color': '#2596be', // Màu sắc của đường thẳng
                    'line-width': 4, // Độ dày của đường thẳng
                },
            });
        },
        onDragEnd() {
            const coordinates = document.getElementById('coordinates');
            const lngLat = this.marker.getLngLat();
            this.startCoordinates = [lngLat.lng, lngLat.lat];
            coordinates.style.display = 'none';
            coordinates.innerHTML = `Kinh độ : ${lngLat.lng}<br />Vĩ độ : ${lngLat.lat}`;
            this.initDirect();
        },
        initStartPoint() {
            if (this.marker) {
                this.marker.remove();
            }
            // Sử dụng hình ảnh tùy chỉnh làm biểu tượng
            const customIcon = document.createElement('div');
            customIcon.style.backgroundImage = 'url("../images/start.png")'; // Đường dẫn đến hình ảnh tùy chỉnh
            customIcon.style.width = '32px'; // Độ rộng của biểu tượng
            customIcon.style.height = '32px'; // Độ cao của biểu tượng
            customIcon.style.backgroundSize = 'cover';
            customIcon.style.cursor = 'pointer';

            // Tạo một phần tử div chứa văn bản
            const textDiv = document.createElement('div');
            textDiv.className = 'marker-text'; // Đặt class CSS cho văn bản (có thể tùy chỉnh theo ý muốn)
            // Tạo thẻ <span> và đặt nội dung của nó
            const textSpan = document.createElement('span');
            textSpan.innerText = 'Kéo để chọn vị trí của bạn'; // Đặt nội dung văn bản

            // Gắn thẻ <span> vào phần tử textDiv
            textDiv.appendChild(textSpan);

            // Gắn phần tử textDiv vào phần tử customIcon
            customIcon.appendChild(textDiv);

            this.marker = new mapboxgl.Marker({
                element: customIcon, // Sử dụng hình ảnh tùy chỉnh làm biểu tượng
                draggable: true,
            })
                .setLngLat(this.startCoordinates)
                .addTo(this.mapInstance.mapbox);

            this.marker.on('dragend', this.onDragEnd);
        },
        clearLayerDirect() {
            if (this.marker) {
                this.marker.remove();
            }
            if (this.mapInstance.mapbox.getLayer('line-layer')) {
                this.mapInstance.mapbox.removeLayer('line-layer');
                this.mapInstance.mapbox.removeSource('line-layer');
            }
        },
    },
};
