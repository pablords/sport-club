import express from "express";
import cors from "cors";
import { router } from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "../docs/api.json";
import { api } from "./routes";


export const server = express();
server.use(cors());

server.use(`/${api}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerDoc));

//server.use(express.static("docs"));



// server.use(
//   `/${api}/docs`,
//   swaggerUi.serve,
//   swaggerUi.setup(undefined, {
//     swaggerOptions: {
//       url: "/swagger.json",
//       servers: [
//         {
//           url: "http://10.0.0.172:3009",
//           description: "Api de teste",
//         },
//       ],
//     },
//   })
// );

server.use("/", router);
