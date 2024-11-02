import { prismaClient } from "../prisma";

export class DatesService {
  async getAll() {
    let dates = prismaClient.dates.findMany();

    return dates;
  }
}
