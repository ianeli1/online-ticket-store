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
export class User {
  @Field()
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: "date" })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field()
  @Property()
  name!: string;

  @Field()
  @Property()
  email!: string;

  @Property()
  password!: string;

  @Field(() => Date)
  @Property({ type: "date", nullable: true })
  birthday: Date;

  @Field(() => [Ticket])
  @OneToMany(() => Ticket, (ticket) => ticket.owner)
  tickets = new Collection<Ticket>(this);
}
