import Arm from '../weapons/Arm';
import Knife from '../weapons/Knife';

export default class Player {
  constructor(position, name) {
    this.life = 100;
    this.magic = 20;
    this.speed = 1;
    this.attack = 10;
    this.agility = 5;
    this.luck = 10;
    this.description = 'Игрок';
    this.weapon = new Arm();
    this.position = position;
    this.name = name;
    this.initialLife = 100;
    this.initialMagic = 20;
    this.attackCount = 0;
  }

  getLuck() {
    const randomNumber = Math.random() * 100;
    return (randomNumber + this.luck) / 100;
  }

  getDamage(distance) {
    if (distance > this.weapon.range) {
      return 0;
    }
    const weaponDamage = this.weapon.getDamage();
    const attackDistance = distance || 1;
    return ((this.attack + weaponDamage) * this.getLuck()) / attackDistance;
  }

  takeDamage(damage) {
    if (this.isDead()) {
      return;
    }
    this.life = Math.max(0, this.life - damage);
    const roundedDamage = Math.round(damage * 100) / 100;
    console.log(`${this.name} получает урон ${roundedDamage}, здоровье: ${Math.round(this.life * 100) / 100}`);
  }

  isDead() {
    return this.life === 0;
  }

  moveLeft(distance) {
    const step = Math.min(distance, this.speed);
    this.position -= step;
    console.log(`${this.name} идёт влево на ${step}, позиция: ${this.position}`);
  }

  moveRight(distance) {
    const step = Math.min(distance, this.speed);
    this.position += step;
    console.log(`${this.name} идёт вправо на ${step}, позиция: ${this.position}`);
  }

  move(distance) {
    if (distance < 0) {
      this.moveLeft(Math.abs(distance));
    } else {
      this.moveRight(distance);
    }
  }

  isAttackBlocked() {
    return this.getLuck() > (100 - this.luck) / 100;
  }

  dodged() {
    return this.getLuck() > (100 - this.agility - this.speed * 3) / 100;
  }

  takeAttack(damage) {
    if (this.isDead()) {
      return;
    }
    if (this.isAttackBlocked()) {
      console.log(`${this.name} блокирует удар`);
      this.weapon.takeDamage(damage);
      this.checkWeapon();
      return;
    }
    if (this.dodged()) {
      console.log(`${this.name} уклоняется от удара`);
      return;
    }
    this.takeDamage(damage);
  }

  getWeaponChain() {
    return [Knife, Arm];
  }

  checkWeapon() {
    if (!this.weapon.isBroken()) {
      return;
    }
    const chain = this.getWeaponChain();
    const index = chain.findIndex((WeaponClass) => this.weapon instanceof WeaponClass);
    if (index >= 0 && index < chain.length - 1) {
      const NextWeapon = chain[index + 1];
      this.weapon = new NextWeapon();
      console.log(`${this.name} берёт ${this.weapon.name}`);
    }
  }

  tryAttack(enemy) {
    if (enemy.isDead()) {
      return;
    }
    const distance = Math.abs(this.position - enemy.position);
    if (distance > this.weapon.range) {
      console.log(`${this.name} не достаёт до ${enemy.name}`);
      return;
    }
    const wear = 10 * this.getLuck();
    this.weapon.takeDamage(wear);
    this.checkWeapon();

    const attackDistance = distance || 1;
    const damage = this.getDamage(attackDistance);
    if (damage === 0) {
      return;
    }

    const roundedDamage = Math.round(damage * 100) / 100;
    console.log(`${this.name} атакует ${enemy.name} с уроном ${roundedDamage}`);
    enemy.takeAttack(damage);
    this.checkWeapon();

    if (!enemy.isDead() && this.position === enemy.position) {
      enemy.moveRight(1);
      console.log(`${enemy.name} получает двойной урон`);
      enemy.takeAttack(damage * 2);
    }
  }

  chooseEnemy(players) {
    const enemies = players.filter((player) => player !== this && !player.isDead());
    if (enemies.length === 0) {
      return null;
    }
    return enemies.reduce((weakest, player) => (
      player.life < weakest.life ? player : weakest
    ));
  }

  moveToEnemy(enemy) {
    const distance = enemy.position - this.position;
    if (distance > 0) {
      this.moveRight(Math.abs(distance));
    } else if (distance < 0) {
      this.moveLeft(Math.abs(distance));
    }
  }

  turn(players) {
    const enemy = this.chooseEnemy(players);
    if (!enemy || enemy.isDead()) {
      return;
    }
    console.log(`${this.name} выбирает цель: ${enemy.name}`);
    this.moveToEnemy(enemy);
    this.tryAttack(enemy);
  }
}
