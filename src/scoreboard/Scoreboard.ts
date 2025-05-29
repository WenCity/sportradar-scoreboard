import { Match } from "../model/Match";

// Manages live football matches and their state
export class Scoreboard {
  #matches: Match[] = []; // List of active matches (private)

  // Starts a new match; throws if it already exists
  startMatch(home: string, away: string): Match {
    if (this.#find(home, away)) {
      throw new Error("Match already exists");
    }
    const match = new Match(home, away);
    this.#matches.push(match);
    return match;
  }

  // Updates the score of an existing match
  updateScore(
    home: string,
    away: string,
    homeScore: number,
    awayScore: number
  ): void {
    const match = this.#find(home, away);
    if (!match) {
      throw new Error("Match not found");
    }
    match.setScore(homeScore, awayScore);
  }

  // Removes a match from the scoreboard
  finishMatch(home: string, away: string): void {
    this.#matches = this.#matches.filter(
      (m) => !(m.homeTeam === home && m.awayTeam === away)
    );
  }

  // Returns matches sorted by total score, then most recent start
  getSummary(): Match[] {
    return [...this.#matches].sort((a, b) => {
      const scoreDiff = b.totalScore - a.totalScore;
      return scoreDiff !== 0
        ? scoreDiff
        : b.startedAt.getTime() - a.startedAt.getTime();
    });
  }

  // Finds a match by home and away team names
  #find(home: string, away: string): Match | undefined {
    return this.#matches.find(
      (m) => m.homeTeam === home && m.awayTeam === away
    );
  }
}
