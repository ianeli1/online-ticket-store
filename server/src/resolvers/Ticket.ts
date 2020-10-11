import { Ticket } from "../entities/Ticket";
import { Trip } from "../entities/Trip";
import { User } from "../entities/User";
import { Resolver, Query, Ctx, Arg, Mutation } from "type-graphql";
import { Context } from "../types";

@Resolver()
export class TicketResolver {
  @Query(() => [Ticket])
  async tickets(@Ctx() { em }: Context): Promise<Ticket[]> {
    return em.find(Ticket, {});
  }

  @Query(() => Ticket, { nullable: true })
  ticket(
    @Arg("id") id: number,
    @Ctx() { em }: Context
  ): Promise<Ticket | null> {
    return em.findOne(Ticket, { id });
  }

  @Mutation(() => Ticket, { nullable: true })
  async createTicket(
    @Arg("userId") userId: number,
    @Arg("tripId") tripId: number,
    @Arg("price", () => Number, { nullable: true }) price: number,
    @Ctx() { em }: Context
  ): Promise<Ticket | string> {
    try {
      const user = await em.findOne(User, { id: userId });
      const trip = await em.findOne(Trip, { id: tripId });
      if (user && trip) {
        const ticket = em.create(Ticket, { owner: user, trip, price });
        await em.persistAndFlush(ticket);
        return ticket;
      } else {
        return user
          ? "Failed to obtain the required Trip element"
          : "Failed to obtain this user";
      }
    } catch (e) {
      console.log(e.message);
      return "An unknown error has ocurred";
    }
  }

  @Mutation(() => Ticket, { nullable: true })
  async updateTicket(
    @Arg("id") id: number,
    @Arg("price", () => Number, { nullable: true }) price: number,
    @Ctx() { em }: Context
  ): Promise<Ticket | null> {
    const ticket = await em.findOne(Ticket, { id });
    if (!ticket) {
      return null;
    }
    if (typeof price !== "undefined") {
      ticket.price = price;
      await em.persistAndFlush(ticket);
    }
    return ticket;
  }

  @Mutation(() => Boolean)
  async deleteTicket(
    @Arg("id") id: number,
    @Ctx() { em }: Context
  ): Promise<boolean> {
    await em.nativeDelete(Ticket, { id });
    return true;
  }
}
