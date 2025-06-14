# Sportradar Scoreboard Demo

Welcome.

## Getting Started

```bash
git clone https://github.com/WenCity/sportradar-scoreboard.git
```

```bash
npm install
npm start
```

## Test

```bash
npm test
```

This runs the demo and opens `http://localhost:8080` to show what happens after each operation (start match, update score, finish match). It shows actual in-memory state after each step.

## If you only want the console output

```bash
npm run demo
```

This just runs the demo and prints a final scoreboard summary to the terminal. No memory tracking.

## Demo Configuration

To tweak the behavior of the live scoreboard demo, edit the match list in [`src/demo.ts`](./src/demo.ts):

```ts
const matches: [string, string, number, number][] = [
  ["Mexico", "Canada", 0, 5],
  ["Spain", "Brazil", 10, 2],
  ["Germany", "France", 2, 2],
  ["Uruguay", "Italy", 6, 6],
  ["Argentina", "Australia", 3, 1],
];
```

## Code Flow

- `Scoreboard.ts` – main logic: start, update, finish, get summary
- `Match.ts` – defines a football match
- `demo.ts` – runs a fixed sequence of operations
- `monitor.ts` – runs the same but tracks memory after each step
- `output.ts` – handles formatting only
- `test/Scoreboard.test.ts` – covers all edge cases

## Why this setup

I wanted one clear path to run the logic (`demo.ts`) and one way to inspect the memory changes (`monitor.ts`). Clean output, real state. No unnecessary layers.
