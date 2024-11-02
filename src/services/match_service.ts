import { ApiError } from "../error/api_error";
import { prismaClient } from "../prisma";
import { MatchCommand } from "./../interfaces/commands/match_command";
export class MatchService {
  async add(command: MatchCommand) {
    // Passo 1: Buscar o maior valor de 'id' na tabela 'matches'
    const maxId = await prismaClient.matches.aggregate({
      _max: {
        id: true,
      },
    });

    // Passo 2: Definir o novo 'id' incrementado
    const newId = (maxId._max.id || 0) + 1;

    // Passo 3: Criar o novo registro usando o 'newId' e os dados fornecidos
    const newMatch = await prismaClient.matches.create({
      data: {
        id: newId,
        dateId: command.dateId,
        roundId: command.roundId,
        teamHomeId: command.teamHomeId,
        teamHomeGoals: command.teamHomeGoals,
        teamVisitId: command.teamVisitId,
        teamVisitGoals: command.teamVisitGoals,
      },
    });

    return newMatch;
  }

  async getAll() {
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
    });

    // Transformando os campos `round` e `date` para strings diretas
    let mapped = matches.map((match) => ({
      ...match,
      round: match.round?.name,
      date: match.date?.day,
    }));

    return mapped;
  }

  async getById(id: number) {
    let match = await prismaClient.matches.findUnique({
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
        id: id,
      },
    });

    if (!match) {
      throw ApiError.notFound("Partida não encontrada");
    }

    // Transformando os campos `round` e `date` para strings diretas
    let mapped = {
      ...match,
      round: match?.round?.name,
      date: match?.date?.day,
    };

    return mapped;
  }

  async delete(matchId: number) {
    let match = await prismaClient.matches.findUnique({
      where: { id: matchId },
    });

    if (!match) {
      throw ApiError.notFound("Partida não existe");
    }

    await prismaClient.matches.delete({
      where: { id: matchId },
    });
    return matchId;
  }

  async update(command: UpdateMatchCommand) {
    let matchExists = await prismaClient.matches.findUnique({
      where: {
        id: command.id,
      },
    });

    if (!matchExists) {
      throw ApiError.notFound("Partida não existe");
    }

    let match = await prismaClient.matches.update({
      data: {
        dateId: command.dateId,
        roundId: command.roundId,
        teamHomeId: command.teamHomeId,
        teamHomeGoals: command.teamHomeGoals,
        teamVisitId: command.teamVisitId,
        teamVisitGoals: command.teamVisitGoals,
      },
      where: {
        id: command.id,
      },
    });

    return match;
  }
}
