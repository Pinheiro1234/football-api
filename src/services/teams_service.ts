import { prismaClient } from "../prisma";

export class TeamsService {
  async getAll() {
    let teams = await prismaClient.teams.findMany();

    return teams;
  }
}
