import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'

import { connect } from './config/db.js';

dotenv.config()
const app = express();
connect();
app.use(morgan('dev'))


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})