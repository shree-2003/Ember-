import EmberRouter from '@ember/routing/router';
import config from 'employee-details/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('employees-list');
  this.route('add-employee', {path:'/add-employee'});
  this.route('edit-employee', { path: '/edit-employee/:employee_id' });
  this.route('not-found', { path: '/*' });
  this.route('non-existence');
});
