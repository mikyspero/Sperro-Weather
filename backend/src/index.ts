import express, { Request, Response } from "express"
import { weatherRouter } from "./routes/coordinate-routes"
import {errorHandler} from "./middlewares/error-handling"
import { dailyRateLimit, minuteRateLimit} from "./middlewares/limiters"

const app = express()
const port = 3000

app.use(express.json())
app.use(minuteRateLimit)
app.use(dailyRateLimit)
app.use('/weather', weatherRouter)
app.use(errorHandler)
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
