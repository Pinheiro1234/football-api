import { prismaClient } from "../prisma";

export class StatisticsService {
  async getTeamStatistics(teamId: number) {
    const winsAsHome = await prismaClient.matches.count({
      where: {
        teamHomeId: teamId,
        teamHomeGoals: { gt: 0 }, // Contando vitórias como time da casa
      },
      orderBy: {
        teamVisitGoals: "asc",
      },
    });

    const winsAsVisit = await prismaClient.matches.count({
      where: {
        teamVisitId: teamId,
        teamVisitGoals: { gt: 0 }, // Contando vitórias como time visitante
      },
      orderBy: {
        teamHomeGoals: "asc",
      },
    });

    const drawsAsHome = await prismaClient.matches.count({
      where: {
        teamHomeId: teamId,
        teamHomeGoals: { equals: 0 }, // Contando empates como time da casa
      },
      orderBy: {
        teamVisitGoals: "asc",
      },
    });

    const drawsAsVisit = await prismaClient.matches.count({
      where: {
        teamVisitId: teamId,
        teamVisitGoals: { equals: 0 }, // Contando empates como time visitante
      },
      orderBy: {
        teamHomeGoals: "asc",
      },
    });

    const lossesAsHome = await prismaClient.matches.count({
      where: {
        teamHomeId: teamId,
        teamHomeGoals: { lt: 0 }, // Contando derrotas como time da casa
      },
      orderBy: {
        teamVisitGoals: "asc",
      },
    });

    const lossesAsVisit = await prismaClient.matches.count({
      where: {
        teamVisitId: teamId,
        teamVisitGoals: { lt: 0 }, // Contando derrotas como time visitante
      },
      orderBy: {
        teamHomeGoals: "asc",
      },
    });

    return {
      teamId: teamId,
      wins: winsAsHome + winsAsVisit,
      draws: drawsAsHome + drawsAsVisit,
      losses: lossesAsHome + lossesAsVisit,
    };
  }
}
