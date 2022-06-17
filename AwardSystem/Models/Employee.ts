export class Employee
{
    [x: string]: any;
    id : number = 0;
    aceid : string ='';
    firstName : string = '';
    lastName : string = '';
    fullName : string = '';
    email : string = '';
    dob :Date =new Date("0001-01-01");
    gender:string='';
    image : string = '';
    imageName : string = '';
    imageString:string='';
    organisationName = '';
    departmentName = '';
    designationName = '';
    organisationId : number = 0;
    departmentId : number = 0;
    designationId : number = 0;
    reportingPersonId : number = 0;
    hrID : number = 0;
    password : string = '';
    isActive : boolean= true;
}
