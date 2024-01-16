import mongoose, { Model, Schema } from 'mongoose';


interface IPost {
  image: Array<string>,
  Title: string,
  Content: string,
  Author: string,
  IdAuthor: string
  categoric: string
}


const schema = new Schema<IPost, Model<IPost>> ({
	image: {
		type: [Object]
	},
	Title: {
		type: String,
		required: true,
	},
	Content: {
		type: String,
		required: true,
	},
	Author: {
		type: String,
		required: true
	},
	IdAuthor: {
		type: String,
		required: true
	},
	categoric: {
		type: String,
		required: true
	}
});

export const post = mongoose.model('posts', schema);