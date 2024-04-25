import { FastifyPluginAsync } from "fastify";

const tasks: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/tasks", async function (request, reply) {
    return {
      tasks: [
        { color: "#A53860", spawnRate: 0.3, value: 30, life: 60 },
        { color: "#6699CC", spawnRate: 0.45, value: 10, life: 50 },
        { color: "#FFFFFF", spawnRate: 0.2, value: 0, life: 70 },
        { color: "#FFC145", spawnRate: 0.05, value: 50, life: 90 },
      ],
    };
  });
};

export default tasks;
