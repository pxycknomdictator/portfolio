import winston from "winston";
import * as env from "$env/static/private";

const { combine, colorize, timestamp, printf } = winston.format;

const custom = printf(({ level, message, timestamp }) => `${timestamp} [${level}]: ${message}`);
const format = combine(colorize(), timestamp(), custom);

export const logger = winston.createLogger({
	level: env.NODE_ENV !== "production" ? "debug" : "info",
	format: format,
	transports: [new winston.transports.Console()]
});
