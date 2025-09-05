import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
	const flashMessage = url.searchParams.get("login");

	return { flashMessage };
};
