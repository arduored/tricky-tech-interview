import { FastifyPluginAsync } from "fastify";

const player: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/player/:id", async function (request, reply) {
    return { params: request.params };
  });
};

export default player;
