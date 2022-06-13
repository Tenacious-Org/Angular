import { Department } from "./Department";

export class Designation
{
    id : number = 0;
    designationName : string = '';
    departmentId : number = 0;
    roleId:number=0;
    department !: Department;
    isActive : boolean= true;
}
