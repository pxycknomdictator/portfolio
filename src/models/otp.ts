import mongoose, { Schema, model } from "mongoose";
import type { Document, Model } from "mongoose";

interface OPTInterface extends Document {
	sender: string;
	receiver: string;
	OTP: string;
	expiresAt: Date;
}

const otpSchema = new Schema<OPTInterface>(
	{
		sender: {
			type: String,
			trim: true,
			lowercase: true,
			required: [true, "Sender is required"]
		},
		receiver: {
			type: String,
			trim: true,
			lowercase: true,
			required: [true, "Receiver is required"]
		},
		OTP: {
			type: String,
			trim: true,
			unique: true,
			required: [true, "OTP is required"],
			minlength: [6, "OTP must be 6 characters long"],
			maxlength: [6, "OTP must be 6 characters long"]
		},
		expiresAt: {
			type: Date,
			default: () => new Date(Date.now() + 5 * 60 * 1000),
			index: { expires: 0 }
		}
	},
	{ timestamps: true }
);

export const OTP =
	(mongoose.models?.OTP as Model<OPTInterface>) || model<OPTInterface>("OTP", otpSchema);
