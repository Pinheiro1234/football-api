import { prismaClient } from "../prisma";

export class RoundsService {
  async getAll() {
    let rounds = prismaClient.rounds.findMany();

    return rounds;
  }

  async getMatchesByRoundId(id: number) {
    let matches = await prismaClient.matches.findMany({
      select: {
        id: true,
        round: {
          select: {
            name: true,
          },
        },
        date: {
          select: {
            day: true,
          },
        },
        teamHomeId: false,
        teamHomeGoals: true,
        teamVisitId: false,
        teamVisitGoals: true,
        teamHome: true,
        teamVisit: true,
      },
      where: {
        roundId: id,
      }
    });

    // Transformando os campos `round` e `date` para strings diretas
    let mapped = matches.map((match) => ({
      ...match,
      round: match.round?.name,
      date: match.date?.day,
    }));

    return mapped;
  }
}
