import EmberRouter from '@ember/routing/router';
import config from 'super-rentals/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('bookings');
  this.route('my-previous-visits', { path: '/next-visits' });
  this.route('login');
  this.route('appointments');
  this.route('selecteddays');
});
