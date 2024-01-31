import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
export default class EmployeesListAddEmployeeRoute extends Route {
  @service employeesData;
  model() {
    return this.employeesData.listEmployees();
  }
}
