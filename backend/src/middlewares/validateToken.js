import jwt from 'jsonwebtoken'

import config from '../config'

const getToken = (req) => {
    let authorization

    if (req.body.headers) {
        authorization = req.body.headers.Authorization
    } else {
        authorization = req.get('authorization')
    }

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        return authorization.substring(7)
    }

    return
}

export const validateToken = (req, res, next) => {
    const token = getToken(req)

    if (!token) return res.status(401).json({ message: 'No autorizado.' })

    jwt.verify(token, config.SECRET)

    next()
}