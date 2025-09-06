import mongoose, { Schema, model } from "mongoose";
import type { Document, Model, ObjectId } from "mongoose";

interface ProjectInterface extends Document {
	adminId: ObjectId;
	title: string;
	description: string;
	tags: Array<string>;
	sourceCodeLink: string;
	previewLink: string;
	image: string;
	publicId: string;
	imageType: string;
}

const projectSchema = new Schema<ProjectInterface>(
	{
		adminId: {
			type: Schema.Types.ObjectId,
			ref: "Admin",
			required: [true, "adminId is required"]
		},
		title: {
			type: String,
			unique: true,
			required: [true, "Title is required"]
		},
		description: {
			type: String,
			required: [true, "Description is required"],
			maxlength: [500, "Description must be 500 characters long"]
		},
		tags: {
			type: [String],
			required: [true, "At least 1 Tag is required"]
		},
		sourceCodeLink: {
			type: String,
			trim: true,
			unique: true,
			required: [true, "SourceCodeLink is required"]
		},
		previewLink: {
			type: String,
			trim: true,
			unique: true,
			required: [true, "PreviewLink is required"]
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

export const Project =
	(mongoose.models?.Project as Model<ProjectInterface>) ||
	model<ProjectInterface>("Project", projectSchema);
