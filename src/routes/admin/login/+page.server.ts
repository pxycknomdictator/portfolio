import type { Actions } from "./$types";
import { database } from "$lib/mongoose";
import * as env from "$env/static/private";
import { zodAdminSchema } from "$utils/zod";
import { AuthService } from "$src/services/auth";
import { zod4 } from "sveltekit-superforms/adapters";
import { message, superValidate } from "sveltekit-superforms";
import type { ZodValidationSchema } from "sveltekit-superforms/adapters";

export const load = async () => {
	const form = await superValidate(zod4(zodAdminSchema as unknown as ZodValidationSchema));
	return { form };
};

export const actions: Actions = {
	async login({ request, cookies }) {
		await database();

		const form = await superValidate(
			request,
			zod4(zodAdminSchema as unknown as ZodValidationSchema)
		);

		if (!form.valid) {
			return message(form, "Invalid Entries", { status: 400 });
		}

		const { email, password } = form.data as { email: string; password: string };

		const authService = new AuthService();
		const response = await authService.authenticate(email, password);

		if (!response.success) {
			return message(form, response.message, { status: 404 });
		}

		cookies.set("accessToken", response.accessToken, {
			path: "/",
			httpOnly: true,
			maxAge: 60 * 60 * 24,
			secure: env.NODE_ENV === "production",
			sameSite: env.NODE_ENV === "production" ? "strict" : "lax"
		});

		return message(form, "Form Submitted Successfully");
	}
};
