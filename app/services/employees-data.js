import Service from '@ember/service';
import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
export default class EmployeesDataService extends Service {
  @tracked editEmployee = '';
  @tracked deleteEmp = '';
  @tracked datas = A([]);
  @tracked existing=false;
  updateEmployee(value){
    const isExisting=this.datas.findBy('eId',value.eId);
    if(isExisting){
      console.log(value);
      Object.assign(isExisting,value);
    }
    this.updateToLocalStorage();
  }
  saveEmployee(value) {
    let id=this.datas.findBy('eId',value.eId);
    let email=this.datas.findBy('email',value.email);
    let number=this.datas.findBy('mobileNumber',value.mobileNumber);
    if(id||email||number){
      this.existing=true;
    }
    if(!id&&!number&&!email){
    this.existing=false;
    console.log(this.datas);
    this.datas.pushObject(value);
    this.updateToLocalStorage();
    }
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
