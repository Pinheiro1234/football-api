import { ApiError } from "../error/api_error";
import { prismaClient } from "../prisma";

export class TeamsService {
  async getAll() {
    let teams = await prismaClient.teams.findMany();

    return teams;
  }

  async getById(id: number) {
    let team = await prismaClient.teams.findUnique({
      where: {
        id: id,
      },
    });

    if (!team) {
      throw ApiError.notFound("Time não encontrado");
    }

    return team;
  }

  async getAllClassification() {
    const teams = await prismaClient.teams.findMany({
      select: {
        id: true,
        name: true,
        imgUrl: true,
        homeGames: {
          select: {
            teamHomeGoals: true,
            teamVisitGoals: true,
          },
        },
        visitGames: {
          select: {
            teamHomeGoals: true,
            teamVisitGoals: true,
          },
        },
      },
    });

    // Calcula pontos e classificação
    const classification = teams.map((team) => {
      let points = 0;
      let wins = 0;
      let draws = 0;
      let losses = 0;

      // Processa jogos como time da casa
      team.homeGames.forEach((game) => {
        if ((game.teamHomeGoals ?? 0) > (game.teamVisitGoals ?? 0)) {
          wins++;
          points += 3;
        } else if (
          game.teamHomeGoals === game.teamVisitGoals &&
          game.teamHomeGoals &&
          game.teamVisitGoals
        ) {
          draws++;
          points += 1;
        } else {
          losses++;
        }
      });

      // Processa jogos como visitante
      team.visitGames.forEach((game) => {
        if ((game.teamVisitGoals ?? 0) > (game.teamHomeGoals ?? 0)) {
          wins++;
          points += 3;
        } else if (
          game.teamVisitGoals === game.teamHomeGoals &&
          game.teamHomeGoals &&
          game.teamVisitGoals
        ) {
          draws++;
          points += 1;
        } else {
          losses++;
        }
      });

      return {
        id: team.id,
        name: team.name,
        imgUrl: team.imgUrl,
        points,
        wins,
        draws,
        losses,
      };
    });

    // Ordena pela pontuação (do maior para o menor)
    classification.sort((a, b) => b.points - a.points);

    return classification;
  }
}
