import Building from './5-building';

export default class SkyHighBuilding extends Building {
  constructor(sqft, floors) {
    super(sqft);
    if (floors < 1 || typeof floors !== 'number') {
      throw new Error('Floors must be greater than or equal to 1');
    }
    this._floors = floors;
  }

  get floors() {
    return this._floors;
  }

  set floors(newFloors) {
    if (newFloors < 1 || typeof newFloors !== 'number') {
      throw new Error('Floors must be greater than or equal to 1');
    }
    this._floors = newFloors;
  }

  evacuationWarningMessage() {
    return `Evacuate slowly the ${this.floors} floors`;
  }
}
