import Component from '@glimmer/component';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
export default class selecteddaysComponent extends Component {
  @tracked total;
  @service login;
  constructor() {
    super(...arguments);
  }

  @action clearDates(number, month) {

    let findArray = this.total.findIndex(
      (element) => element.number == number && element.month == month
    );
    this.total = this.total.splice(findArray, 1);
    this.args.updateCleared(findArray, this.total);
    this.login.saveSelecteds(this.args.arrayDays);
  }

  get totalSelected() {
    this.total = this.args.arrayDays;
    return this.total;
  }
}
