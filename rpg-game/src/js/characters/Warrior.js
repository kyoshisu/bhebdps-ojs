import Player from './Player';
import Sword from '../weapons/Sword';
import Knife from '../weapons/Knife';
import Arm from '../weapons/Arm';

export default class Warrior extends Player {
  constructor(position, name) {
    super(position, name);
    this.life = 120;
    this.initialLife = 120;
    this.speed = 2;
    this.attack = 10;
    this.description = 'Воин';
    this.weapon = new Sword();
  }

  getWeaponChain() {
    return [Sword, Knife, Arm];
  }

  takeDamage(damage) {
    if (this.life < this.initialLife * 0.5 && this.getLuck() > 0.8) {
      if (this.magic >= damage) {
        this.magic -= damage;
        console.log(`${this.name} теряет ${damage} маны, мана: ${this.magic}`);
        return;
      }
      const remaining = damage - this.magic;
      this.magic = 0;
      super.takeDamage(remaining);
      return;
    }
    super.takeDamage(damage);
  }
}
