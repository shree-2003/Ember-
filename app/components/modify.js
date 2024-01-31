import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
export default class AddComponent extends Component {
  @service employeesData;
  @service router;
  @tracked ID='';
  @tracked existingId='';
  @tracked age='';
  @tracked mobileDigits='';
  @tracked existingMobileNumber='';
  @tracked existingEmail='';
  @tracked details='';
  @tracked add = this.args.add;
  @tracked model = this.args.model;
  @tracked edit = this.args.edit;
  @tracked employeeDetails = {
    eId: '',
    firstname: '',
    lastname: '',
    email: '',
    dob: '',
    age: '',
    qualification: '',
    addr: '',
    mobileNumber: '',
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
    if (this.add) {
      console.log(this.add);
      this.employeeDetails = { ...this.employeeDetails, [name]: value };
      console.log(this.employeeDetails);
      if (name === 'eId') {
        if (value <= 0) {
          this.ID='Enter valid ID number';
          this.existingId='';
          e.target.value = '';
          this.employeeDetails.eId = '';
        } 
        else if (this.employeesData.datas.findBy('eId', value)) {
          this.ID='';
          this.existingId="ID is already existing";
          console.log(this.employeesData.datas.findBy('eId', value));
          console.log(this.employeesData.datas.findBy('eId', value));
          e.target.value = '';
          this.employeeDetails.eId = '';
        }
        else{
          this.ID='';
          this.existingId='';
        }
      }
    }
    if (name === 'age') {
      if (value < 18 || value > 80) {
        this.age='Age must be greater than 17 and less than 80';
        e.target.value = '';
        this.employeeDetails.age = '';
      }
      else{
        this.age='';
      }
    }
    if (name === 'mobileNumber') {
      if (value.length != 10) {
        this.mobileDigits='Mobile number must be 10 digits';
        this.existingMobileNumber='';
        e.target.value = '';
        this.employeeDetails.mobileNumber = '';
      } 
      else if (
        this.employeesData.datas.findBy('mobileNumber', value) &&
        this.model != this.employeesData.datas.findBy('mobileNumber', value)
      ) {
        this.mobileDigits='';
        this.existingMobileNumber='Mobile Number is already existing!!Check the available details'
        e.target.value = '';
        this.employeeDetails.mobileNumber = '';
      }
      else{
        this.mobileDigits='';
        this.existingMobileNumber='';
      }
    }
    if (name === 'email') {
      if (
        this.employeesData.datas.findBy('email', value) &&
        this.model != this.employeesData.datas.findBy('email', value))
      {
        this.existingEmail='Email ID is already existing!!Check the available details';
        e.target.value = '';
        this.employeeDetails.email = '';
      }
      else{
        this.existingEmail='';
      }
    }
  }
  @action
  saveData() {
    console.log(this.employeeDetails);
    if (
      this.model.eId &&
      this.model.firstname &&
      this.model.lastname &&
      this.model.age &&
      this.model.mobileNumber &&
      this.model.addr &&
      this.model.email &&
      this.model.dob &&
      this.model.doj &&
      this.model.qualification &&
      this.model.designation &&
      this.model.team &&
      this.model.shifttime &&
      this.model.location &&
      this.model.reporting
    ) {
      this.details='';
      if (this.add) {
        this.employeesData.saveEmployee(this.employeeDetails);
        if (this.employeesData.existing === false) {
          this.router.transitionTo('employees-list');
        }
      } else if (this.edit) {
        this.employeesData.updateEmployee(this.employeeDetails);
        this.router.transitionTo('employees-list');
      }
    } else {
      this.details='Enter all the details';
    }
  }
  @action
  cancelButton() {
    this.router.transitionTo('employees-list');
  }
}
