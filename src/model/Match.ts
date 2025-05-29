// Match model: represents a single football match
export class Match {
  // Basic match metadata
  readonly homeTeam: string;
  readonly awayTeam: string;
  readonly startedAt: Date;

  // Internal score state
  #homeScore = 0;
  #awayScore = 0;

  // Initializes a match and validates team names
  constructor(home: string, away: string) {
    if (!home || !away) throw new Error("Team names must be non-empty");
    this.homeTeam = home;
    this.awayTeam = away;
    this.startedAt = new Date();
  }

  // Updates the match score with validation
  setScore(home: number, away: number): void {
    if (home < 0 || away < 0) {
      throw new Error("Scores must be non-negative.");
    }
    this.#homeScore = home;
    this.#awayScore = away;
  }

  // Accessors for scores
  get homeScore(): number {
    return this.#homeScore;
  }

  get awayScore(): number {
    return this.#awayScore;
  }

  // Calculates total score (used in sorting)
  get totalScore(): number {
    return this.#homeScore + this.#awayScore;
  }

  // Returns a readable match result string
  toString(): string {
    return `${this.homeTeam} ${this.homeScore} - ${this.awayTeam} ${this.awayScore}`;
  }
}
