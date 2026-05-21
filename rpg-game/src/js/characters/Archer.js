import Player from './Player';
import Bow from '../weapons/Bow';

export default class Archer extends Player {
  constructor() {
    super();
    this.player = Player;
    this.bow = Bow;
  }
}
