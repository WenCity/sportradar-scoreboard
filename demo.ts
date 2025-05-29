import { printMatchStartTable, printMatchSummary } from "@utils/output";
import { Scoreboard } from "src/scoreboard/Scoreboard";

// Type definition for the logging callback
type Logger = (
  label: string,
  state: ReturnType<Scoreboard["getSummary"]>
) => void;

// Runs a demonstration of all scoreboard operations
export function runDemo(scoreboard = new Scoreboard(), logState?: Logger) {
  // ── Match data: [homeTeam, awayTeam, homeScore, awayScore]
  const matches: [string, string, number, number][] = [
    ["Mexico", "Canada", 0, 5],
    ["Spain", "Brazil", 10, 2],
    ["Germany", "France", 2, 2],
    ["Uruguay", "Italy", 6, 6],
    ["Argentina", "Australia", 3, 1],
  ];

  // ── Log empty scoreboard
  logState?.("Initial empty scoreboard", scoreboard.getSummary());

  // ── 1. Start matches and print initial scoreboard table
  printMatchStartTable(scoreboard, matches);
  logState?.("After starting all matches", scoreboard.getSummary());

  // ── 2. Update match scores using predefined data
  matches.forEach(([home, away, homeScore, awayScore]) => {
    scoreboard.updateScore(home, away, homeScore, awayScore);
  });
  logState?.("After updating all scores", scoreboard.getSummary());

  // ── 3. Finish one match to test removal logic
  scoreboard.finishMatch("Germany", "France");
  logState?.("After finishing Germany vs France", scoreboard.getSummary());

  // ── 4. Print and log final summary, sorted by score and recency
  printMatchSummary(scoreboard.getSummary());
  logState?.("Final sorted summary", scoreboard.getSummary());
}

// ── Entry point execution check
const isDirectExecution = process.argv[1]?.endsWith("demo.ts");
if (isDirectExecution) {
  runDemo();
}
