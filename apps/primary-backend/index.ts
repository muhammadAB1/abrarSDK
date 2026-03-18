import express from "express";
import cors from 'cors'
import cookieParser from 'cookie-parser'

import authRoutes from './auth/auth.routes'
import apiRoutes from './apiKeys/apiKeys.routes'
import modelRoutes from './models/models.routes'
import paymentRoutes from './payments/payment.routes'

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: `${process.env.FRONTEND_URL}`,
    credentials: true
}))

app.use('/openrouter/auth', authRoutes)
app.use('/openrouter/api', apiRoutes)
app.use('/openrouter/model/', modelRoutes)
app.use('/openrouter/payment/', paymentRoutes)

export default app;



/*
auth => signup, signin
api-key => create api key delete, get, disable
model => get all model, their pricing, providers, etc.
payment => rzp/stripe
*/