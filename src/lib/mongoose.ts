import mongoose from "mongoose";
import { logger } from "./winston";
import * as env from "$env/static/private";

export async function database() {
	if (mongoose.connection.readyState === 1) return mongoose.connection;

	try {
		const { connection } = await mongoose.connect(env.DATABASE);
		logger.info("Database is connected");
		return connection;
	} catch (error) {
		logger.error("Failed to connect with database");
		throw error;
	}
}
