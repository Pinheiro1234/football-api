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
}
