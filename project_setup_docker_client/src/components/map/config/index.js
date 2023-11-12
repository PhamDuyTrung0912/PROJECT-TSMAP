export const cfMapbox = {
    container: 'map',
    interactive: true,
    style: 'mapbox://styles/mapbox/outdoors-v12?optimize=true',
    zoom: 5,
    // center: [106.64881134033203, 11.178633689880371], // ESPG:4326 Binh Duong
    center: [107.92818356785887, 15.932079438251705], // ESPG:4326 Ngoc Hoi
    pitch: 10,
    minPitch: 10,
    maxPitch: 85,
    bearing: 0,
    antialias: true,
};

export const styleMaps = [
    {
        name: '3D-Outdoors',
        path: 'mapbox://styles/mapbox/outdoors-v12?optimize=true',
        id: 1,
    },
    {
        name: '3D-Dark',
        path: 'mapbox://styles/mapbox/dark-v11?optimize=true',
        id: 2,
    },

    // {
    //     name: 'Light-v12',
    //     path: 'mapbox://styles/mapbox/light-v11?optimize=true',
    //     id: 3,
    // },
    // {
    //     name: 'Street-v12',
    //     path: 'mapbox://styles/mapbox/streets-v12?optimize=true',
    //     id: 4,
    // },
    // {
    //     name: 'Satellite-v9',
    //     path: 'mapbox://styles/mapbox/satellite-v9?optimize=true',
    //     id: 5,
    // },
    // {
    //     name: 'Satellite-streets-v12',
    //     path: 'mapbox://styles/mapbox/satellite-streets-v12?optimize=true',
    //     id: 6,
    // },
    // {
    //     name: 'Navigation-day-v1',
    //     path: 'mapbox://styles/mapbox/navigation-day-v1?optimize=true',
    //     id: 7,
    // },
    // {
    //     name: 'Navigation-night-v1',
    //     path: 'mapbox://styles/mapbox/navigation-night-v1?optimize=true',
    //     id: 8,
    // },

    {
        name: '2D-Outdoors',
        path: 'mapbox://styles/mapbox/streets-v11',
        id: 9,
    },
    {
        name: '2D-Dark',
        path: 'mapbox://styles/mapbox/dark-v10',
        id: 10,
    },
];

export const cfMapDefault = {
    // Cấu hình chức năng tìm kiếm
    fToolPolygon: true,
    // Cấu hình chức năng tìm kiếm
    fSearch: false,
    // Cấu hình chức năng (Zoom,Rotate)
    fControl: true,
    // Độ zoomIn tối đa (layer)
    maxZoom: 16,
    // Độ zoomIn tối thiểu (layer)
    minZoom: 0,
};

// Tọa độ ảnh vẽ kĩ thuật Bình Dương
export const cImageKT = [
    [106.6436701169, 11.1880328057],
    [106.6586292511, 11.1880328057],
    [106.6586292511, 11.1683336496],
    [106.6436701169, 11.1683336496],
];

// Tọa độ 3D model Bình Dương
export const cHome3DM = [106.649488, 11.173731];

// Tọa độ 3d tượng Ngọc Hồi
export const cTuongNH3DM = [
    {
        id: 1,
        key: 'cim_ngochoi',
        coordinates: [105.85066928784823, 20.927149907286264],
        scale: {
            x: 0.062,
            y: 0.062,
            z: 0.062,
        },
        rotation: -1.067,
    },
];

// Tọa độ 3d tượng Ngọc Hồi
export const cCongNH3DM = [
    {
        id: 1,
        key: 'cim_ngochoi',
        coordinates: [105.85030888267437, 20.92695123461661],
        scale: {
            x: 0.323,
            y: 0.323,
            z: 0.323,
        },
        rotation: -1.067,
    },
];
