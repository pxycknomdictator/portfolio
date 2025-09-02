import mongoose, { Schema, model } from "mongoose";
import type { Document, Model, ObjectId } from "mongoose";

interface TechnologyInterface extends Document {
	userId: ObjectId;
	category: "Frontend" | "Backend" | "DevOps" | "Tools";
	technology: string;
	image?: string;
	publicId?: string;
	imageType?: string;
}

const technologySchema = new Schema<TechnologyInterface>(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "Admin",
			required: [true, "userId is required"]
		},
		category: {
			type: String,
			required: [true, "Category is required"],
			enum: ["Frontend", "Backend", "DevOps", "Tools"]
		},
		technology: {
			type: String,
			unique: true,
			required: [true, "Technology is required"]
		},
		image: {
			type: String,
			required: [true, "Image is required"]
		},
		publicId: {
			type: String,
			required: [true, "Public Id is required"]
		},
		imageType: {
			type: String,
			required: [true, "Image Type is required"]
		}
	},
	{ timestamps: true }
);

export const Technology =
	(mongoose.models?.Technology as Model<TechnologyInterface>) ||
	model<TechnologyInterface>("Technology", technologySchema);
