require('dotenv').config();

module.exports = {
    database: {
        user: process.env.DB_MAP_USERNAME,
        password: process.env.DB_MAP_PASSWORD,
        host: process.env.DB_MAP_HOST,
        db: process.env.DB_MAP_DATABASE,
        port: process.env.DB_MAP_PORT,
    },

    pg_notifications: {
        layer: 'layers_changed'
    }
}


