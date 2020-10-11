import { Trip } from "../entities/Trip";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "../types";
import { TripInput } from "./types";

@Resolver()
export class TripResolver {
  @Query(() => [Trip])
  async trips(@Ctx() { em }: Context): Promise<Trip[]> {
    return em.find(Trip, {});
  }

  @Query(() => Trip)
  async trip(@Arg("id") id: number, @Ctx() { em }: Context) {
    return em.findOne(Trip, { id });
  }

  @Mutation(() => Trip)
  async createTrip(
    @Arg("args") args: TripInput,
    @Ctx() { em }: Context
  ): Promise<Trip> {
    const trip = em.create(Trip, {
      date: args.date,
      capacity: args.capacity,
      busId: args.busId,
    });
    await em.persistAndFlush(trip);
    return trip;
  }
}
