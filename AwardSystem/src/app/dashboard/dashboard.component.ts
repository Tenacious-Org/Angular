import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { Department } from 'Models/Department';
import { Organisation } from 'Models/Organisation';
import { SharedService } from 'src/app/shared.service';
import { BaseChartDirective } from 'ng2-charts';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  //Measure the Count and Store the Show Values
  org:any=[]
  dept:any=[]
  award:any=[]
  orgcnt:any=[]
  deptcnt:any=[]
  awdcnt:any=[]

  //For Reset Button
  res = false;

  // Pie chart Values
  public pieChartOptions: ChartOptions<'pie'> = {
        responsive: false,
  };
  public pieChartLabels = this.award;
  public pieChartDatasets = [ {
    data: []
  } ];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private sharedService: SharedService, private router:Router) { }

  //Storing the Values for thier List Getting from API
  awardData: any;
  organisations: Organisation[] = [];
  departments: Department[] = [];

  //Sending Values
  SelectOrg: any = 0;
  SelectDep: any = 0;
  SelectAward: any = 0;
  fromdate = new Date("0001-04-15")
  todate = new Date("0001-04-29")

  //Endpoints for API
  endpoint = "Organisation";
  endpoint1 = "AwardType";



  ngOnInit(): void {
    if (!AuthenticationService.GetData("Admin") && !AuthenticationService.GetData("Publisher")) {
      this.router.navigateByUrl("")
    }
    this.Pie()
    this.sharedService.GetAll(this.endpoint).subscribe(data => {
      this.organisations = data;
    });
    this.sharedService.GetAll(this.endpoint1).subscribe(data => {
      this.awardData = data;
    });
  }

  //Casade Filter When Organisation is Selected Display 
  onSelectDepCascade(){
    this.sharedService.GetDepartmentByOrganisationId(this.SelectOrg).subscribe(data=>{
      this.departments = data;
    });
   }

  //Get Last One Year Statistics of This System
  Pie():void{
    this.sharedService.GetAllAwardee().subscribe( (res) =>
    {
      let tres = false;
      this.res = tres;
        //converting api values into list
        let d = []
        let d1:string[][] = []
        for(var i of res){
          for(let key in i){
            let value = i[key];
            d.push(value)
          }
          d1.push(d)
          d = []          
        }

        //setting into calculate a total count in dictionary
        var dict:any = {}
        for(var a of d1){
          for(var b of a){
            var new_item = b
            dict[new_item] = dict.hasOwnProperty(new_item)? ++dict[new_item] : 1;
          }
        }

        //Setting Organisation into a list
        var org:any = []
        const search = (targetElement : string) => (arrElement : string) => arrElement == targetElement;
        for(var x of d1){
            if(org.some(search(x[0]))){
              continue
            }
            else{
              org.push(x[0])
            }
        }
        this.org = org

        //Setting Awards into a list
        var award:any = []
        for(var x of d1){
            if(award.some(search(x[2]))){
              continue
            }
            else{
              award.push(x[2])
            }
        }
        this.pieChartLabels = award

        //setting award values into a list
        var orgcnt:any = []
        for(var j of org){
          for(var h of Object.keys(dict)){
            if(j == h){
              orgcnt.push(dict[h])
            }
          }
        }
        this.orgcnt = orgcnt

        //setting award values into a list
        var awdcnt:any = []
        for(var j of award){
          for(var k of Object.keys(dict)){
            if(j == k){
              awdcnt.push(dict[k])
            }
          }
        }

        // Dictionary Creation and uploaded it to a list
        var temp:any = {}
        temp["data"] = awdcnt
        var temp1 = []
        temp1.push(temp)
        this.pieChartDatasets = temp1

    });
  }

  //This method is Used To filter and Display the Records
  Apply(orgid: number, deptid: number, awdid: number, fdate:any, tdate:any){

    //Used to Show and Hide the Reset Button
    let tres = true;
    this.res = tres;

    //When From Date is Empty or Cleared value. so assign a from date value.
    if(fdate == ""){
      fdate = new Date("0001-04-15").toString()
      this.fromdate = new Date("0001-04-15")
    }

    //When To Date is Empty or Cleared value. so assign a To date value.
    if(tdate == ""){
      tdate = new Date("0001-04-29").toString()
      this.todate = new Date("0001-04-29")
    }


    //All Values Empty
    if(orgid == 0 && deptid == 0 && awdid == 0 && fdate == new Date("0001-04-15").toString() && tdate == new Date("0001-04-29").toString()){
      this.Pie()
    }

    //Filtered By Organisation.
    if(orgid != 0 && deptid == 0 && awdid == 0 && fdate == new Date("0001-04-15").toString() && tdate == new Date("0001-04-29").toString()){
      this.onSelectDepCascade()
      this.sharedService.GetAllDetailsByDashboardFilters(this.SelectOrg, this.SelectDep, this.SelectAward, this.fromdate.toISOString().slice(0,10), this.todate.toISOString().slice(0,10)).subscribe(res => {

        let tres = true;
        this.res = tres;

        //converting api values into list
        let d = []
        let d1:string[][] = []
        for(var i of res){
          for(let key in i){
            let value = i[key];
            d.push(value)
          }
          d1.push(d)
          d = []          
        }

        //setting into calculate a total count in dictionary
        var dict:any = {}
        for(var a of d1){
          for(var b of a){
            var new_item = b
            dict[new_item] = dict.hasOwnProperty(new_item)? ++dict[new_item] : 1;
          }
        }

        //Setting Organisation into a list
        var org:any = []
        const search = (targetElement : string) => (arrElement : string) => arrElement == targetElement;
        for(var x of d1){
            if(org.some(search(x[0]))){
              continue
            }
            else{
              org.push(x[0])
            }
        }
        this.org = org

        //Setting Awards into a list
        var award:any = []
        for(var x of d1){
            if(award.some(search(x[2]))){
              continue
            }
            else{
              award.push(x[2])
            }
        }
        this.pieChartLabels = award

        //setting award values into a list
        var orgcnt:any = []
        for(var j of org){
          for(var h of Object.keys(dict)){
            if(j == h){
              orgcnt.push(dict[h])
            }
          }
        }
        this.orgcnt = orgcnt

        //setting award values into a list
        var awdcnt:any = []
        for(var j of award){
          for(var k of Object.keys(dict)){
            if(j == k){
              awdcnt.push(dict[k])
            }
          }
        }

        // Dictionary Creation and uploaded it to a list
        var temp:any = {}
        temp["data"] = awdcnt
        var temp1 = []
        temp1.push(temp)
        this.pieChartDatasets = temp1
      });
    }

    //Filtered By Awards
    if(orgid == 0 && deptid == 0 && awdid != 0 && fdate == new Date("0001-04-15").toString() && tdate == new Date("0001-04-29").toString()){
      this.sharedService.GetAllDetailsByDashboardFilters(this.SelectOrg, this.SelectDep, this.SelectAward, this.fromdate.toISOString().slice(0,10), this.todate.toISOString().slice(0,10)).subscribe(res => {

        let tres = true;
        this.res = tres;
  
        //converting api values into list
        let d = []
        let d1:string[][] = []
        for(var i of res){
          for(let key in i){
            let value = i[key];
            d.push(value)
          }
          d1.push(d)
          d = []          
        }
  
        //setting into calculate a total count in dictionary
        var dict:any = {}
        for(var a of d1){
          for(var b of a){
            var new_item = b
            dict[new_item] = dict.hasOwnProperty(new_item)? ++dict[new_item] : 1;
          }
        }
  
        //Setting Organisation into a list
        var org:any = []
        const search = (targetElement : string) => (arrElement : string) => arrElement == targetElement;
        for(var x of d1){
            if(org.some(search(x[0]))){
              continue
            }
            else{
              org.push(x[0])
            }
        }
        this.org = org
  
        //Setting Awards into a list
        var award:any = []
        for(var x of d1){
            if(award.some(search(x[2]))){
              continue
            }
            else{
              award.push(x[2])
            }
        }
        
  
        //setting award values into a list
        var orgcnt:any = []
        for(var j of org){
          for(var h of Object.keys(dict)){
            if(j == h){
              orgcnt.push(dict[h])
            }
          }
        }
        this.orgcnt = orgcnt
        this.pieChartLabels = org
  
        //setting award values into a list
        var awdcnt:any = []
        for(var j of award){
          for(var k of Object.keys(dict)){
            if(j == k){
              awdcnt.push(dict[k])
            }
          }
        }
  
        // Dictionary Creation and uploaded it to a list
        var temp:any = {}
        temp["data"] = orgcnt
        var temp1 = []
        temp1.push(temp)
        this.pieChartDatasets = temp1
      });
    }

    //Filtered By Organisation and Department wise
    if(orgid != 0 && deptid != 0 && awdid == 0 && fdate == new Date("0001-04-15").toString() && tdate == new Date("0001-04-29").toString()){
      this.sharedService.GetAllDetailsByDashboardFilters(this.SelectOrg, this.SelectDep, this.SelectAward, this.fromdate.toISOString().slice(0,10), this.todate.toISOString().slice(0,10)).subscribe( (res) =>
      {
        
          //converting api values into list
          let d = []
          let d1:string[][] = []
          for(var i of res){
            for(let key in i){
              let value = i[key];
              d.push(value)
            }
            d1.push(d)
            d = []          
          }

          //setting into calculate a total count in dictionary
          var dict:any = {}
          for(var a of d1){
            for(var b of a){
              var new_item = b
              dict[new_item] = dict.hasOwnProperty(new_item)? ++dict[new_item] : 1;
            }
          }

          //Setting Organisation into a list
          var org:any = []
          const search = (targetElement : string) => (arrElement : string) => arrElement == targetElement;
          for(var x of d1){
              if(org.some(search(x[0]))){
                continue
              }
              else{
                org.push(x[0])
              }
          }
          this.org = org

          //Setting Awards into a list
          var award:any = []
          for(var x of d1){
              if(award.some(search(x[2]))){
                continue
              }
              else{
                award.push(x[2])
              }
          }
          this.pieChartLabels = award

          //setting award values into a list
          var orgcnt:any = []
          for(var j of org){
            for(var h of Object.keys(dict)){
              if(j == h){
                orgcnt.push(dict[h])
              }
            }
          }
          this.orgcnt = orgcnt

          //setting award values into a list
          var awdcnt:any = []
          for(var j of award){
            for(var k of Object.keys(dict)){
              if(j == k){
                awdcnt.push(dict[k])
              }
            }
          }

          // Dictionary Creation and uploaded it to a list
          var temp:any = {}
          temp["data"] = awdcnt
          var temp1 = []
          temp1.push(temp)
          this.pieChartDatasets = temp1

      });
    }

    //Filtered By Organisation and Award wise
    if(orgid != 0 && deptid == 0 && awdid != 0 && fdate == new Date("0001-04-15").toString() && tdate == new Date("0001-04-29").toString()){
      this.sharedService.GetAllDetailsByDashboardFilters(this.SelectOrg, this.SelectDep, this.SelectAward, this.fromdate.toISOString().slice(0,10), this.todate.toISOString().slice(0,10)).subscribe(res => {

        //converting api values into list
        let d = []
        let d1:string[][] = []
        for(var i of res){
          for(let key in i){
            let value = i[key];
            d.push(value)
          }
          d1.push(d)
          d = []          
        }
  
        //setting into calculate a total count in dictionary
        var dict:any = {}
        for(var a of d1){
          for(var b of a){
            var new_item = b
            dict[new_item] = dict.hasOwnProperty(new_item)? ++dict[new_item] : 1;
          }
        }
  
        //Setting Organisation into a list
        var org:any = []
        const search = (targetElement : string) => (arrElement : string) => arrElement == targetElement;
        for(var x of d1){
            if(org.some(search(x[0]))){
              continue
            }
            else{
              org.push(x[0])
            }
        }
        this.org = org
  
        //Setting Department into a list
        var dept:any = []
        for(var x of d1){
            if(dept.some(search(x[1]))){
              continue
            }
            else{
              dept.push(x[1])
            }
        }
        this.dept = dept
  
        //Setting Awards into a list
        var award:any = []
        for(var x of d1){
            if(award.some(search(x[2]))){
              continue
            }
            else{
              award.push(x[2])
            }
        }
  
        //setting Organisation count into a list
        var orgcnt:any = []
        for(var j of org){
          for(var h of Object.keys(dict)){
            if(j == h){
              orgcnt.push(dict[h])
            }
          }
        }
        this.orgcnt = orgcnt
  
        //setting department values into a list
        var deptcnt:any = []
        for(var j of dept){
          for(var h of Object.keys(dict)){
            if(j == h){
              deptcnt.push(dict[h])
            }
          }
        }
        this.deptcnt = deptcnt
  
        //setting award values into a list
        var awdcnt:any = []
        for(var j of award){
          for(var k of Object.keys(dict)){
            if(j == k){
              awdcnt.push(dict[k])
            }
          }
        }
  
        // Dictionary Creation and uploaded it to a list
        var temp:any = {}
        temp["data"] = deptcnt
        var temp1 = []
        temp1.push(temp)

      
        this.pieChartDatasets = temp1
        this.pieChartLabels = dept

  
      });
    }

    //Filtered By Organisation and From Date
    if(orgid != 0 && deptid == 0 && awdid == 0 && fdate != new Date("0001-04-15").toString() && tdate == new Date("0001-04-29").toString()){
      this.sharedService.GetAllDetailsByDashboardFilters(this.SelectOrg, this.SelectDep, this.SelectAward, this.fromdate, this.todate.toISOString().slice(0,10)).subscribe( res =>
      {
        //converting api values into list
        let d = []
        let d1:string[][] = []
        for(var i of res){
          for(let key in i){
            let value = i[key];
            d.push(value)
          }
          d1.push(d)
          d = []          
        }
  
        //setting into calculate a total count in dictionary
        var dict:any = {}
        for(var a of d1){
          for(var b of a){
            var new_item = b
            dict[new_item] = dict.hasOwnProperty(new_item)? ++dict[new_item] : 1;
          }
        }
        //Setting Organisation into a list
        var org:any = []
        const search = (targetElement : string) => (arrElement : string) => arrElement == targetElement;
        for(var x of d1){
            if(org.some(search(x[0]))){
              continue
            }
            else{
              org.push(x[0])
            }
        }
        this.org = org
  
        //Setting Department into a list
        var dept:any = []
        for(var x of d1){
            if(dept.some(search(x[1]))){
              continue
            }
            else{
              dept.push(x[1])
            }
        }
        this.dept = dept
  
        //Setting Awards into a list
        var award:any = []
        for(var x of d1){
            if(award.some(search(x[2]))){
              continue
            }
            else{
              award.push(x[2])
            }
        }
  
        //setting Organisation count into a list
        var orgcnt:any = []
        for(var j of org){
          for(var h of Object.keys(dict)){
            if(j == h){
              orgcnt.push(dict[h])
            }
          }
        }
        this.orgcnt = orgcnt
  
        //setting department values into a list
        var deptcnt:any = []
        for(var j of dept){
          for(var h of Object.keys(dict)){
            if(j == h){
              deptcnt.push(dict[h])
            }
          }
        }
        this.deptcnt = deptcnt
  
        //setting award values into a list
        var awdcnt:any = []
        for(var j of award){
          for(var k of Object.keys(dict)){
            if(j == k){
              awdcnt.push(dict[k])
            }
          }
        }
  
        // Dictionary Creation and uploaded it to a list
        var temp:any = {}
        temp["data"] = deptcnt
        var temp1 = []
        temp1.push(temp)

        this.pieChartDatasets = temp1
        this.pieChartLabels = dept

      });
    }

    //Filtered By Organisation and To Date
    if(orgid != 0 && deptid == 0 && awdid == 0 && fdate == new Date("0001-04-15").toString() && tdate != new Date("0001-04-29").toString()){
      
      this.sharedService.GetAllDetailsByDashboardFilters(this.SelectOrg, this.SelectDep, this.SelectAward, this.fromdate.toISOString().slice(0,10), this.todate).subscribe( res => {

        //converting api values into list
        let d = []
        let d1:string[][] = []
        for(var i of res){
          for(let key in i){
            let value = i[key];
            d.push(value)
          }
          d1.push(d)
          d = []          
        }
  
        //setting into calculate a total count in dictionary
        var dict:any = {}
        for(var a of d1){
          for(var b of a){
            var new_item = b
            dict[new_item] = dict.hasOwnProperty(new_item)? ++dict[new_item] : 1;
          }
        }
  
        //Setting Organisation into a list
        var org:any = []
        const search = (targetElement : string) => (arrElement : string) => arrElement == targetElement;
        for(var x of d1){
            if(org.some(search(x[0]))){
              continue
            }
            else{
              org.push(x[0])
            }
        }
        this.org = org
  
        //Setting Department into a list
        var dept:any = []
        for(var x of d1){
            if(dept.some(search(x[1]))){
              continue
            }
            else{
              dept.push(x[1])
            }
        }
        this.dept = dept
  
        //Setting Awards into a list
        var award:any = []
        for(var x of d1){
            if(award.some(search(x[2]))){
              continue
            }
            else{
              award.push(x[2])
            }
        }
  
        //setting Organisation count into a list
        var orgcnt:any = []
        for(var j of org){
          for(var h of Object.keys(dict)){
            if(j == h){
              orgcnt.push(dict[h])
            }
          }
        }
        this.orgcnt = orgcnt
  
        //setting department values into a list
        var deptcnt:any = []
        for(var j of dept){
          for(var h of Object.keys(dict)){
            if(j == h){
              deptcnt.push(dict[h])
            }
          }
        }
        this.deptcnt = deptcnt
  
        //setting award values into a list
        var awdcnt:any = []
        for(var j of award){
          for(var k of Object.keys(dict)){
            if(j == k){
              awdcnt.push(dict[k])
            }
          }
        }
  
        // Dictionary Creation and uploaded it to a list
        var temp:any = {}
        temp["data"] = deptcnt
        var temp1 = []
        temp1.push(temp)

      
        this.pieChartDatasets = temp1
        this.pieChartLabels = dept

      });
    }

    //Filtered By Organisation, From Date and To Date.
    if(orgid != 0 && deptid == 0 && awdid == 0 && fdate != new Date("0001-04-15").toString() && tdate != new Date("0001-04-29").toString()){
      
      this.sharedService.GetAllDetailsByDashboardFilters(this.SelectOrg, this.SelectDep, this.SelectAward, this.fromdate, this.todate).subscribe( res => {

        //converting api values into list
        let d = []
        let d1:string[][] = []
        for(var i of res){
          for(let key in i){
            let value = i[key];
            d.push(value)
          }
          d1.push(d)
          d = []          
        }
  
        //setting into calculate a total count in dictionary
        var dict:any = {}
        for(var a of d1){
          for(var b of a){
            var new_item = b
            dict[new_item] = dict.hasOwnProperty(new_item)? ++dict[new_item] : 1;
          }
        }
  
        //Setting Organisation into a list
        var org:any = []
        const search = (targetElement : string) => (arrElement : string) => arrElement == targetElement;
        for(var x of d1){
            if(org.some(search(x[0]))){
              continue
            }
            else{
              org.push(x[0])
            }
        }
        this.org = org
  
        //Setting Department into a list
        var dept:any = []
        for(var x of d1){
            if(dept.some(search(x[1]))){
              continue
            }
            else{
              dept.push(x[1])
            }
        }
        this.dept = dept
  
        //Setting Awards into a list
        var award:any = []
        for(var x of d1){
            if(award.some(search(x[2]))){
              continue
            }
            else{
              award.push(x[2])
            }
        }
  
        //setting Organisation count into a list
        var orgcnt:any = []
        for(var j of org){
          for(var h of Object.keys(dict)){
            if(j == h){
              orgcnt.push(dict[h])
            }
          }
        }
        this.orgcnt = orgcnt
  
        //setting department values into a list
        var deptcnt:any = []
        for(var j of dept){
          for(var h of Object.keys(dict)){
            if(j == h){
              deptcnt.push(dict[h])
            }
          }
        }
        this.deptcnt = deptcnt
  
        //setting award values into a list
        var awdcnt:any = []
        for(var j of award){
          for(var k of Object.keys(dict)){
            if(j == k){
              awdcnt.push(dict[k])
            }
          }
        }
  
        // Dictionary Creation and uploaded it to a list
        var temp:any = {}
        temp["data"] = deptcnt
        var temp1 = []
        temp1.push(temp)

      
        this.pieChartDatasets = temp1
        this.pieChartLabels = dept

      });
    }

    //Filtered By Organisation, Department and Awards
    if(orgid != 0 && deptid != 0 && awdid != 0 && fdate == new Date("0001-04-15").toString() && tdate == new Date("0001-04-29").toString()){
      
      this.sharedService.GetAllDetailsByDashboardFilters(this.SelectOrg, this.SelectDep, this.SelectAward, this.fromdate.toISOString().slice(0,10), this.todate.toISOString().slice(0,10)).subscribe( res => 
      {

          //converting api values into list
          let d = []
          let d1:string[][] = []
          for(var i of res){
            for(let key in i){
              let value = i[key];
              d.push(value)
            }
            d1.push(d)
            d = []          
          }
    
          //setting into calculate a total count in dictionary
          var dict:any = {}
          for(var a of d1){
            for(var b of a){
              var new_item = b
              dict[new_item] = dict.hasOwnProperty(new_item)? ++dict[new_item] : 1;
            }
          }
    
          //Setting Organisation into a list
          var org:any = []
          const search = (targetElement : string) => (arrElement : string) => arrElement == targetElement;
          for(var x of d1){
              if(org.some(search(x[0]))){
                continue
              }
              else{
                org.push(x[0])
              }
          }
          this.org = org
    
          //Setting Department into a list
          var dept:any = []
          for(var x of d1){
              if(dept.some(search(x[1]))){
                continue
              }
              else{
                dept.push(x[1])
              }
          }
          this.dept = dept
    
          //Setting Awards into a list
          var award:any = []
          for(var x of d1){
              if(award.some(search(x[2]))){
                continue
              }
              else{
                award.push(x[2])
              }
          }
    
          //setting Organisation count into a list
          var orgcnt:any = []
          for(var j of org){
            for(var h of Object.keys(dict)){
              if(j == h){
                orgcnt.push(dict[h])
              }
            }
          }
          this.orgcnt = orgcnt
    
          //setting department values into a list
          var deptcnt:any = []
          for(var j of dept){
            for(var h of Object.keys(dict)){
              if(j == h){
                deptcnt.push(dict[h])
              }
            }
          }
          this.deptcnt = deptcnt
    
          //setting award values into a list
          var awdcnt:any = []
          for(var j of award){
            for(var k of Object.keys(dict)){
              if(j == k){
                awdcnt.push(dict[k])
              }
            }
          }
    
          // Dictionary Creation and uploaded it to a list
          var temp:any = {}
          temp["data"] = deptcnt
          var temp1 = []
          temp1.push(temp)
  
        
          this.pieChartDatasets = temp1
          this.pieChartLabels = dept

      });
    }

    //Filtered By Organisation, Department and From Date
    if(orgid != 0 && deptid != 0 && awdid == 0 && fdate != new Date("0001-04-15").toString() && tdate == new Date("0001-04-29").toString()){
      
      this.sharedService.GetAllDetailsByDashboardFilters(this.SelectOrg, this.SelectDep, this.SelectAward, this.fromdate, this.todate.toISOString().slice(0,10)).subscribe( res =>
      {

        //converting api values into list
        let d = []
        let d1:string[][] = []
        for(var i of res){
          for(let key in i){
            let value = i[key];
            d.push(value)
          }
          d1.push(d)
          d = []          
        }

        //setting into calculate a total count in dictionary
        var dict:any = {}
        for(var a of d1){
          for(var b of a){
            var new_item = b
            dict[new_item] = dict.hasOwnProperty(new_item)? ++dict[new_item] : 1;
          }
        }

        //Setting Organisation into a list
        var org:any = []
        const search = (targetElement : string) => (arrElement : string) => arrElement == targetElement;
        for(var x of d1){
            if(org.some(search(x[0]))){
              continue
            }
            else{
              org.push(x[0])
            }
        }
        this.org = org

        //Setting Awards into a list
        var award:any = []
        for(var x of d1){
            if(award.some(search(x[2]))){
              continue
            }
            else{
              award.push(x[2])
            }
        }
        this.pieChartLabels = award

        //setting award values into a list
        var orgcnt:any = []
        for(var j of org){
          for(var h of Object.keys(dict)){
            if(j == h){
              orgcnt.push(dict[h])
            }
          }
        }
        this.orgcnt = orgcnt

        //setting award values into a list
        var awdcnt:any = []
        for(var j of award){
          for(var k of Object.keys(dict)){
            if(j == k){
              awdcnt.push(dict[k])
            }
          }
        }

        // Dictionary Creation and uploaded it to a list
        var temp:any = {}
        temp["data"] = awdcnt
        var temp1 = []
        temp1.push(temp)
        this.pieChartDatasets = temp1

      });
    }

    //Filtered By Organisation, Award and From Date
    if(orgid != 0 && deptid == 0 && awdid != 0 && fdate != new Date("0001-04-15").toString() && tdate == new Date("0001-04-29").toString()){
      
      this.sharedService.GetAllDetailsByDashboardFilters(this.SelectOrg, this.SelectDep, this.SelectAward, this.fromdate, this.todate.toISOString().slice(0,10)).subscribe( res =>
      {

         //converting api values into list
         let d = []
         let d1:string[][] = []
         for(var i of res){
           for(let key in i){
             let value = i[key];
             d.push(value)
           }
           d1.push(d)
           d = []          
         }
   
         //setting into calculate a total count in dictionary
         var dict:any = {}
         for(var a of d1){
           for(var b of a){
             var new_item = b
             dict[new_item] = dict.hasOwnProperty(new_item)? ++dict[new_item] : 1;
           }
         }
   
         //Setting Organisation into a list
         var org:any = []
         const search = (targetElement : string) => (arrElement : string) => arrElement == targetElement;
         for(var x of d1){
             if(org.some(search(x[0]))){
               continue
             }
             else{
               org.push(x[0])
             }
         }
         this.org = org
   
         //Setting Department into a list
         var dept:any = []
         for(var x of d1){
             if(dept.some(search(x[1]))){
               continue
             }
             else{
               dept.push(x[1])
             }
         }
         this.dept = dept
   
         //Setting Awards into a list
         var award:any = []
         for(var x of d1){
             if(award.some(search(x[2]))){
               continue
             }
             else{
               award.push(x[2])
             }
         }
   
         //setting Organisation count into a list
         var orgcnt:any = []
         for(var j of org){
           for(var h of Object.keys(dict)){
             if(j == h){
               orgcnt.push(dict[h])
             }
           }
         }
         this.orgcnt = orgcnt
   
         //setting department values into a list
         var deptcnt:any = []
         for(var j of dept){
           for(var h of Object.keys(dict)){
             if(j == h){
               deptcnt.push(dict[h])
             }
           }
         }
         this.deptcnt = deptcnt
   
         //setting award values into a list
         var awdcnt:any = []
         for(var j of award){
           for(var k of Object.keys(dict)){
             if(j == k){
               awdcnt.push(dict[k])
             }
           }
         }
   
         // Dictionary Creation and uploaded it to a list
         var temp:any = {}
         temp["data"] = deptcnt
         var temp1 = []
         temp1.push(temp)
 
       
         this.pieChartDatasets = temp1
         this.pieChartLabels = dept
  
      });
    }

    //Filtered By Organisation, Department and To Date
    if(orgid != 0 && deptid != 0 && awdid == 0 && fdate == new Date("0001-04-15").toString() && tdate != new Date("0001-04-29").toString()){
      
      this.sharedService.GetAllDetailsByDashboardFilters(this.SelectOrg, this.SelectDep, this.SelectAward, this.fromdate.toISOString().slice(0,10), this.todate).subscribe( res =>
      {

        //converting api values into list
        let d = []
        let d1:string[][] = []
        for(var i of res){
          for(let key in i){
            let value = i[key];
            d.push(value)
          }
          d1.push(d)
          d = []          
        }

        //setting into calculate a total count in dictionary
        var dict:any = {}
        for(var a of d1){
          for(var b of a){
            var new_item = b
            dict[new_item] = dict.hasOwnProperty(new_item)? ++dict[new_item] : 1;
          }
        }

        //Setting Organisation into a list
        var org:any = []
        const search = (targetElement : string) => (arrElement : string) => arrElement == targetElement;
        for(var x of d1){
            if(org.some(search(x[0]))){
              continue
            }
            else{
              org.push(x[0])
            }
        }
        this.org = org

        //Setting Awards into a list
        var award:any = []
        for(var x of d1){
            if(award.some(search(x[2]))){
              continue
            }
            else{
              award.push(x[2])
            }
        }
        this.pieChartLabels = award

        //setting award values into a list
        var orgcnt:any = []
        for(var j of org){
          for(var h of Object.keys(dict)){
            if(j == h){
              orgcnt.push(dict[h])
            }
          }
        }
        this.orgcnt = orgcnt

        //setting award values into a list
        var awdcnt:any = []
        for(var j of award){
          for(var k of Object.keys(dict)){
            if(j == k){
              awdcnt.push(dict[k])
            }
          }
        }

        // Dictionary Creation and uploaded it to a list
        var temp:any = {}
        temp["data"] = awdcnt
        var temp1 = []
        temp1.push(temp)
        this.pieChartDatasets = temp1

      });
    }

    //Filtered By Organisation, Award and To Date
    if(orgid != 0 && deptid == 0 && awdid != 0 && fdate == new Date("0001-04-15").toString() && tdate != new Date("0001-04-29").toString()){
      
      this.sharedService.GetAllDetailsByDashboardFilters(this.SelectOrg, this.SelectDep, this.SelectAward, this.fromdate.toISOString().slice(0,10), this.todate).subscribe( res =>
        {

            //converting api values into list
            let d = []
            let d1:string[][] = []
            for(var i of res){
              for(let key in i){
                let value = i[key];
                d.push(value)
              }
              d1.push(d)
              d = []          
            }
      
            //setting into calculate a total count in dictionary
            var dict:any = {}
            for(var a of d1){
              for(var b of a){
                var new_item = b
                dict[new_item] = dict.hasOwnProperty(new_item)? ++dict[new_item] : 1;
              }
            }
      
            //Setting Organisation into a list
            var org:any = []
            const search = (targetElement : string) => (arrElement : string) => arrElement == targetElement;
            for(var x of d1){
                if(org.some(search(x[0]))){
                  continue
                }
                else{
                  org.push(x[0])
                }
            }
            this.org = org
      
            //Setting Department into a list
            var dept:any = []
            for(var x of d1){
                if(dept.some(search(x[1]))){
                  continue
                }
                else{
                  dept.push(x[1])
                }
            }
            this.dept = dept
      
            //Setting Awards into a list
            var award:any = []
            for(var x of d1){
                if(award.some(search(x[2]))){
                  continue
                }
                else{
                  award.push(x[2])
                }
            }
      
            //setting Organisation count into a list
            var orgcnt:any = []
            for(var j of org){
              for(var h of Object.keys(dict)){
                if(j == h){
                  orgcnt.push(dict[h])
                }
              }
            }
            this.orgcnt = orgcnt
      
            //setting department values into a list
            var deptcnt:any = []
            for(var j of dept){
              for(var h of Object.keys(dict)){
                if(j == h){
                  deptcnt.push(dict[h])
                }
              }
            }
            this.deptcnt = deptcnt
      
            //setting award values into a list
            var awdcnt:any = []
            for(var j of award){
              for(var k of Object.keys(dict)){
                if(j == k){
                  awdcnt.push(dict[k])
                }
              }
            }
      
            // Dictionary Creation and uploaded it to a list
            var temp:any = {}
            temp["data"] = deptcnt
            var temp1 = []
            temp1.push(temp)

          
            this.pieChartDatasets = temp1
            this.pieChartLabels = dept
  
        });
    }

    //Filter Organisation, Department, Award, From Date
    if(orgid != 0 && deptid != 0 && awdid !=0 && fdate != new Date("0001-04-15").toString() && tdate == new Date("0001-04-29").toString()){
      
      this.sharedService.GetAllDetailsByDashboardFilters(this.SelectOrg, this.SelectDep, this.SelectAward, this.fromdate, this.todate.toISOString().slice(0,10)).subscribe(res => {


        //converting api values into list
      let d = []
      let d1:string[][] = []
      for(var i of res){
        for(let key in i){
          let value = i[key];
          d.push(value)
        }
        d1.push(d)
        d = []          
      }

      //setting into calculate a total count in dictionary
      var dict:any = {}
      for(var a of d1){
        for(var b of a){
          var new_item = b
          dict[new_item] = dict.hasOwnProperty(new_item)? ++dict[new_item] : 1;
        }
      }

      //Setting Organisation into a list
      var org:any = []
      const search = (targetElement : string) => (arrElement : string) => arrElement == targetElement;
      for(var x of d1){
          if(org.some(search(x[0]))){
            continue
          }
          else{
            org.push(x[0])
          }
      }
      this.org = org

      //Setting Department into a list
      var dept:any = []
      for(var x of d1){
          if(dept.some(search(x[1]))){
            continue
          }
          else{
            dept.push(x[1])
          }
      }
      this.dept = dept

      //Setting Awards into a list
      var award:any = []
      for(var x of d1){
          if(award.some(search(x[2]))){
            continue
          }
          else{
            award.push(x[2])
          }
      }
      this.pieChartLabels = dept

      //setting award values into a list
      var orgcnt:any = []
      for(var j of org){
        for(var h of Object.keys(dict)){
          if(j == h){
            orgcnt.push(dict[h])
          }
        }
      }
      this.orgcnt = orgcnt

      //setting award values into a list
      var deptcnt:any = []
      for(var j of org){
        for(var h of Object.keys(dict)){
          if(j == h){
            deptcnt.push(dict[h])
          }
        }
      }
      this.deptcnt = deptcnt

      //setting award values into a list
      var awdcnt:any = []
      for(var j of award){
        for(var k of Object.keys(dict)){
          if(j == k){
            awdcnt.push(dict[k])
          }
        }
      }

      // Dictionary Creation and uploaded it to a list
      var temp:any = {}
      temp["data"] = deptcnt
      var temp1 = []
      temp1.push(temp)
      this.pieChartDatasets = temp1

      })

    }

    //Filter Organisation, Department, Award, To Date
    if(orgid != 0 && deptid != 0 && awdid !=0 && fdate == new Date("0001-04-15").toString() && tdate != new Date("0001-04-29").toString()){
      
      this.sharedService.GetAllDetailsByDashboardFilters(this.SelectOrg, this.SelectDep, this.SelectAward, this.fromdate.toISOString().slice(0,10), this.todate).subscribe(res => {

        //converting api values into list
      let d = []
      let d1:string[][] = []
      for(var i of res){
        for(let key in i){
          let value = i[key];
          d.push(value)
        }
        d1.push(d)
        d = []          
      }

      //setting into calculate a total count in dictionary
      var dict:any = {}
      for(var a of d1){
        for(var b of a){
          var new_item = b
          dict[new_item] = dict.hasOwnProperty(new_item)? ++dict[new_item] : 1;
        }
      }

      //Setting Organisation into a list
      var org:any = []
      const search = (targetElement : string) => (arrElement : string) => arrElement == targetElement;
      for(var x of d1){
          if(org.some(search(x[0]))){
            continue
          }
          else{
            org.push(x[0])
          }
      }
      this.org = org

      //Setting Department into a list
      var dept:any = []
      for(var x of d1){
          if(dept.some(search(x[1]))){
            continue
          }
          else{
            dept.push(x[1])
          }
      }
      this.dept = dept

      //Setting Awards into a list
      var award:any = []
      for(var x of d1){
          if(award.some(search(x[2]))){
            continue
          }
          else{
            award.push(x[2])
          }
      }
      this.pieChartLabels = dept

      //setting award values into a list
      var orgcnt:any = []
      for(var j of org){
        for(var h of Object.keys(dict)){
          if(j == h){
            orgcnt.push(dict[h])
          }
        }
      }
      this.orgcnt = orgcnt

      //setting award values into a list
      var deptcnt:any = []
      for(var j of org){
        for(var h of Object.keys(dict)){
          if(j == h){
            deptcnt.push(dict[h])
          }
        }
      }
      this.deptcnt = deptcnt

      //setting award values into a list
      var awdcnt:any = []
      for(var j of award){
        for(var k of Object.keys(dict)){
          if(j == k){
            awdcnt.push(dict[k])
          }
        }
      }

      // Dictionary Creation and uploaded it to a list
      var temp:any = {}
      temp["data"] = deptcnt
      var temp1 = []
      temp1.push(temp)
      this.pieChartDatasets = temp1

      })

    }

    //Filter By Award, From Date
    if(orgid == 0 && deptid == 0 && awdid != 0 && fdate != new Date("0001-04-15").toString() && tdate == new Date("0001-04-29").toString()){
      
      this.sharedService.GetAllDetailsByDashboardFilters(this.SelectOrg, this.SelectDep, this.SelectAward, this.fromdate, this.todate.toISOString().slice(0,10)).subscribe(res => {


        //converting api values into list
      let d = []
      let d1:string[][] = []
      for(var i of res){
        for(let key in i){
          let value = i[key];
          d.push(value)
        }
        d1.push(d)
        d = []          
      }

      //setting into calculate a total count in dictionary
      var dict:any = {}
      for(var a of d1){
        for(var b of a){
          var new_item = b
          dict[new_item] = dict.hasOwnProperty(new_item)? ++dict[new_item] : 1;
        }
      }

      //Setting Organisation into a list
      var org:any = []
      const search = (targetElement : string) => (arrElement : string) => arrElement == targetElement;
      for(var x of d1){
          if(org.some(search(x[0]))){
            continue
          }
          else{
            org.push(x[0])
          }
      }
      this.org = org

      //Setting Department into a list
      var dept:any = []
      for(var x of d1){
          if(dept.some(search(x[1]))){
            continue
          }
          else{
            dept.push(x[1])
          }
      }
      this.dept = dept

      //Setting Awards into a list
      var award:any = []
      for(var x of d1){
          if(award.some(search(x[2]))){
            continue
          }
          else{
            award.push(x[2])
          }
      }
      this.pieChartLabels = org

      //setting award values into a list
      var orgcnt:any = []
      for(var j of org){
        for(var h of Object.keys(dict)){
          if(j == h){
            orgcnt.push(dict[h])
          }
        }
      }
      this.orgcnt = orgcnt

      //setting award values into a list
      var deptcnt:any = []
      for(var j of org){
        for(var h of Object.keys(dict)){
          if(j == h){
            deptcnt.push(dict[h])
          }
        }
      }
      this.deptcnt = deptcnt

      //setting award values into a list
      var awdcnt:any = []
      for(var j of award){
        for(var k of Object.keys(dict)){
          if(j == k){
            awdcnt.push(dict[k])
          }
        }
      }

      // Dictionary Creation and uploaded it to a list
      var temp:any = {}
      temp["data"] = orgcnt
      var temp1 = []
      temp1.push(temp)
      this.pieChartDatasets = temp1

      })

    }

    //Filter By Award, To Date
    if(orgid == 0 && deptid == 0 && awdid != 0 && fdate == new Date("0001-04-15").toString() && tdate != new Date("0001-04-29").toString()){
      
      this.sharedService.GetAllDetailsByDashboardFilters(this.SelectOrg, this.SelectDep, this.SelectAward, this.fromdate.toISOString().slice(0,10), this.todate).subscribe(res => {

        //converting api values into list
      let d = []
      let d1:string[][] = []
      for(var i of res){
        for(let key in i){
          let value = i[key];
          d.push(value)
        }
        d1.push(d)
        d = []          
      }

      //setting into calculate a total count in dictionary
      var dict:any = {}
      for(var a of d1){
        for(var b of a){
          var new_item = b
          dict[new_item] = dict.hasOwnProperty(new_item)? ++dict[new_item] : 1;
        }
      }

      //Setting Organisation into a list
      var org:any = []
      const search = (targetElement : string) => (arrElement : string) => arrElement == targetElement;
      for(var x of d1){
          if(org.some(search(x[0]))){
            continue
          }
          else{
            org.push(x[0])
          }
      }
      this.org = org

      //Setting Department into a list
      var dept:any = []
      for(var x of d1){
          if(dept.some(search(x[1]))){
            continue
          }
          else{
            dept.push(x[1])
          }
      }
      this.dept = dept

      //Setting Awards into a list
      var award:any = []
      for(var x of d1){
          if(award.some(search(x[2]))){
            continue
          }
          else{
            award.push(x[2])
          }
      }
      this.pieChartLabels = org

      //setting award values into a list
      var orgcnt:any = []
      for(var j of org){
        for(var h of Object.keys(dict)){
          if(j == h){
            orgcnt.push(dict[h])
          }
        }
      }
      this.orgcnt = orgcnt

      //setting award values into a list
      var deptcnt:any = []
      for(var j of org){
        for(var h of Object.keys(dict)){
          if(j == h){
            deptcnt.push(dict[h])
          }
        }
      }
      this.deptcnt = deptcnt

      //setting award values into a list
      var awdcnt:any = []
      for(var j of award){
        for(var k of Object.keys(dict)){
          if(j == k){
            awdcnt.push(dict[k])
          }
        }
      }

      // Dictionary Creation and uploaded it to a list
      var temp:any = {}
      temp["data"] = orgcnt
      var temp1 = []
      temp1.push(temp)
      this.pieChartDatasets = temp1

      })

    }

    //Filter By Award, From Date, To Date
    if(orgid == 0 && deptid == 0 && awdid != 0 && fdate != new Date("0001-04-15").toString() && tdate != new Date("0001-04-29").toString()){
      
      this.sharedService.GetAllDetailsByDashboardFilters(this.SelectOrg, this.SelectDep, this.SelectAward, this.fromdate, this.todate).subscribe(res => {

        //converting api values into list
      let d = []
      let d1:string[][] = []
      for(var i of res){
        for(let key in i){
          let value = i[key];
          d.push(value)
        }
        d1.push(d)
        d = []          
      }

      //setting into calculate a total count in dictionary
      var dict:any = {}
      for(var a of d1){
        for(var b of a){
          var new_item = b
          dict[new_item] = dict.hasOwnProperty(new_item)? ++dict[new_item] : 1;
        }
      }

      //Setting Organisation into a list
      var org:any = []
      const search = (targetElement : string) => (arrElement : string) => arrElement == targetElement;
      for(var x of d1){
          if(org.some(search(x[0]))){
            continue
          }
          else{
            org.push(x[0])
          }
      }
      this.org = org

      //Setting Department into a list
      var dept:any = []
      for(var x of d1){
          if(dept.some(search(x[1]))){
            continue
          }
          else{
            dept.push(x[1])
          }
      }
      this.dept = dept

      //Setting Awards into a list
      var award:any = []
      for(var x of d1){
          if(award.some(search(x[2]))){
            continue
          }
          else{
            award.push(x[2])
          }
      }
      this.pieChartLabels = org

      //setting award values into a list
      var orgcnt:any = []
      for(var j of org){
        for(var h of Object.keys(dict)){
          if(j == h){
            orgcnt.push(dict[h])
          }
        }
      }
      this.orgcnt = orgcnt

      //setting award values into a list
      var deptcnt:any = []
      for(var j of org){
        for(var h of Object.keys(dict)){
          if(j == h){
            deptcnt.push(dict[h])
          }
        }
      }
      this.deptcnt = deptcnt

      //setting award values into a list
      var awdcnt:any = []
      for(var j of award){
        for(var k of Object.keys(dict)){
          if(j == k){
            awdcnt.push(dict[k])
          }
        }
      }

      // Dictionary Creation and uploaded it to a list
      var temp:any = {}
      temp["data"] = orgcnt
      var temp1 = []
      temp1.push(temp)
      this.pieChartDatasets = temp1

      })

    }

    //Filtered By Organisation, Department, From date and To date
    if(orgid != 0 && deptid != 0 && awdid == 0 && fdate != new Date("0001-04-15").toString() && tdate != new Date("0001-04-29").toString()){
      
      this.sharedService.GetAllDetailsByDashboardFilters(this.SelectOrg, this.SelectDep, this.SelectAward, this.fromdate, this.todate).subscribe( res => {
        //converting api values into list
        let d = []
        let d1:string[][] = []
        for(var i of res){
          for(let key in i){
            let value = i[key];
            d.push(value)
          }
          d1.push(d)
          d = []          
        }

        //setting into calculate a total count in dictionary
        var dict:any = {}
        for(var a of d1){
          for(var b of a){
            var new_item = b
            dict[new_item] = dict.hasOwnProperty(new_item)? ++dict[new_item] : 1;
          }
        }

        //Setting Organisation into a list
        var org:any = []
        const search = (targetElement : string) => (arrElement : string) => arrElement == targetElement;
        for(var x of d1){
            if(org.some(search(x[0]))){
              continue
            }
            else{
              org.push(x[0])
            }
        }
        this.org = org

        //Setting Awards into a list
        var award:any = []
        for(var x of d1){
            if(award.some(search(x[2]))){
              continue
            }
            else{
              award.push(x[2])
            }
        }
        this.pieChartLabels = award

        //setting award values into a list
        var orgcnt:any = []
        for(var j of org){
          for(var h of Object.keys(dict)){
            if(j == h){
              orgcnt.push(dict[h])
            }
          }
        }
        this.orgcnt = orgcnt

        //setting award values into a list
        var awdcnt:any = []
        for(var j of award){
          for(var k of Object.keys(dict)){
            if(j == k){
              awdcnt.push(dict[k])
            }
          }
        }

        // Dictionary Creation and uploaded it to a list
        var temp:any = {}
        temp["data"] = awdcnt
        var temp1 = []
        temp1.push(temp)
        this.pieChartDatasets = temp1


      });

    }

    //Filtered By Organisation, Award, From date and To date
    if(orgid != 0 && deptid == 0 && awdid != 0 && fdate != new Date("0001-04-15").toString() && tdate != new Date("0001-04-29").toString()){
      
      this.sharedService.GetAllDetailsByDashboardFilters(this.SelectOrg, this.SelectDep, this.SelectAward, this.fromdate, this.todate).subscribe( res => {

        //converting api values into list
        let d = []
        let d1:string[][] = []
        for(var i of res){
          for(let key in i){
            let value = i[key];
            d.push(value)
          }
          d1.push(d)
          d = []          
        }
  
        //setting into calculate a total count in dictionary
        var dict:any = {}
        for(var a of d1){
          for(var b of a){
            var new_item = b
            dict[new_item] = dict.hasOwnProperty(new_item)? ++dict[new_item] : 1;
          }
        }
  
        //Setting Organisation into a list
        var org:any = []
        const search = (targetElement : string) => (arrElement : string) => arrElement == targetElement;
        for(var x of d1){
            if(org.some(search(x[0]))){
              continue
            }
            else{
              org.push(x[0])
            }
        }
        this.org = org
  
        //Setting Department into a list
        var dept:any = []
        for(var x of d1){
            if(dept.some(search(x[1]))){
              continue
            }
            else{
              dept.push(x[1])
            }
        }
        this.dept = dept
  
        //Setting Awards into a list
        var award:any = []
        for(var x of d1){
            if(award.some(search(x[2]))){
              continue
            }
            else{
              award.push(x[2])
            }
        }
  
        //setting Organisation count into a list
        var orgcnt:any = []
        for(var j of org){
          for(var h of Object.keys(dict)){
            if(j == h){
              orgcnt.push(dict[h])
            }
          }
        }
        this.orgcnt = orgcnt
  
        //setting department values into a list
        var deptcnt:any = []
        for(var j of dept){
          for(var h of Object.keys(dict)){
            if(j == h){
              deptcnt.push(dict[h])
            }
          }
        }
        this.deptcnt = deptcnt
  
        //setting award values into a list
        var awdcnt:any = []
        for(var j of award){
          for(var k of Object.keys(dict)){
            if(j == k){
              awdcnt.push(dict[k])
            }
          }
        }
  
        // Dictionary Creation and uploaded it to a list
        var temp:any = {}
        temp["data"] = deptcnt
        var temp1 = []
        temp1.push(temp)

      
        this.pieChartDatasets = temp1
        this.pieChartLabels = dept

      });
    }

    //Filtered By From Date
    if(orgid == 0 && deptid == 0 && awdid == 0 && fdate != new Date("0001-04-15").toString() && tdate == new Date("0001-04-29").toString()){
      
      this.sharedService.GetAllDetailsByDashboardFilters(this.SelectOrg, this.SelectDep, this.SelectAward, this.fromdate, this.todate.toISOString().slice(0,10)).subscribe( res =>{

         //converting api values into list
         let d = []
         let d1:string[][] = []
         for(var i of res){
           for(let key in i){
             let value = i[key];
             d.push(value)
           }
           d1.push(d)
           d = []          
         }
   
         //setting into calculate a total count in dictionary
         var dict:any = {}
         for(var a of d1){
           for(var b of a){
             var new_item = b
             dict[new_item] = dict.hasOwnProperty(new_item)? ++dict[new_item] : 1;
           }
         }
   
         //Setting Organisation into a list
         var org:any = []
         const search = (targetElement : string) => (arrElement : string) => arrElement == targetElement;
         for(var x of d1){
             if(org.some(search(x[0]))){
               continue
             }
             else{
               org.push(x[0])
             }
         }
         this.org = org
   
         //Setting Department into a list
         var dept:any = []
         for(var x of d1){
             if(dept.some(search(x[1]))){
               continue
             }
             else{
               dept.push(x[1])
             }
         }
         this.dept = dept
   
         //Setting Awards into a list
         var award:any = []
         for(var x of d1){
             if(award.some(search(x[2]))){
               continue
             }
             else{
               award.push(x[2])
             }
         }
   
         //setting Organisation count into a list
         var orgcnt:any = []
         for(var j of org){
           for(var h of Object.keys(dict)){
             if(j == h){
               orgcnt.push(dict[h])
             }
           }
         }
         this.orgcnt = orgcnt
   
         //setting department values into a list
         var deptcnt:any = []
         for(var j of dept){
           for(var h of Object.keys(dict)){
             if(j == h){
               deptcnt.push(dict[h])
             }
           }
         }
         this.deptcnt = deptcnt
   
         //setting award values into a list
         var awdcnt:any = []
         for(var j of award){
           for(var k of Object.keys(dict)){
             if(j == k){
               awdcnt.push(dict[k])
             }
           }
         }
   
         // Dictionary Creation and uploaded it to a list
         var temp:any = {}
         temp["data"] = orgcnt
         var temp1 = []
         temp1.push(temp)
 
       
         this.pieChartDatasets = temp1
         this.pieChartLabels = org

      });
    }

    //Filtered By To Date
    if(orgid == 0 && deptid == 0 && awdid == 0 && fdate == new Date("0001-04-15").toString() && tdate != new Date("0001-04-29").toString()){
      
      this.sharedService.GetAllDetailsByDashboardFilters(this.SelectOrg, this.SelectDep, this.SelectAward, this.fromdate.toISOString().slice(0,10), this.todate).subscribe( res => {

        //converting api values into list
        let d = []
        let d1:string[][] = []
        for(var i of res){
          for(let key in i){
            let value = i[key];
            d.push(value)
          }
          d1.push(d)
          d = []          
        }
  
        //setting into calculate a total count in dictionary
        var dict:any = {}
        for(var a of d1){
          for(var b of a){
            var new_item = b
            dict[new_item] = dict.hasOwnProperty(new_item)? ++dict[new_item] : 1;
          }
        }
  
        //Setting Organisation into a list
        var org:any = []
        const search = (targetElement : string) => (arrElement : string) => arrElement == targetElement;
        for(var x of d1){
            if(org.some(search(x[0]))){
              continue
            }
            else{
              org.push(x[0])
            }
        }
        this.org = org
  
        //Setting Department into a list
        var dept:any = []
        for(var x of d1){
            if(dept.some(search(x[1]))){
              continue
            }
            else{
              dept.push(x[1])
            }
        }
        this.dept = dept
  
        //Setting Awards into a list
        var award:any = []
        for(var x of d1){
            if(award.some(search(x[2]))){
              continue
            }
            else{
              award.push(x[2])
            }
        }
  
        //setting Organisation count into a list
        var orgcnt:any = []
        for(var j of org){
          for(var h of Object.keys(dict)){
            if(j == h){
              orgcnt.push(dict[h])
            }
          }
        }
        this.orgcnt = orgcnt
  
        //setting department values into a list
        var deptcnt:any = []
        for(var j of dept){
          for(var h of Object.keys(dict)){
            if(j == h){
              deptcnt.push(dict[h])
            }
          }
        }
        this.deptcnt = deptcnt
  
        //setting award values into a list
        var awdcnt:any = []
        for(var j of award){
          for(var k of Object.keys(dict)){
            if(j == k){
              awdcnt.push(dict[k])
            }
          }
        }
  
        // Dictionary Creation and uploaded it to a list
        var temp:any = {}
        temp["data"] = orgcnt
        var temp1 = []
        temp1.push(temp)

      
        this.pieChartDatasets = temp1
        this.pieChartLabels = org

      });
    }

    //Filter by From Date and To Date
    if(orgid == 0 && deptid == 0 && awdid == 0 && fdate != new Date("0001-04-15").toString() && tdate != new Date("0001-04-29").toString()){

      this.sharedService.GetAllDetailsByDashboardFilters(this.SelectOrg, this.SelectDep, this.SelectAward, this.fromdate, this.todate).subscribe( res => {

        //converting api values into list
        let d = []
        let d1:string[][] = []
        for(var i of res){
          for(let key in i){
            let value = i[key];
            d.push(value)
          }
          d1.push(d)
          d = []          
        }
  
        //setting into calculate a total count in dictionary
        var dict:any = {}
        for(var a of d1){
          for(var b of a){
            var new_item = b
            dict[new_item] = dict.hasOwnProperty(new_item)? ++dict[new_item] : 1;
          }
        }
  
        //Setting Organisation into a list
        var org:any = []
        const search = (targetElement : string) => (arrElement : string) => arrElement == targetElement;
        for(var x of d1){
            if(org.some(search(x[0]))){
              continue
            }
            else{
              org.push(x[0])
            }
        }
        this.org = org
  
        //Setting Department into a list
        var dept:any = []
        for(var x of d1){
            if(dept.some(search(x[1]))){
              continue
            }
            else{
              dept.push(x[1])
            }
        }
        this.dept = dept
  
        //Setting Awards into a list
        var award:any = []
        for(var x of d1){
            if(award.some(search(x[2]))){
              continue
            }
            else{
              award.push(x[2])
            }
        }
  
        //setting Organisation count into a list
        var orgcnt:any = []
        for(var j of org){
          for(var h of Object.keys(dict)){
            if(j == h){
              orgcnt.push(dict[h])
            }
          }
        }
        this.orgcnt = orgcnt
  
        //setting department values into a list
        var deptcnt:any = []
        for(var j of dept){
          for(var h of Object.keys(dict)){
            if(j == h){
              deptcnt.push(dict[h])
            }
          }
        }
        this.deptcnt = deptcnt
  
        //setting award values into a list
        var awdcnt:any = []
        for(var j of award){
          for(var k of Object.keys(dict)){
            if(j == k){
              awdcnt.push(dict[k])
            }
          }
        }
  
        // Dictionary Creation and uploaded it to a list
        var temp:any = {}
        temp["data"] = orgcnt
        var temp1 = []
        temp1.push(temp)

      
        this.pieChartDatasets = temp1
        this.pieChartLabels = org

      });
    }

    //All 5 Filter - Organisation, Department, Award, Start, End
    if(orgid != 0 && deptid != 0 && awdid != 0 && fdate != new Date("0001-04-15").toString() && tdate != new Date("0001-04-29").toString()){

      this.sharedService.GetAllDetailsByDashboardFilters(this.SelectOrg, this.SelectDep, this.SelectAward, this.fromdate, this.todate).subscribe(res => {

        //converting api values into list
      let d = []
      let d1:string[][] = []
      for(var i of res){
        for(let key in i){
          let value = i[key];
          d.push(value)
        }
        d1.push(d)
        d = []          
      }

      //setting into calculate a total count in dictionary
      var dict:any = {}
      for(var a of d1){
        for(var b of a){
          var new_item = b
          dict[new_item] = dict.hasOwnProperty(new_item)? ++dict[new_item] : 1;
        }
      }

      //Setting Organisation into a list
      var org:any = []
      const search = (targetElement : string) => (arrElement : string) => arrElement == targetElement;
      for(var x of d1){
          if(org.some(search(x[0]))){
            continue
          }
          else{
            org.push(x[0])
          }
      }
      this.org = org

      //Setting Department into a list
      var dept:any = []
      for(var x of d1){
          if(dept.some(search(x[1]))){
            continue
          }
          else{
            dept.push(x[1])
          }
      }
      this.dept = dept

      //Setting Awards into a list
      var award:any = []
      for(var x of d1){
          if(award.some(search(x[2]))){
            continue
          }
          else{
            award.push(x[2])
          }
      }
      this.pieChartLabels = dept

      //setting award values into a list
      var orgcnt:any = []
      for(var j of org){
        for(var h of Object.keys(dict)){
          if(j == h){
            orgcnt.push(dict[h])
          }
        }
      }
      this.orgcnt = orgcnt

      //setting award values into a list
      var deptcnt:any = []
      for(var j of org){
        for(var h of Object.keys(dict)){
          if(j == h){
            deptcnt.push(dict[h])
          }
        }
      }
      this.deptcnt = deptcnt

      //setting award values into a list
      var awdcnt:any = []
      for(var j of award){
        for(var k of Object.keys(dict)){
          if(j == k){
            awdcnt.push(dict[k])
          }
        }
      }

      // Dictionary Creation and uploaded it to a list
      var temp:any = {}
      temp["data"] = deptcnt
      var temp1 = []
      temp1.push(temp)
      this.pieChartDatasets = temp1

      })
    }

  }
}
