import mongoose from 'mongoose';

export function ValidId (id: string) {
	const validId = mongoose.Types.ObjectId.isValid(id);

	if(!validId) return false;

	return id;
}