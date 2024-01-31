import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
export default class EmployeesListController extends Controller {
  @service employeesData;
  @service router;
  @action
  addEmployee() {
    this.router.transitionTo('add-employee');
  }
  @action
  editEmployee(item) {
    this.employeesData.editEmployee = item;
    console.log(this.employeesData.editEmployee);
    this.router.transitionTo('edit-employee', item.eId);
  }
  @action
  deleteButton(item) {
    this.employeesData.deleteEmp = item;
    this.employeesData.deleteEmployee(this.employeesData.deleteEmp);
  }
}
