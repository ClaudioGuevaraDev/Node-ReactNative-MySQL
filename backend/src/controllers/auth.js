import jwt from 'jsonwebtoken'
import validator from 'email-validator'

import config from '../config'

import { connection } from "../database"

import * as libs from '../libs'

export const signUp = async (req, res) => {
    const db = await connection()

    const { username, email, password } = req.body

    if (!password) return res.status(400).json({ message: 'Falta la contraseña.' })

    const result = await db.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, await libs.encryptPassword(password)]
    )

    const [rows] = await db.query(
        'SELECT * FROM users WHERE id = ?',
        [result[0].insertId]
    )

    res.json(rows[0])
}

export const signIn = async (req, res) => {
    const db = await connection()

    const { email, password } = req.body

    if (!email || !password) return res.status(400).json({ message: 'Faltan campos.' })

    if (validator.validate(email) === false) return res.status(400).json({ message: 'Formato del email incorrecto.' })

    const [rows] = await db.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
    )

    if (rows.length === 0) return res.status(401).json({ message: 'Error al iniciar sesión.' })

    const passwordFound = rows[0].password

    if (await libs.comparePassword(password, passwordFound) === false) return res.status(401).json({ message: 'Error al iniciar sesión.' })

    const userToken = {
        id: rows[0].id,
        username: rows[0].username
    }

    const token = jwt.sign(userToken, config.SECRET, {
        expiresIn: 86400 // 24 horas
    })

    res.send(token)
}