"use strict";

// Read the .env file.
import * as dotenv from "dotenv";
dotenv.config();

// Require the framework
import Fastify from "fastify";

// Instantiate Fastify with some config
const app = Fastify({
  logger: true,
});

// Register your application as a normal plugin.
app.register(import("../dist/app.js"));

export default async (req, res) => {
  try {
    await app.ready();
    console.log("coucou")
    app.server.emit("request", req, res);
  } catch (err) {
    console.error(err);
  }
};
