import Component from '@glimmer/component';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { later } from '@ember/runloop';

export default class loginComponent extends Component {
  @service router;
  @service login;
  @tracked userEmail = this.value;
  @tracked validationUser = true;

  @action submitLogin() {
    let pattern = /^[a-zA-Z0-9._-]+@(copyright.com)$/;
    let validationPattern = pattern.test(this.userEmail);
    if (validationPattern) {
      let users = JSON.parse(localStorage.getItem('currentUser'));
      if (users == null) {
        if (this.login.saveUser(this.userEmail)) {
          this.validationUser = false;
          later(() => {
            return this.router.transitionTo('index');
          }, 2000);
        } else {
          return this.router.transitionTo('login');
        }
      } else {
        this.validationUser = false;
        let filtrado = users.filter(
          (element) => element.email == this.userEmail
        );
        if (filtrado.length == 0) {
          console.log("User don't found in DDBB");
          this.login.saveUser(this.userEmail);
          later(() => {
            return this.router.transitionTo('index');
          }, 2000);
        } else {
          filtrado[0].estado = true;
          localStorage.setItem('currentUser', JSON.stringify(users));
          later(() => {
            return this.router.transitionTo('index');
          }, 2000);
        }
      }
    } else {
      window.alert('El email no cumple las condiciones necesarias');
    }
  }
}
