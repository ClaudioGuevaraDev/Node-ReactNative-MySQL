import 'express-async-errors'

import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'

import config from './config'

import * as middlewares from './middlewares'
import * as routes from './routes'

const app = express()

app.set('port', config.APP_PORT)
app.set('host', config.APP_HOST)

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(helmet())

app.use('/api/auth', routes.authRoutes)
app.use('/api/users', routes.usersRoutes)
app.use('/api/tasks', routes.tasksRoutes)

app.use(middlewares.errorHandler)
app.use(middlewares.unknownEndpoint)

export default app