import crypto from "node:crypto";

export function generateOTP() {
	let OTP = "";

	for (let index = 1; index <= 6; index += 1) {
		OTP += crypto.randomInt(10);
	}

	return OTP;
}
