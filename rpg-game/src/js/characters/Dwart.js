import Warrior from './Warrior';
import Axe from '../weapons/Axe';

export default class Dwart extends Warrior {
  constructor() {
    super();
    this.warrior = Warrior;
    this.axe = Axe;
  }
}
