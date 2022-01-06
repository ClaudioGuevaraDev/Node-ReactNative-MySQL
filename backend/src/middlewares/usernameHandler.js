import { connection } from "../database"

export const usernameHandler = async (req, res, next) => {
    const { username } = req.body
    
    if (!username) return res.status(400).json({ message: 'Falta el usuername.' })

    const db = await connection()

    const [rows] = await db.query(
        'SELECT * FROM users WHERE username = ?',
        [username]
    )

    if (rows.length > 0) return res.status(400).json({ message: 'El username ya esta registrado.' }) 
        
    next()
}