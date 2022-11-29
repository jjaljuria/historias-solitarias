import { Schema, model, connect, ObjectId } from 'mongoose';
import {v4} from 'uuid'

export interface IAuthor{
	_id: ObjectId;
	name: string;
	password: string;
	description: string;
}

const authorSchema: Schema = new Schema<IAuthor>({
	name: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
	},
	description: String
},{
	timestamps: true,
})

export const Author = model<IAuthor>('Author',authorSchema)