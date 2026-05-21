import Mage from './Mage';
import StormStaff from '../weapons/StormStaff';
import Knife from '../weapons/Knife';
import Arm from '../weapons/Arm';

export default class Demourge extends Mage {
  constructor(position, name) {
    super(position, name);
    this.life = 80;
    this.initialLife = 80;
    this.magic = 120;
    this.initialMagic = 120;
    this.attack = 6;
    this.luck = 12;
    this.description = 'Демиург';
    this.weapon = new StormStaff();
  }

  getWeaponChain() {
    return [StormStaff, Knife, Arm];
  }

  getDamage(distance) {
    let damage = super.getDamage(distance);
    if (damage === 0) {
      return 0;
    }
    if (this.magic > 0 && this.getLuck() > 0.6) {
      damage *= 1.5;
      console.log(`${this.name} усиливает удар магией`);
    }
    return damage;
  }
}
