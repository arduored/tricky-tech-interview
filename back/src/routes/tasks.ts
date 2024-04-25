import { FastifyPluginAsync } from "fastify";

const tasks: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/tasks", async function (request, reply) {
    return {
      tasks: [
        { color: "#FFFFFF", spawnRate: 0.1, value: 0, life: 60 },
        { color: "#6699CC", spawnRate: 0.6, value: 10, life: 50 },
        { color: "#A53860", spawnRate: 0.2, value: 30, life: 70 },
        { color: "#FFC145", spawnRate: 0.1, value: 50, life: 90 },
      ],
    };
  });
};

export default tasks;
