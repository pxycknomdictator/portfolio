import type { Handle } from "@sveltejs/kit";
import { database } from "$lib/mongoose";

export const handle: Handle = async ({ event, resolve }) => {
	await database();
	return await resolve(event);
};
