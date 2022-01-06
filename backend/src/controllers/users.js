import { connection } from '../database'

export const getAllUsers = async (req, res) => {
    const db = await connection()

    const [rows] = await db.query(
        'SELECT * FROM users'
    )

    res.json(rows)
}