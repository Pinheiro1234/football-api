import { prismaClient } from "../prisma";

export class RoundsService {
  async getAll() {
    let rounds = prismaClient.rounds.findMany();

    return rounds;
  }
}
