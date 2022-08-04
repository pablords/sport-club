import { createClient } from "redis"

export const clientRedis = createClient({
  url: `redis://default:${process.env.DB_REDIS_PASSWORD}@${process.env.DB_REDIS_HOST}:${process.env.DB_REDIS_PORT}`
})

clientRedis.on("error", (err) => console.log("Redis Client Error", err))
