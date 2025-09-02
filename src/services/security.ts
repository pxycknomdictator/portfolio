import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { logger } from "$lib/winston";
import * as env from "$env/static/private";
import type { JwtPayload, SignOptions } from "jsonwebtoken";

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

interface TokenPayload {
	_id: string;
	name: string;
	email: string;
}

interface TokenResponse {
	accessToken: string | null;
	refreshToken: string | null;
}

export class TokenService {
	private readonly accessTokenOptions: SignOptions = { expiresIn: "1d", algorithm: "HS256" };
	private readonly refreshTokenOptions: SignOptions = { expiresIn: "7d", algorithm: "HS256" };

	public getTokens(payload: TokenPayload): TokenResponse {
		const accessToken = this.generateAccessToken(payload._id);
		const refreshToken = this.generateRefreshToken(payload);

		if (!accessToken || !refreshToken) {
			logger.warn("Failed to generate tokens");
			return { accessToken: null, refreshToken: null };
		}

		return { accessToken, refreshToken };
	}

	private generateAccessToken(_id: string): string {
		return jwt.sign({ _id }, env.JWT_ACCESS_TOKEN_SECRET, this.accessTokenOptions);
	}

	private generateRefreshToken(payload: TokenPayload): string {
		return jwt.sign(payload, env.JWT_REFRESH_TOKEN_SECRET, this.refreshTokenOptions);
	}

	public verifyAccessToken(token: string): JwtPayload {
		return jwt.verify(token, env.JWT_ACCESS_TOKEN_SECRET) as JwtPayload;
	}

	public verifyRefreshToken(token: string): JwtPayload {
		return jwt.verify(token, env.JWT_REFRESH_TOKEN_SECRET) as JwtPayload;
	}
}
