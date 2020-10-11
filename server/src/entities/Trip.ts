import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { Ticket } from "./Ticket";

@ObjectType()
@Entity()
export class Trip {
  @Field()
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: "date" })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field(() => String)
  @Property({ type: "date" })
  date!: Date;

  @Field()
  @Property()
  capacity!: number;

  @Field()
  @Property()
  busId!: string;

  @Field(() => [Ticket])
  @OneToMany(() => Ticket, (ticket) => ticket.trip)
  tickets = new Collection<Ticket>(this);
}
