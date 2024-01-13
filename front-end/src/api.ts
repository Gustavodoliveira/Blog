'use client';
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.NEXT_PUBLIC_API;



import axios from 'axios';

export default axios.create({
	baseURL: url
});