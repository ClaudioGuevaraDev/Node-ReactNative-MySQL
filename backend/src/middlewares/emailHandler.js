import validator from 'email-validator'

import { connection } from '../database'

export const emailHandler = async (req, res, next) => {
    const { email } = req.body

    if (!email) return res.status(400).json({ message: 'Falta el correo electrónico.' })
    
    if (validator.validate(email) === false) return res.status(400).json({ message: 'Formato incorrecto del correo electrónico.' })

    const db = await connection()

    const [rows] = await db.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
    )

    if (rows.length > 0) return res.status(400).json({ message: 'El correo electrónico ya existe.' })

    next()
}