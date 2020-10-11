import { User } from "../entities/User";
import { Arg, Ctx, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "../types";
import { UserInput } from "./types";
import argon2 from "argon2";

@InputType()
@Resolver()
export class UserResolver {
  @Query(() => [User])
  users(@Ctx() { em }: Context): Promise<User[]> {
    return em.find(User, {});
  }

  @Query(() => User, { nullable: true })
  user(@Arg("id") id: number, @Ctx() { em }: Context): Promise<User | null> {
    return em.findOne(User, { id });
  }

  @Mutation(() => User)
  async createUser(@Arg("args") args: UserInput, @Ctx() { em }: Context) {
    try {
      const hash = await argon2.hash(args.password);
      const user = em.create(User, {
        name: args.name,
        email: args.email,
        password: hash,
        birthday: new Date(args.birthday),
      });
      await em.persistAndFlush(user);
      return user;
    } catch (e) {
      console.log(e);
      return "An unexpected error has ocurred";
    }
  }
}
