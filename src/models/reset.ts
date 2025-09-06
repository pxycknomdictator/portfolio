import mongoose, { Schema, model } from "mongoose";
import type { Document, Model, ObjectId } from "mongoose";

interface ResetInterface extends Document {
	adminId: ObjectId;
	recoveryCode: string;
	expiresAt: Date;
}

const resetSchema = new Schema<ResetInterface>(
	{
		adminId: {
			type: Schema.Types.ObjectId,
			ref: "Admin",
			required: [true, "adminId is required"]
		},
		recoveryCode: {
			type: String,
			required: [true, "Recovery Code is required"],
			minlength: [6, "Recovery Code must be 6 characters long"],
			maxlength: [6, "Recovery Code must be 6 characters long"]
		},
		expiresAt: {
			type: Date,
			default: () => new Date(Date.now() + 5 * 60 * 1000),
			index: { expires: 0 }
		}
	},
	{ timestamps: true }
);

export const Reset =
	(mongoose.models?.Reset as Model<ResetInterface>) ||
	model<ResetInterface>("Reset", resetSchema);
