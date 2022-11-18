import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class BookingsRoute extends Route {
  @service router;
  @service login;
  beforeModel(transition) {
    let userLogged = this.login.retrieveSessionStorage();
    if (userLogged) {
      this.router.transitionTo('bookings'); //Passed
    } else {
      this.router.transitionTo('login'); //Abort
    }
  }
}
