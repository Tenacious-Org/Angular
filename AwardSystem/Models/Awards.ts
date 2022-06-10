export class Awards
{
    id : number = 0;
    requesterId : number = 0;
    awardeeId : number = 0;
    awardTypeId : number = 0;
    approverId : number = 0;
    reason : string = '';
    rejectReason : string = '';
    hRId : number = 0;
    couponCode : string = '';
    statusId = 0;
    addedBy = 0;
    addedOn = Date.now;
    updatedBy = 0;
    updatedOn = Date.now;
    isActive : boolean= true;
}
