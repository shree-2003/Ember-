import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
export default class AddComponent extends Component {
  @service employeesData;
  @service router;
  @tracked msg;
  @tracked employeeDetails = {
    eId:0,
    firstname: '',
    lastname: '',
    email: '',
    dob: '',
    age:0,
    qualification: '',
    addr: '',
    mobileNumber:0,
    doj: '',
    designation: '',
    team: '',
    shifttime: '',
    location: '',
    reporting: '',
  };
  @action
  updateData(e) {
    const { name, value } = e.target;
    if(name==='eId'){
      if(value<=0){
        alert('Enter a valid ID number'); 
      }
      else if(this.employeesData.datas.findBy('eId',value)){
        alert('ID is already existing!!Check the available details');
      }
    }
    if(name==='age'){
      if(value<18){
        alert('Age must be greater than 17');
      }
    }
    if(name==='mobileNumber'){
      if(value.length<9){
        alert('Mobile number must be 10 digits');
      }
      else if(this.employeesData.datas.findBy('mobileNumber',value)){
        alert('Mobile Number is already existing!!Check the available details')
      }
    }
    if(name==='email'){
      if(this.employeesData.datas.findBy('email',value)){
        alert('Email ID is already existing!!Check the available details');
      }
    }
    this.employeeDetails = { ...this.employeeDetails, [name]: value };
    console.log(this.employeeDetails);
    }
  @action
  saveData() {
    if(!this.employeeDetails.eId||!this.employeeDetails.firstname||!this.employeeDetails.lastname||!this.employeeDetails.email||!this.employeeDetails.dob||!this.employeeDetails.age||!this.employeeDetails.qualification||!this.employeeDetails.addr||!this.employeeDetails.doj||!this.employeeDetails.designation||!this.employeeDetails.team||!this.employeeDetails.shifttime||!this.employeeDetails.location||!this.employeeDetails.reporting){
       this.msg='Enter all the details!!';
    }
    else{
    this.employeesData.saveEmployee(this.employeeDetails);
    if(this.employeesData.existing===false){
    this.router.transitionTo('employees-list');
    }
    this.msg='';
    }
  }
  @action
  editData(){
    this.employeesData.updateEmployee(this.employeeDetails);
    this.router.transitionTo('employees-list');
  }
  @action
  cancelButton() {
    this.router.transitionTo('employees-list');
  }
}
