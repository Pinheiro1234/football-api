import "dotenv/config";
import express from "express";
import http from "http";
import { apiErrorHandler } from "./error/api_error_handler";
import { classificationRouter } from "./routes/classification_routes";
import { matchRouter } from "./routes/match_routes";
import { teamsRouter } from "./routes/teams_routes";

const app = express();
const serverHttp = http.createServer(app);

app.use(express.json());
app.use(matchRouter);
app.use(teamsRouter);
app.use(classificationRouter);

app.use(apiErrorHandler);

export { app, serverHttp };
