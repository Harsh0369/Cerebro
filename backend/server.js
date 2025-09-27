import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import http from 'http'

import {initSocket} from './socket.js'


import { authRoutes } from './routes/auth.route.js';
import { userRoutes } from './routes/user.route.js';
import { groupRoutes } from './routes/group.route.js';
import { messageRoutes } from './routes/message.route.js';

import { connect } from './config/db.js';

dotenv.config()
const app = express();

const server = http.createServer(app);
initSocket(server);

app.use(cors());
connect();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/messages', messageRoutes);


const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})