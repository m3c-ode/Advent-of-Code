fs = require("fs");

fs.readFile("./2023/04/data.txt", (e, data) => {
  let cards = data
    .toString()
    .split(/\n/)
    .map((line) => {
      const cardId = line.match(/(\d+):/)[1];
      return {
        id: cardId,
        winningNums: line
          .substring(line.indexOf(":"), line.indexOf("|"))
          .match(/\s{1,2}(\d+)/g)
          .map((n) => parseInt(n)),
        ownedNums: line
          .substring(line.indexOf("|"), line.length)
          .match(/\s{1,2}(\d+)/g)
          .map((n) => parseInt(n)),
      };
    });
  const points = cards.slice(0, 10).reduce((acc, card, index) => {
    console.log("Card ", index + 1);
    console.log("🚀 ~ file: sol.js:22 ~ points ~ acc:", acc);
    const cardWinningNums = card.winningNums.filter((num) => card.ownedNums.includes(num));
    console.log("🚀 ~ file: sol.js:23 ~ points ~ cardWinningNums:", cardWinningNums.length);
    const cardPoints =
      cardWinningNums.length == 0 || cardWinningNums.length == 1
        ? cardWinningNums.length
        : cardWinningNums.reduce((pdt, _, i) => (i == 0 ? pdt : pdt * 2), 1);
    console.log("🚀 ~ file: sol.js:26 ~ points ~ cardPoints:", cardPoints);
    return acc + cardPoints;
  }, 0);
  // const points = cards[9].winningNums.filter((num) => cards[9].ownedNums.includes(num)).length;
  console.log("Final point", points);
});
