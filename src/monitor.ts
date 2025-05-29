import http from "http";
import { Scoreboard } from "./scoreboard/Scoreboard";
import { runDemo } from "../demo";
import { Match } from "./model/Match";

// Stores the log of actions and resulting match states
const operationLog: { action: string; state: object[] }[] = [];

// Scoreboard instance used for running the demo and being monitored
const demoScoreboard = new Scoreboard();

// Logs current scoreboard state after each operation
function logState(action: string, matches: Match[]) {
  operationLog.push({
    action,
    state: matches.map((m) => ({
      homeTeam: m.homeTeam,
      awayTeam: m.awayTeam,
      homeScore: m.homeScore,
      awayScore: m.awayScore,
      totalScore: m.totalScore,
      startedAt: m.startedAt,
    })),
  });
}

// Run demo operations against the monitored scoreboard instance
runDemo(demoScoreboard, logState);

// Serve the recorded state over HTTP
const server = http.createServer((_, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(operationLog, null, 2));
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`-- Live scoreboard monitor running at http://localhost:${PORT}`);
});
