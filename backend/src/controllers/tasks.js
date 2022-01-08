import { connection } from '../database'

export const createTask = async (req, res) => {
    const db = await connection()

    const { name, completed, userId } = req.body

    const result = await db.query(
        'INSERT INTO tasks (name, completed, createdAt, updatedAt, userId) VALUES (?,?,?,?,?)',
        [name, completed, new Date(), new Date(), userId]
    )

    const [rows] = await db.query(
        'SELECT * FROM tasks WHERE id = ?',
        [result[0].insertId]
    )

    res.status(201).json(rows[0])
}

export const getAllTasks = async (req, res) => {
    const { userId } = req.body

    const db = await connection()

    const [rows] = await db.query(
        'SELECT * FROM tasks WHERE userId = ?',
        [userId]
    )

    res.json(rows)
}

export const getOneTask = async (req, res) => {
    const db = await connection()

    const [rows] = await db.query(
        'SELECT * FROM users WHERE id = ?',
        [req.params.id]
    )

    if (rows.length === 0) return res.status(404).json({ message: 'Tarea no encontrada.' })

    res.json(rows[0])
}

export const deleteTask = async (req, res) => {
    const db = await connection()

    const [rows] = await db.query(
        'SELECT * FROM tasks WHERE id = ?',
        [req.params.id]
    )

    const result = await db.query(
        'DELETE FROM tasks WHERE id = ?',
        [req.params.id]
    )

    if (result[0].affectedRows === 0) return res.status(404).json({ message: 'Tarea no encontrada.' })

    res.json(rows[0])
}

export const updateTask = async (req, res) => {
    const db = await connection()

    const { name, completed } = req.body

    const result = await db.query(
        'UPDATE tasks SET name = ?, completed = ?, updatedAt = ? WHERE id = ?',
        [name, completed, new Date(), req.params.id]
    )

    if (result[0].affectedRows === 0) return res.status(404).json({ message: 'Tarea no encontrada.' })

    const [rows] = await db.query(
        'SELECT * FROM tasks WHERE id = ?',
        [req.params.id]
    )

    res.json(rows[0])
}