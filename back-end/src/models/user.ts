import mongoose from 'mongoose';

const {Schema} = mongoose;

const UserModel = mongoose.model(
	'User',
	new Schema ({
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
		},
		password: {
			type: String,
			require: true,
		}

	}, { timestamps: true}));

export default UserModel;