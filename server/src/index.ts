import express, { Express } from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 8000
const db_url = process.env.DATABASE || ''

// routes
import authRoutes from './routes/auth'
import userRoutes from './routes/user'
import categoryRoutes from './routes/category'
import productRoutes from './routes/product'
import orderRoutes from './routes/order'

// DB Connection
mongoose.connect(db_url, {}).then(() => {
  console.log('DB CONNECTED')
})

// middlewares
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

// routes
app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)
app.use('/api', orderRoutes)

// starting a server
app.listen(port, () => {
  console.log(`⚡️ Server is running at http://localhost:${port}`)
})
