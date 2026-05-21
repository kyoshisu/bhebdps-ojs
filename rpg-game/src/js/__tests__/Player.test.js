import Player from '../characters/Player';
import Warrior from '../characters/Warrior';
import Archer from '../characters/Archer';
import Mage from '../characters/Mage';
import Dwart from '../characters/Dwart';
import Demourge from '../characters/Demourge';
import Crossbowman from '../characters/Crossbowman';
import Sword from '../weapons/Sword';

describe('Player', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('инициализируется с базовыми характеристиками', () => {
    const player = new Player(10, 'Бэтмен');
    expect(player.life).toBe(100);
    expect(player.magic).toBe(20);
    expect(player.speed).toBe(1);
    expect(player.attack).toBe(10);
    expect(player.agility).toBe(5);
    expect(player.luck).toBe(10);
    expect(player.description).toBe('Игрок');
    expect(player.position).toBe(10);
    expect(player.name).toBe('Бэтмен');
    expect(player.weapon.name).toBe('Рука');
  });

  test('getLuck использует случайное число и удачу', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
    const player = new Player(0, 'Тест');
    expect(player.getLuck()).toBe((50 + 10) / 100);
  });

  test('getDamage возвращает 0 при слишком большой дистанции', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
    const player = new Player(0, 'Тест');
    expect(player.getDamage(2)).toBe(0);
  });

  test('takeDamage не опускает жизнь ниже 0', () => {
    const player = new Player(0, 'Хоббит');
    player.takeDamage(10);
    expect(player.life).toBe(90);
    player.takeDamage(80);
    expect(player.life).toBe(10);
    player.takeDamage(90);
    expect(player.life).toBe(0);
    expect(player.isDead()).toBe(true);
  });

  test('moveLeft и moveRight ограничены скоростью', () => {
    const player = new Warrior(6, 'Воин');
    player.moveLeft(5);
    expect(player.position).toBe(4);
    player.moveRight(2);
    expect(player.position).toBe(6);
    player.moveRight(1);
    expect(player.position).toBe(7);
  });

  test('move вызывает движение в нужную сторону', () => {
    const player = new Player(5, 'Тест');
    player.move(-3);
    expect(player.position).toBe(4);
    player.move(2);
    expect(player.position).toBe(5);
  });

  test('chooseEnemy выбирает живого врага с минимальным здоровьем', () => {
    const player = new Player(0, 'А');
    const weak = new Player(2, 'Слабый');
    const strong = new Player(4, 'Сильный');
    weak.life = 10;
    strong.life = 90;
    const enemy = player.chooseEnemy([player, weak, strong]);
    expect(enemy).toBe(weak);
  });

  test('checkWeapon меняет сломанный меч на нож', () => {
    const player = new Warrior(0, 'Воин');
    player.weapon = new Sword();
    player.weapon.durability = 0;
    player.checkWeapon();
    expect(player.weapon.name).toBe('Нож');
  });
});

describe('Warrior', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('takeDamage может снимать ману при низком здоровье и высокой удаче', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.99);
    const warrior = new Warrior(10, 'Алёша Попович');
    warrior.takeDamage(50);
    expect(warrior.life).toBe(70);
    warrior.takeDamage(20);
    expect(warrior.life).toBe(50);
    warrior.takeDamage(5);
    expect(warrior.life).toBe(50);
    expect(warrior.magic).toBe(15);
  });
});

describe('Archer', () => {
  test('имеет характеристики лучника', () => {
    const archer = new Archer(2, 'Леголас');
    expect(archer.life).toBe(80);
    expect(archer.magic).toBe(35);
    expect(archer.attack).toBe(5);
    expect(archer.agility).toBe(10);
    expect(archer.weapon.name).toBe('Лук');
  });

  test('getDamage использует формулу лучника', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
    const archer = new Archer(0, 'Лучник');
    expect(archer.getDamage(1)).toBeGreaterThan(0);
  });
});

describe('Crossbowman', () => {
  test('имеет характеристики арбалетчика', () => {
    const crossbowman = new Crossbowman(0, 'Робин');
    expect(crossbowman.life).toBe(85);
    expect(crossbowman.agility).toBe(20);
    expect(crossbowman.luck).toBe(15);
    expect(crossbowman.weapon.name).toBe('Длинный лук');
  });
});

describe('Mage', () => {
  test('takeDamage уменьшает урон при высокой мане', () => {
    const mage = new Mage(10, 'Гендальф');
    mage.takeDamage(50);
    expect(mage.life).toBe(45);
    expect(mage.magic).toBe(88);
    mage.takeDamage(20);
    expect(mage.life).toBe(35);
    expect(mage.magic).toBe(76);
  });
});

describe('Dwart', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('каждый шестой удар может быть ослаблен', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.9);
    const dwarf = new Dwart(0, 'Гимли');
    for (let i = 0; i < 5; i += 1) {
      dwarf.takeDamage(10);
    }
    const lifeAfterFive = dwarf.life;
    dwarf.takeDamage(10);
    expect(dwarf.life).toBe(lifeAfterFive - 5);
  });
});

describe('Demourge', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('getDamage усиливается при мане и удаче', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.99);
    const demiurge = new Demourge(0, 'Мерлин');
    const mage = new Mage(2, 'Маг');
    const demiurgeDamage = demiurge.getDamage(1);
    const mageDamage = mage.getDamage(1);
    expect(demiurgeDamage).toBeGreaterThan(mageDamage);
  });
});

describe('Бой', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('tryAttack не достаёт до дальнего врага', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
    const warrior = new Warrior(0, 'Воин');
    const archer = new Archer(2, 'Лучник');
    const lifeBefore = archer.life;
    warrior.tryAttack(archer);
    expect(archer.life).toBe(lifeBefore);
  });

  test('isAttackBlocked и dodged возвращают boolean', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.01);
    const warrior = new Warrior(0, 'Воин');
    expect(typeof warrior.isAttackBlocked()).toBe('boolean');
    expect(typeof warrior.dodged()).toBe('boolean');
  });

  test('takeAttack при блоке повреждает оружие', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.99);
    const warrior = new Warrior(0, 'Воин');
    const durabilityBefore = warrior.weapon.durability;
    warrior.takeAttack(20);
    expect(warrior.weapon.durability).toBeLessThan(durabilityBefore);
  });

  test('moveToEnemy приближает к цели', () => {
    const warrior = new Warrior(0, 'Воин');
    const archer = new Archer(5, 'Лучник');
    warrior.moveToEnemy(archer);
    expect(warrior.position).toBeGreaterThan(0);
  });

  test('turn выполняет ход живого игрока', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
    const warrior = new Warrior(0, 'Воин');
    const archer = new Archer(3, 'Лучник');
    warrior.turn([warrior, archer]);
    expect(warrior.position).not.toBe(0);
  });
});
