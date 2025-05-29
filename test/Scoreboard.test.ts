import { Scoreboard } from "../src/scoreboard/Scoreboard";

describe("Live Scoreboard Library", () => {
  let scoreboard: Scoreboard;

  // Setup a fresh scoreboard with fixed system time before each test
  beforeEach(() => {
    scoreboard = new Scoreboard();
    jest.useFakeTimers().setSystemTime(new Date("2025-01-01T00:00:00Z"));
  });

  // Restore real timers after each test
  afterEach(() => {
    jest.useRealTimers();
  });

  // Test: starting a new match initializes with 0-0 score
  it("should start a match with initial score 0 - 0", () => {
    const match = scoreboard.startMatch("Norway", "Denmark");
    expect(match.homeTeam).toBe("Norway");
    expect(match.awayTeam).toBe("Denmark");
    expect(match.homeScore).toBe(0);
    expect(match.awayScore).toBe(0);
  });

  // Test: cannot start the same match twice
  it("should throw an error if starting a duplicate match", () => {
    scoreboard.startMatch("France", "Italy");
    expect(() => scoreboard.startMatch("France", "Italy")).toThrow(
      "Match already exists"
    );
  });

  // Test: score updates correctly for existing match
  it("should update match score correctly", () => {
    scoreboard.startMatch("Sweden", "Finland");
    scoreboard.updateScore("Sweden", "Finland", 2, 3);
    const match = scoreboard.getSummary()[0];
    expect(match.homeScore).toBe(2);
    expect(match.awayScore).toBe(3);
  });

  // Test: updating score for a nonexistent match throws
  it("should throw an error if updating a non-existent match", () => {
    expect(() => scoreboard.updateScore("Germany", "Portugal", 1, 1)).toThrow(
      "Match not found"
    );
  });

  // Test: cannot update score with negative values
  it("should throw error on negative score update", () => {
    scoreboard.startMatch("Poland", "Ukraine");
    expect(() => scoreboard.updateScore("Poland", "Ukraine", -1, 2)).toThrow(
      "Scores must be non-negative"
    );
  });

  // Test: finished match is removed from scoreboard
  it("should finish a match and remove it from the scoreboard", () => {
    scoreboard.startMatch("Iceland", "Greenland");
    scoreboard.finishMatch("Iceland", "Greenland");
    expect(scoreboard.getSummary()).toHaveLength(0);
  });

  // Test: finishing a match that doesn't exist does nothing
  it("should do nothing if finishing a match not on the scoreboard", () => {
    scoreboard.startMatch("Argentina", "Chile");
    scoreboard.finishMatch("Non", "Existent");
    expect(scoreboard.getSummary()).toHaveLength(1);
  });

  // Test: summary is sorted by total score, then by most recent start
  it("should return matches sorted by total score, then most recent", () => {
    scoreboard.startMatch("Mexico", "Canada");
    scoreboard.updateScore("Mexico", "Canada", 0, 5);
    jest.advanceTimersByTime(1000);

    scoreboard.startMatch("Spain", "Brazil");
    scoreboard.updateScore("Spain", "Brazil", 10, 2);
    jest.advanceTimersByTime(1000);

    scoreboard.startMatch("Germany", "France");
    scoreboard.updateScore("Germany", "France", 2, 2);
    jest.advanceTimersByTime(1000);

    scoreboard.startMatch("Uruguay", "Italy");
    scoreboard.updateScore("Uruguay", "Italy", 6, 6);
    jest.advanceTimersByTime(1000);

    scoreboard.startMatch("Argentina", "Australia");
    scoreboard.updateScore("Argentina", "Australia", 3, 1);

    const summary = scoreboard.getSummary().map((m) => m.toString());

    expect(summary).toEqual([
      "Uruguay 6 - Italy 6",
      "Spain 10 - Brazil 2",
      "Mexico 0 - Canada 5",
      "Argentina 3 - Australia 1",
      "Germany 2 - France 2",
    ]);
  });

  // Test: team name case differences are treated as separate matches
  it("should preserve insertion order for identical teams with different casing", () => {
    scoreboard.startMatch("Norway", "Sweden");
    expect(() => scoreboard.startMatch("norway", "sweden")).not.toThrow();
    expect(scoreboard.getSummary().length).toBe(2);
  });

  // Test: empty team names are not allowed
  it("should throw if starting a match with empty team names", () => {
    expect(() => scoreboard.startMatch("", "Sweden")).toThrow(
      "Team names must be non-empty"
    );
    expect(() => scoreboard.startMatch("Norway", "")).toThrow(
      "Team names must be non-empty"
    );
  });
});
