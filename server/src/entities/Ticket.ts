import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { Trip } from "./Trip";
import { User } from "./User";

@ObjectType()
@Entity()
export class Ticket {
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
  price: number;

  @Field(() => Trip)
  @ManyToOne(() => Trip)
  trip!: Trip;

  @Field(() => User)
  @ManyToOne(() => User)
  owner!: User;
}
