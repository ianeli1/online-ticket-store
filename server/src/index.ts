import express from "express";
import { MikroORM } from "@mikro-orm/core";
import cors from "cors";
import config from "./mikro-orm.config";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import "reflect-metadata";

import { TicketResolver } from "./resolvers/Ticket";
import { UserResolver } from "./resolvers/User";
import { TripResolver } from "./resolvers/Trip";
console.log("%cStarting server⚡...", "color: red;");

const main = async () => {
  const orm = await MikroORM.init(config);
  await orm.getMigrator().up();

  const app = express();
  app.use(express.json());
  app.use(cors());

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [TicketResolver, UserResolver, TripResolver],
      validate: false,
    }),
    context: () => ({
      em: orm.em,
    }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4000, () => {
    console.log("%cServer started on localhost:4000 ✔", "color: green;");
  });
};

main().catch((e) => console.error(e));
