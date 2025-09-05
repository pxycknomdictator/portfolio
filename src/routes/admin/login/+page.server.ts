import type { Actions } from "./$types";
import { redirect } from "@sveltejs/kit";
import * as env from "$env/static/private";
import { zodAdminSchema } from "$utils/zod";
import { AuthService } from "$src/services/auth";
import { message, superValidate } from "sveltekit-superforms";
import { zod4, type ZodValidationSchema } from "sveltekit-superforms/adapters";

export const load = async ({ cookies }) => {
	const token = cookies.get("accessToken");
	if (token) throw redirect(303, "/admin/dashboard");

	const form = await superValidate(zod4(zodAdminSchema as unknown as ZodValidationSchema));
	return { form };
};

export const actions: Actions = {
	async login({ request, cookies }) {
		const form = await superValidate(
			request,
			zod4(zodAdminSchema as unknown as ZodValidationSchema)
		);

		if (!form.valid) {
			return message(form, "Invalid Credentials Form Entries");
		}

		const { email, password } = form.data as { email: string; password: string };

		const authService = new AuthService();
		const response = await authService.authenticate(email, password);

		if (!response.success) {
			return message(form, response.message);
		}

		cookies.set("accessToken", response.accessToken, {
			path: "/",
			httpOnly: true,
			maxAge: 60 * 60 * 24,
			secure: env.NODE_ENV === "production",
			sameSite: env.NODE_ENV === "production" ? "strict" : "lax"
		});

		throw redirect(303, "/admin/dashboard");
	}
};
