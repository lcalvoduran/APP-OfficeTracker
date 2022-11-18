import Route from '@ember/routing/route';
import { service } from '@ember/service';
export default class SelecteddaysRoute extends Route {
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
