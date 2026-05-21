import Player from './Player';
import Bow from '../weapons/Bow';
import Knife from '../weapons/Knife';
import Arm from '../weapons/Arm';

export default class Archer extends Player {
  constructor(position, name) {
    super(position, name);
    this.life = 80;
    this.initialLife = 80;
    this.magic = 35;
    this.initialMagic = 35;
    this.attack = 5;
    this.agility = 10;
    this.description = 'Лучник';
    this.weapon = new Bow();
  }

  getWeaponChain() {
    return [Bow, Knife, Arm];
  }

  getDamage(distance) {
    if (distance > this.weapon.range) {
      return 0;
    }
    const weaponDamage = this.weapon.getDamage();
    const attackDistance = distance || 1;
    return (
      (this.attack + weaponDamage) * this.getLuck() * attackDistance
    ) / this.weapon.range;
  }
}
