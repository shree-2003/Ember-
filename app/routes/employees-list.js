import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
export default class EmployeesListRoute extends Route {
  @service employeesData;
  model() {
    return this.employeesData.listEmployees();
  }
  setupController(model, controller) {
    super.setupController(model, controller);
  }
}
