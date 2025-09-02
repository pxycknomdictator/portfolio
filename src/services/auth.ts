import { Admin } from "$models/admin";
import { logger } from "$lib/winston";
import { PasswordService, TokenService } from "$services/security";

export class AuthService {
	private readonly adminModel: typeof Admin = Admin;
	private readonly passwordService = new PasswordService();
	private readonly tokenService = new TokenService();

	public async authenticate(email: string, password: string) {
		try {
			const admin = await this.adminModel.findOne({ email }).select("+password").lean();

			if (!admin) {
				logger.warn(`Email is not found: ${email}`);
				return null;
			}

			const isCorrectPassword = await this.passwordService.verify(admin.password, password);

			if (!isCorrectPassword) {
				logger.warn(`Password mismatch for email: ${email}`);
				return null;
			}

			const payload = {
				_id: admin._id.toString(),
				name: admin.name,
				email: admin.email
			};

			const { accessToken, refreshToken } = this.tokenService.getTokens(payload);

			if (!accessToken || !refreshToken) {
				return null;
			}

			if (accessToken && refreshToken) {
				await this.adminModel.findByIdAndUpdate(admin._id, { refreshToken });
			}

			return { success: true, accessToken, refreshToken, admin: payload };
		} catch (error) {
			logger.error(`Auth service crashed: ${(error as Error).message}`);
			throw error;
		}
	}
}
