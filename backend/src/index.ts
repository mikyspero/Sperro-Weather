import express, { Request, Response } from "express"
import { weatherRouter } from "./routes/coordinate-routes"
import {errorHandler} from "./middlewares/error-handling"

const app = express()
const port = 3000

app.use(express.json())
app.use('/weather', weatherRouter)
app.use(errorHandler)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
