import mongoose, { Model, Schema } from 'mongoose';

export interface IModelUser {
  id?: string;
  name: string;
  image: string;
  password: string;
  email: string;
}


const schema = new Schema<IModelUser, Model<IModelUser>> ({
	image: {
		type: String,
	},
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		require: true,
		unique: true
	},
	password: {
		type: String,
		require: true,
	}

}, { timestamps: true});

export const user = mongoose.model('user', schema); 