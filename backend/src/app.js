import express from 'express'
import cors from 'cors'
import testRoutes from './routes/test.routes.js'
import authRoutes from './routes/auth.routes.js'
import workdayRoutes from './routes/workday.routes.js'
import workperiodsRoutes from './routes/workperiod.routes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Server online")
})
app.use('/test', testRoutes)
app.use('/auth', authRoutes)
app.use('/workdays', workdayRoutes)
app.use('/workperiods', workperiodsRoutes)

export default app