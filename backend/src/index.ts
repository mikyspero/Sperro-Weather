import express, { Request, Response } from "express";
import { weatherRouter } from "./routes/coordinate-routes";

const app = express()
const port = 3000

app.use(express.json())
app.use('/weather', weatherRouter)
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port} unuganga`)
})