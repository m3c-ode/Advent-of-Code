fs = require("fs");

const RED_CUBES_TARGET = 12;
const GREEN_CUBES_TARGET = 13;
const BLUE_CUBES_TARGET = 14;

fs.readFile("./2023/02/data.txt", (e, data) => {
  const possibleGames = data
    .toString()
    .split(/\n/)
    .reduce((possibleGames, line) => {
      const roundMatches = line
        .substring(line.indexOf(":") + 1, line.length)
        .split(";")
        .map((r) => r.match(/\s(\d+\s[a-z]+)/g))
        .map((arr) => arr.map((s) => s.trimStart().split(/\s/)));
      const game = {
        id: parseInt(line.match(/^Game\s(\d+):\s/)[1]),
        rounds: roundMatches.map((r, i) =>
          r.map((sr) => {
            return {
              cubes: parseInt(sr[0]),
              color: sr[1],
            };
          })
        ),
      };
      let isPossibleGame = true;
      game.rounds.forEach((r) => {
        if (
          r.some((sr) => {
            if (sr.color == "red") return sr.cubes > RED_CUBES_TARGET;
            else if (sr.color == "green") return sr.cubes > GREEN_CUBES_TARGET;
            else return sr.cubes > BLUE_CUBES_TARGET;
          })
        ) {
          isPossibleGame = false;
        }
      });
      if (isPossibleGame) possibleGames.push(game);
      return possibleGames;
    }, []);
  console.log(possibleGames.reduce((sum, game) => sum + game.id, 0));
});
