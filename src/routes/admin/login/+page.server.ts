import type { Actions } from "./$types";
import { zodAdminSchema } from "$utils/zod";
import { message, superValidate } from "sveltekit-superforms";
import { zod4 } from "sveltekit-superforms/adapters";
import type { ZodValidationSchema } from "sveltekit-superforms/adapters";

export const load = async () => {
	const form = await superValidate(zod4(zodAdminSchema as unknown as ZodValidationSchema));
	return { form };
};

export const actions: Actions = {
	async login({ request }) {
		const form = await superValidate(
			request,
			zod4(zodAdminSchema as unknown as ZodValidationSchema)
		);

		if (!form.valid) {
			return message(form, "Invalid Entries", { status: 400 });
		}

		return message(form, "Form Submitted Successfully");
	}
};
