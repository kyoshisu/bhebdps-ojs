import Warrior from './characters/Warrior';
import Archer from './characters/Archer';
import Mage from './characters/Mage';
import Dwart from './characters/Dwart';
import Crossbowman from './characters/Crossbowman';
import Demourge from './characters/Demourge';

function getAlivePlayers(players) {
  return players.filter((player) => !player.isDead());
}

export default function play(players) {
  const roster = players || [
    new Warrior(0, 'Алёша Попович'),
    new Archer(2, 'Леголас'),
    new Mage(4, 'Гендальф'),
    new Dwart(6, 'Гимли'),
    new Crossbowman(8, 'Робин Гуд'),
    new Demourge(10, 'Мерлин'),
  ];

  console.log('Королевская битва начинается!');
  roster.forEach((player) => {
    console.log(`${player.description} ${player.name} на позиции ${player.position}`);
  });

  let round = 1;
  while (getAlivePlayers(roster).length > 1) {
    console.log(`--- Раунд ${round} ---`);
    roster.forEach((player) => {
      if (!player.isDead()) {
        player.turn(roster);
      }
    });
    round += 1;
    if (round > 500) {
      console.log('Битва прервана: слишком долго');
      break;
    }
  }

  const [winner] = getAlivePlayers(roster);
  if (winner) {
    console.log(`Победитель: ${winner.description} ${winner.name}!`);
  }
  return winner;
}
