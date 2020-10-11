import { MikroORM } from "@mikro-orm/core";
import { Ticket } from "./entities/Ticket";
import path from "path";
import { User } from "./entities/User";
import { Trip } from "./entities/Trip";

export default {
  entities: [Ticket, User, Trip],
  dbName: "ticketstore",
  type: "postgresql",
  password: "postgre",
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
} as Parameters<typeof MikroORM.init>[0];
