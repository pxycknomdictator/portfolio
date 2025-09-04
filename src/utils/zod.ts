import { z } from "zod/v4";

export const zodAdminSchema = z.object({
	email: z.email().lowercase({ error: "Invalid email address" }),
	password: z.string().min(8, { error: "Password must be 8 characters long" })
});

export type ZodAdminSchema = z.infer<typeof zodAdminSchema>;
