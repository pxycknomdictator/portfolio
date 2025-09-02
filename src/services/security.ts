import argon2 from "argon2";
import { logger } from "$lib/winston";
import * as env from "$env/static/private";

export class PasswordService {
	private readonly secret = Buffer.from(env.ARGON2_SECRET_KEY, "utf-8");
	private readonly options = {
		hashLength: 69,
		parallelism: 4,
		memoryCost: 65536,
		secret: this.secret,
		type: argon2.argon2id
	};

	public async hash(password: string): Promise<string> {
		try {
			return await argon2.hash(password, this.options);
		} catch (error) {
			logger.error("Failed to hash password");
			throw error;
		}
	}

	public async verify(hash: string, password: string): Promise<boolean> {
		try {
			return await argon2.verify(hash, password, { secret: this.secret });
		} catch (error) {
			logger.error("Failed to verify password");
			throw error;
		}
	}
}
