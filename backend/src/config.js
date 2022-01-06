import dotenv from 'dotenv'

dotenv.config()

const config = {
    APP_PORT: process.env.APP_PORT || 4000,
    APP_HOST: process.env.APP_HOST || '127.0.0.1',

    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_USER: process.env.DB_USER || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    DB_DATABASE: process.env.DB_DATABASE || '',

    SECRET: process.env.SECRET || '123'
}

export default config