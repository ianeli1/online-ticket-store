import { Field, InputType } from "type-graphql";

@InputType()
export class UserInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => String)
  birthday: Date;
}

@InputType()
export class TripInput {
  @Field(() => String)
  date: Date;

  @Field()
  capacity: number;

  @Field()
  busId: string;
}
