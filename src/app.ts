import cors from "cors";
import "dotenv/config";
import express from "express";
import http from "http";
import { apiErrorHandler } from "./error/api_error_handler";
import { datesRouter } from "./routes/dates_routes";
import { matchRouter } from "./routes/match_routes";
import { roundsRouter } from "./routes/rounds_routes";
import { statisticsRouter } from "./routes/statistics_routes";
import { teamsRouter } from "./routes/teams_routes";

const app = express();
const serverHttp = http.createServer(app);

// Permitir CORS para todas as origens
app.use(cors());

app.use(express.json());
app.use(matchRouter);
app.use(teamsRouter);
app.use(statisticsRouter);
app.use(datesRouter);
app.use(roundsRouter);

app.use(apiErrorHandler);

export { app, serverHttp };
