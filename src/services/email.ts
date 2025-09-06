import { Resend } from "resend";
import { logger } from "$lib/winston";
import * as env from "$env/static/private";

interface EmailPayload {
	from: string;
	to: string | string[];
	subject: string;
	html: string;
}

interface EmailResponse {
	success: boolean;
	message: string;
}

export class EmailService {
	private readonly resend: Resend = new Resend(env.RESEND_API_KEY);

	public async send({ from, to, html, subject }: EmailPayload): Promise<EmailResponse> {
		try {
			const response = await this.resend.emails.send({ from, to, subject, html });

			if (response.error) {
				logger.error(`Email send failed: ${response.error.message}`);
				return { success: false, message: response.error.message };
			}

			logger.info(`Email sent successfully to ${to}`);
			return {
				success: true,
				message: `Email sent with ID: ${response.data?.id ?? "unknown"}`
			};
		} catch (error) {
			logger.error(`Email service crashed: ${(error as Error).message}`);
			throw error;
		}
	}
}
