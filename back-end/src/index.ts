import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import  path from 'path';
import dBConnect from './db/dbConnect';

//routes
import userRouter from './routes/userRoutes';
import cookieParser from 'cookie-parser';
import postRouter from './routes/postRoutes';

const url = process.env.URLCONNECT || '';

const connect = new dBConnect(url);



const app = express();

const CorsOptions = {
	credentials: true,
	origin: '*'
};


app.use(cors(CorsOptions));

app.use('/public', express.static(path.join(__dirname, './public')));

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser(process.env.CookieSecret));

app.use(helmet());


app.use('/user', userRouter);
app.use('/post', postRouter);

app.listen(process.env.PORT, () => {
	connect.Connect();
	console.log('SERVER START');
});
