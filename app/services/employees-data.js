import Service from '@ember/service';
import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
export default class EmployeesDataService extends Service {
  @tracked editEmployee = '';
  @tracked deleteEmp = '';
  @tracked datas = A([]);
  updateEmployee(value){
    const isExisting=this.datas.findBy('eId',value.eId);
    if(isExisting){
      console.log(value);
      Object.assign(isExisting,value);
    }
    this.updateToLocalStorage();
  }
  saveEmployee(value) {
    console.log(this.datas);
    this.datas.pushObject(value);
    this.updateToLocalStorage();
  }
  listEmployees() {
    this.getFromLocalStorage();
    console.log(this.datas);
    return this.datas;
  }
  deleteEmployee(value) {
    this.datas.removeObject(value);
    this.updateToLocalStorage();
  }
  getEmployee(value) {
    return this.datas.findBy('eId', value);
  }
  updateToLocalStorage() {
    const serializeData = JSON.stringify(this.datas);
    localStorage.setItem('employeesData', serializeData);
  }
  getFromLocalStorage() {
    const deserializeData = localStorage.getItem('employeesData');
    if (deserializeData) 
    this.datas = JSON.parse(deserializeData);
  }
}
