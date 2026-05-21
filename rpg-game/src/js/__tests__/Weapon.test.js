import Weapon from '../weapons/Weapon';
import Arm from '../weapons/Arm';
import Bow from '../weapons/Bow';
import Sword from '../weapons/Sword';
import Knife from '../weapons/Knife';
import Staff from '../weapons/Staff';
import LongBow from '../weapons/LongBow';
import Axe from '../weapons/Axe';
import StormStaff from '../weapons/StormStaff';

describe('Weapon', () => {
  test('создаёт оружие с заданными свойствами', () => {
    const weapon = new Weapon('Старый меч', 20, 10, 1);
    expect(weapon).toEqual({
      name: 'Старый меч',
      attack: 20,
      durability: 10,
      initDurability: 10,
      range: 1,
    });
  });

  test('takeDamage уменьшает прочность, но не ниже 0', () => {
    const weapon = new Weapon('Старый меч', 20, 10, 1);
    weapon.takeDamage(5);
    expect(weapon.durability).toBe(5);
    weapon.takeDamage(50);
    expect(weapon.durability).toBe(0);
  });

  test('getDamage возвращает полный урон при прочности >= 30%', () => {
    const weapon = new Weapon('Старый меч', 20, 10, 1);
    expect(weapon.getDamage()).toBe(20);
  });

  test('getDamage возвращает половину урона при прочности < 30%', () => {
    const weapon = new Weapon('Старый меч', 20, 10, 1);
    weapon.takeDamage(8);
    expect(weapon.getDamage()).toBe(10);
  });

  test('getDamage возвращает 0 при нулевой прочности', () => {
    const weapon = new Weapon('Старый меч', 20, 10, 1);
    weapon.takeDamage(10);
    expect(weapon.getDamage()).toBe(0);
  });

  test('isBroken возвращает true при нулевой прочности', () => {
    const weapon = new Weapon('Старый меч', 20, 10, 1);
    expect(weapon.isBroken()).toBe(false);
    weapon.takeDamage(10);
    expect(weapon.isBroken()).toBe(true);
  });
});

describe('Arm', () => {
  test('имеет бесконечную прочность и не ломается', () => {
    const arm = new Arm();
    expect(arm).toMatchObject({
      name: 'Рука',
      attack: 1,
      durability: Infinity,
      initDurability: Infinity,
      range: 1,
    });
    arm.takeDamage(20);
    expect(arm.durability).toBe(Infinity);
    expect(arm.getDamage()).toBe(1);
    expect(arm.isBroken()).toBe(false);
  });
});

describe('Bow', () => {
  test('takeDamage и getDamage работают по правилам', () => {
    const bow = new Bow();
    expect(bow.getDamage()).toBe(10);
    expect(bow.durability).toBe(200);
    bow.takeDamage(100);
    expect(bow.getDamage()).toBe(10);
    expect(bow.durability).toBe(100);
    bow.takeDamage(50);
    expect(bow.getDamage()).toBe(5);
    expect(bow.durability).toBe(50);
    bow.takeDamage(150);
    expect(bow.getDamage()).toBe(0);
    expect(bow.durability).toBe(0);
    expect(bow.isBroken()).toBe(true);
  });
});

describe('Sword', () => {
  test('имеет параметры меча', () => {
    const sword = new Sword();
    expect(sword).toMatchObject({
      name: 'Меч',
      attack: 25,
      durability: 500,
      initDurability: 500,
      range: 1,
    });
    sword.takeDamage(20);
    expect(sword.durability).toBe(480);
    sword.takeDamage(100);
    expect(sword.durability).toBe(380);
  });
});

describe('Knife', () => {
  test('имеет параметры ножа', () => {
    const knife = new Knife();
    expect(knife).toMatchObject({
      name: 'Нож',
      attack: 5,
      durability: 300,
      initDurability: 300,
      range: 1,
    });
  });
});

describe('Staff', () => {
  test('имеет параметры посоха', () => {
    const staff = new Staff();
    expect(staff).toMatchObject({
      name: 'Посох',
      attack: 8,
      durability: 300,
      initDurability: 300,
      range: 2,
    });
  });
});

describe('LongBow', () => {
  test('наследует лук с улучшенными характеристиками', () => {
    const longBow = new LongBow();
    expect(longBow).toMatchObject({
      name: 'Длинный лук',
      attack: 15,
      durability: 200,
      initDurability: 200,
      range: 4,
    });
    expect(longBow instanceof Bow).toBe(true);
  });
});

describe('Axe', () => {
  test('наследует меч с параметрами секиры', () => {
    const axe = new Axe();
    expect(axe).toMatchObject({
      name: 'Секира',
      attack: 27,
      durability: 800,
      initDurability: 800,
      range: 1,
    });
    expect(axe instanceof Sword).toBe(true);
  });
});

describe('StormStaff', () => {
  test('наследует посох с параметрами посоха бури', () => {
    const stormStaff = new StormStaff();
    expect(stormStaff).toMatchObject({
      name: 'Посох Бури',
      attack: 10,
      durability: 300,
      initDurability: 300,
      range: 3,
    });
    expect(stormStaff instanceof Staff).toBe(true);
  });
});
