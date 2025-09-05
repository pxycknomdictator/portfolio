import { redirect, type Handle } from "@sveltejs/kit";
import { database } from "$lib/mongoose";

const protectedRoutes = ["/admin/dashboard"];

export const handle: Handle = async ({ event, resolve }) => {
	await database();

	if (protectedRoutes.includes(event.url.pathname)) {
		const token = event.cookies.get("accessToken");
		if (!token) throw redirect(303, "/admin/login");
	}

	return await resolve(event);
};
