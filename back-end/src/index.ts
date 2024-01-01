import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dBConnect from './db/dbConnect';

//routes
import userRouter from './routes/userRoutes';

const url = 'mongodb://127.0.0.1:27017/blog';

const connect = new dBConnect(url);



const app = express();


app.use(cors());

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(helmet());

app.use('/user', userRouter);

app.listen(process.env.PORT, () => {
	connect.Connect();
	console.log('SERVER START');
});
