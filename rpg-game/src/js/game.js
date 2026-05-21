import Archer from './characters/Archer';
import Warrior from './characters/Warrior';
import Mage from './characters/Mage';
import Dwart from './characters/Dwart';
import Crossbowman from './characters/Crossbowman';
import Demourge from './characters/Demourge';

export default function play() {
  const characters = [
    { name: 'мечник', health: 10 },
    { name: 'маг', health: 100 },
    { name: 'маг', health: 0 },
    { name: 'лучник', health: 0 },
  ];

  const alive = characters.filter((item) => item.health > 0);
  console.log('Живые персонажи:', alive);
  console.log('Классы игры:', {
    Archer,
    Warrior,
    Mage,
    Dwart,
    Crossbowman,
    Demourge,
  });
}
