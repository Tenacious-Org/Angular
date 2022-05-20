import { Organisation } from "./Organisation";

export class Department
{
    id : number = 0;
    departmentName : string = '';
    organisationId : number = 0;
    isActive : boolean = true;
    addedBy = 1;
    addedOn = Date.now;
    updatedBy = 1;
    updatedOn = Date.now;
}