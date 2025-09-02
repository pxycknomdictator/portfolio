import { Admin } from "$models/admin";
import { logger } from "$lib/winston";
import { PasswordService, TokenService } from "$services/security";

interface AuthServerResponse {
	success: true;
	message: string;
	accessToken: string;
	refreshToken: string;
	admin: { _id: string; name: string; email: string };
}

interface AuthErrorResponse {
	success: false;
	message: string;
}

export class AuthService {
	private readonly adminModel: typeof Admin = Admin;
	private readonly tokenService = new TokenService();
	private readonly passwordService = new PasswordService();

	public async authenticate(
		email: string,
		password: string
	): Promise<AuthServerResponse | AuthErrorResponse> {
		try {
			const admin = await this.adminModel.findOne({ email }).select("+password").lean();

			if (!admin) {
				logger.warn(`Email not found: ${email}`);
				return { success: false, message: "Invalid email or password" };
			}

			const isCorrectPassword = await this.passwordService.verify(admin.password, password);

			if (!isCorrectPassword) {
				logger.warn(`Password mismatch for email: ${email}`);
				return { success: false, message: "Invalid email or password" };
			}

			const payload = {
				_id: admin._id.toString(),
				name: admin.name,
				email: admin.email
			};

			const { accessToken, refreshToken } = this.tokenService.getTokens(payload);

			if (!accessToken || !refreshToken) {
				logger.warn("Failed to generate authentication tokens");
				return { success: false, message: "Failed to generate authentication tokens" };
			}

			await this.adminModel.findByIdAndUpdate(admin._id, { refreshToken });
			const response = {
				accessToken,
				refreshToken,
				success: true,
				admin: payload,
				message: "Authentic Admin"
			};

			return response;
		} catch (error) {
			logger.error(`Auth service crashed: ${(error as Error).message}`);
			throw error;
		}
	}
}
