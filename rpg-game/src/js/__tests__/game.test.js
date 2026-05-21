import play from '../game';
import Warrior from '../characters/Warrior';
import Archer from '../characters/Archer';

describe('play', () => {
  test('определяет победителя среди двух игроков', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
    const warrior = new Warrior(0, 'Воин');
    const archer = new Archer(1, 'Лучник');
    warrior.life = 1;
    archer.life = 1;
    archer.speed = 0;
    warrior.speed = 0;

    const winner = play([warrior, archer]);
    expect(winner).toBeDefined();
    expect(winner.isDead()).toBe(false);
    jest.restoreAllMocks();
  });
});
