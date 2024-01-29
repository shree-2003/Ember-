import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
export default class EditEmployeeRoute extends Route {
  @service employeesData;
  @service router;
  async model(params) {
    const employees = await this.employeesData.listEmployees();
    const employeeId = params.employee_id;
    let eId = this.employeesData.getEmployee(employeeId);
    if (eId) {
      return eId;
    } else {
      this.router.transitionTo('non-existence');
    }
  }
}
