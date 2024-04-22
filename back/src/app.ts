import { FastifyHttpOptions, FastifyInstance } from "fastify";

async function routes(fastify: FastifyInstance, options: any) {
  fastify.get("/", async (request, reply) => {
    return { hello: "world" };
  });
}

export default routes;
