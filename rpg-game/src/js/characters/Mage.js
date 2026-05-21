import Player from './Player';
import Staff from '../weapons/Staff';
import Knife from '../weapons/Knife';
import Arm from '../weapons/Arm';

export default class Mage extends Player {
  constructor(position, name) {
    super(position, name);
    this.life = 70;
    this.initialLife = 70;
    this.magic = 100;
    this.initialMagic = 100;
    this.attack = 5;
    this.agility = 8;
    this.description = 'Маг';
    this.weapon = new Staff();
  }

  getWeaponChain() {
    return [Staff, Knife, Arm];
  }

  takeDamage(damage) {
    if (this.magic > this.initialMagic * 0.5) {
      const actualDamage = damage / 2;
      this.magic = Math.max(0, this.magic - 12);
      console.log(`${this.name} теряет 12 маны, мана: ${this.magic}`);
      super.takeDamage(actualDamage);
      return;
    }
    super.takeDamage(damage);
  }
}
