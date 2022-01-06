import mysql from 'mysql2/promise'

import config from './config'

export const connection = async () => {
    try {
        return await mysql.createConnection({
            host: config.DB_HOST,
            user: config.DB_USER,
            password: config.DB_PASSWORD,
            database: config.DB_DATABASE
        })
    } catch (error) {
        console.log(`Error to connect database for: ${error}`)
    }
}
