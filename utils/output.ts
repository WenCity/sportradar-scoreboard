import chalk from "chalk";
import { Scoreboard } from "src/scoreboard/Scoreboard";

const teamWidth = 12;
const labelWidth = 3;

export function printTitle(title: string) {
  console.log(chalk.bold.underline(`\n${title}\n`));
}

export function printColumnHeaders() {
  const label = " ".repeat(labelWidth);
  const home = "Home".padEnd(teamWidth);
  const away = "Away".padEnd(teamWidth);
  const score = "Score:".padEnd(10);
  console.log(
    `${label}${chalk.bold(home)}vs ${chalk.bold(away)}${chalk.bold(score)}`
  );
}

export function formatLine(
  label: string | number,
  home: string,
  away: string,
  homeScore: number,
  awayScore: number
): string {
  const labelText = String(label).padEnd(labelWidth);
  const homeText = chalk.green(home.padEnd(teamWidth));
  const awayText = chalk.yellow(away.padEnd(teamWidth));
  const scoreText = chalk.cyan(
    `${String(homeScore).padStart(2)} - ${String(awayScore).padEnd(2)}`
  );
  return `${labelText}${homeText}vs ${awayText}score: ${scoreText}`;
}

export function printMatchStartTable(
  scoreboard: Scoreboard,
  matches: [string, string, number, number][]
) {
  printTitle("Matches Started");
  printColumnHeaders();
  matches.forEach(([home, away], i: number) => {
    scoreboard.startMatch(home, away);
    console.log(formatLine(String.fromCharCode(97 + i), home, away, 0, 0));
  });
}

export function printMatchSummary(
  sorted: ReturnType<Scoreboard["getSummary"]>
) {
  printTitle("Match Summary");
  printColumnHeaders();
  sorted.forEach((match, i) => {
    console.log(
      formatLine(
        i + 1,
        match.homeTeam,
        match.awayTeam,
        match.homeScore,
        match.awayScore
      )
    );
  });
}
