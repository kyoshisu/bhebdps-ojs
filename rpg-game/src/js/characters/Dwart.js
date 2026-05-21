import Warrior from './Warrior';
import Axe from '../weapons/Axe';
import Knife from '../weapons/Knife';
import Arm from '../weapons/Arm';

export default class Dwart extends Warrior {
  constructor(position, name) {
    super(position, name);
    this.life = 130;
    this.initialLife = 130;
    this.attack = 15;
    this.luck = 20;
    this.description = 'Гном';
    this.weapon = new Axe();
    this.attackCount = 0;
  }

  getWeaponChain() {
    return [Axe, Knife, Arm];
  }

  takeDamage(damage) {
    this.attackCount += 1;
    let actualDamage = damage;
    if (this.attackCount % 6 === 0 && this.getLuck() > 0.5) {
      actualDamage = damage / 2;
      console.log(`${this.name} смягчает шестой удар`);
    }
    super.takeDamage(actualDamage);
  }
}
