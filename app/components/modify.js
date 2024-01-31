import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
export default class AddComponent extends Component {
  @service employeesData;
  @service router;
  @tracked msg;
  @tracked add=this.args.add;
  @tracked model=this.args.model;
  @tracked employeeDetails={
    eId:'',
    firstname: '',
    lastname: '',
    email: '',
    dob: '',
    age:'',
    qualification: '',
    addr: '',
    mobileNumber:'',
    doj: '',
    designation: '',
    team: '',
    shifttime: '',
    location: '',
    reporting: '',
  };
  @action
  updateData(e){
    const { name, value } = e.target;
    if(this.add){
      console.log(this.add);
    this.employeeDetails = { ...this.employeeDetails, [name]: value };
    console.log(this.employeeDetails);
    if(name==='eId'){
      if(value<=0){
        alert('Enter a valid ID number'); 
        e.target.value='';
        this.employeeDetails.eId='';
      }
      else if(this.employeesData.datas.findBy('eId',value)){
        console.log(this.employeesData.datas.findBy('eId',value))
        console.log(this.employeesData.datas.findBy('eId',value))
        alert('ID is already existing!!Check the available details');
        e.target.value='';
        this.employeeDetails.eId='';
      }
    }
  }
    if(name==='age'){
      if(value<18 || value>80){
        alert('Age must be greater than 17 and less than 80');
        e.target.value='';
        this.employeeDetails.age='';
      }
    }
    if(name==='mobileNumber'){
      if(value.length!=10){
        alert('Mobile number must be 10 digits');
        e.target.value='';
        this.employeeDetails.mobileNumber='';
      }
      else if(this.employeesData.datas.findBy('mobileNumber',value)){
        alert('Mobile Number is already existing!!Check the available details');
        e.target.value='';
        this.employeeDetails.mobileNumber='';
      }
    }
    if(name==='email'){
      if(this.employeesData.datas.findBy('email',value)){
        alert('Email ID is already existing!!Check the available details');
        e.target.value='';
        this.employeeDetails.email='';
      }
    }
  }
  @action
  saveData(){
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
    console.log(this.employeeDetails);
    if(this.model.eId&&this.model.firstname&&this.model.lastname&&this.model.age&&this.model.mobileNumber&&this.model.addr&&this.model.email&&this.model.dob&&this.model.doj&&this.model.qualification&&this.model.designation&&this.model.team&&this.model.shifttime&&this.model.location&&this.model.reporting){
      if(this.employeesData.datas.findBy('email',this.model.email) && (this.model!==this.employeesData.datas.findBy('email',this.model.email))){
        alert('Email ID is already existing!!Check the available details');
        e.target.value='';
        this.employeeDetails.email='';
      }
      else if(this.employeesData.datas.findBy('mobileNumber',this.model.mobileNumber) && (this.model!==this.employeesData.datas.findBy('mobileNumber',this.model.mobileNumber))){
        alert('Mobile Number is already existing!!Check the available details');
        e.target.value='';
        this.employeeDetails.mobileNumber='';
      }
      else{
        this.employeesData.updateEmployee(this.employeeDetails);
        this.router.transitionTo('employees-list');
      }
  }
    else{
      alert('Enter all the details!!');
    }
  }
  @action
  cancelButton(){
    this.router.transitionTo('employees-list');
  }
}
