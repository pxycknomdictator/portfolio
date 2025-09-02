import mongoose, { Schema, model } from "mongoose";
import type { Document, Model } from "mongoose";

interface AdminInterface extends Document {
	name: string;
	email: string;
	password: string;
	OS?: string;
	refreshToken?: string;
	image?: string;
	publicId?: string;
	imageType?: string;
}

const adminSchema = new Schema<AdminInterface>(
	{
		name: {
			type: String,
			trim: true,
			required: [true, "Name is required"]
		},
		email: {
			type: String,
			trim: true,
			unique: true,
			lowercase: true,
			required: [true, "Email is required"]
		},
		password: {
			type: String,
			trim: true,
			select: false,
			required: [true, "Password is required"],
			minlength: [3, "Password must be 8 characters long"]
		},
		OS: {
			type: String,
			required: false,
			default: "Linux (Debian)"
		},
		refreshToken: {
			type: String,
			unique: true,
			select: false,
			required: false
		},
		image: {
			type: String,
			required: false
		},
		publicId: {
			type: String,
			required: false
		},
		imageType: {
			type: String,
			required: false
		}
	},
	{ timestamps: true }
);

export const Admin =
	(mongoose.models?.Admin as Model<AdminInterface>) ||
	model<AdminInterface>("Admin", adminSchema);
