import 'dotenv/config';
import mongoose from 'mongoose';


class dBConnect  {
	private UrlConnect: string;

	constructor(UrlConnect: string) {
		this.UrlConnect = UrlConnect;
	}

	get getUrlConnect ():string {
		return this.UrlConnect;
	}

	set setUrlConnect (url: string) {
		this.UrlConnect = url;
	}

	async Connect () {
		const url = this.getUrlConnect;
		try {
			await mongoose.connect(url);
			console.log('Connect in Db');
		} catch (e) {
			console.log(e  + '' + 'NOT POSSIBLE CONNECT');
		}
    
	}
}

export default dBConnect;