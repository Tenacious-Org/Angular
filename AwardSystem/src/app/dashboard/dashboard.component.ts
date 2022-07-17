import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { Department } from 'Models/Department';
import { Organisation } from 'Models/Organisation';
import { SharedService } from 'src/app/shared.service';
import { BaseChartDirective } from 'ng2-charts';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;


  org:any=[]
  dept:any=[]
  award:any=[]
  orgcnt:any=[]
  deptcnt:any=[]
  awdcnt:any=[]

  res = false;

  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
        responsive: false,
  };
  public pieChartLabels = this.award;
  public pieChartDatasets = [ {
    data: []
  } ];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private sharedService: SharedService) { }

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
    this.Pie()
    this.sharedService.getAll(this.endpoint).subscribe(data => {
      this.organisations = data;
    });
    this.sharedService.getAll(this.endpoint1).subscribe(data => {
      this.awardData = data;
    });
  }

  onSelectDepCascade(){
    this.sharedService.getDepartmentByOrganisation(this.SelectOrg).subscribe(data=>{
      this.departments = data;
      console.log(this.departments);
    });
   }

  //Get Overall Statistics of This Dashboard
  Pie():void{
    this.sharedService.getallwinner().subscribe( (res) =>
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
        console.log(d1)

        //setting into calculate a total count in dictionary
        var dict:any = {}
        for(var a of d1){
          for(var b of a){
            var new_item = b
            dict[new_item] = dict.hasOwnProperty(new_item)? ++dict[new_item] : 1;
          }
        }
        console.log(dict)

        //Setting Organisation into a list
        var org:any = []
        const search = (targetElement : string) => (arrElement : string) => arrElement === targetElement;
        for(var x of d1){
            if(org.some(search(x[0]))){
              continue
            }
            else{
              org.push(x[0])
            }
        }
        this.org = org
        console.log(this.org)

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
        console.log(this.award)

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
        console.log("Organisation :",this.orgcnt)

        //setting award values into a list
        var awdcnt:any = []
        for(var j of award){
          for(var k of Object.keys(dict)){
            if(j == k){
              awdcnt.push(dict[k])
            }
          }
        }
        console.log("Awards :",awdcnt)

        // Dictionary Creation and uploaded it to a list
        var temp:any = {}
        temp["data"] = awdcnt
        console.log("Temp : ",temp)
        var temp1 = []
        temp1.push(temp)
        this.pieChartDatasets = temp1

        

    });
  }

  onSelectAward(){
    this.sharedService.getallAwardwise(this.SelectAward).subscribe(res => {

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
      console.log(d1)

      //setting into calculate a total count in dictionary
      var dict:any = {}
      for(var a of d1){
        for(var b of a){
          var new_item = b
          dict[new_item] = dict.hasOwnProperty(new_item)? ++dict[new_item] : 1;
        }
      }
      console.log(dict)

      //Setting Organisation into a list
      var org:any = []
      const search = (targetElement : string) => (arrElement : string) => arrElement === targetElement;
      for(var x of d1){
          if(org.some(search(x[0]))){
            continue
          }
          else{
            org.push(x[0])
          }
      }
      this.org = org
      console.log(this.org)

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
      
      console.log(this.award)

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
      console.log("Organisation :",this.orgcnt)

      //setting award values into a list
      var awdcnt:any = []
      for(var j of award){
        for(var k of Object.keys(dict)){
          if(j == k){
            awdcnt.push(dict[k])
          }
        }
      }
      console.log("Awards :",awdcnt)

      // Dictionary Creation and uploaded it to a list
      var temp:any = {}
      temp["data"] = orgcnt
      console.log("Temp : ",temp)
      var temp1 = []
      temp1.push(temp)
      this.pieChartDatasets = temp1
    });
  }

  onSelectorg() {
    this.onSelectDepCascade()
    this.sharedService.getallwinOrgwise(this.SelectOrg).subscribe(res => {

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
      console.log(d1)

      //setting into calculate a total count in dictionary
      var dict:any = {}
      for(var a of d1){
        for(var b of a){
          var new_item = b
          dict[new_item] = dict.hasOwnProperty(new_item)? ++dict[new_item] : 1;
        }
      }
      console.log(dict)

      //Setting Organisation into a list
      var org:any = []
      const search = (targetElement : string) => (arrElement : string) => arrElement === targetElement;
      for(var x of d1){
          if(org.some(search(x[0]))){
            continue
          }
          else{
            org.push(x[0])
          }
      }
      this.org = org
      console.log(this.org)

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
      console.log(this.award)

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
      console.log("Organisation :",this.orgcnt)

      //setting award values into a list
      var awdcnt:any = []
      for(var j of award){
        for(var k of Object.keys(dict)){
          if(j == k){
            awdcnt.push(dict[k])
          }
        }
      }
      console.log("Awards :",awdcnt)

      // Dictionary Creation and uploaded it to a list
      var temp:any = {}
      temp["data"] = awdcnt
      console.log("Temp : ",temp)
      var temp1 = []
      temp1.push(temp)
      this.pieChartDatasets = temp1
    });
  }

  Apply(orgid: number, deptid: number, awdid: number, fdate:any, tdate:any){
    console.log("org: ", orgid)
    console.log("dep: ", deptid)
    console.log("awd: ", awdid)
    console.log("fdate: ", fdate)
    console.log("tdate: ", tdate)

    if(fdate == ""){
      console.log("It is cleared value. so assign a from date value.")
      fdate = new Date("0001-04-15").toString()
    }
    if(tdate == ""){
      console.log("It is cleared value. so assign a To date value.")
      tdate = new Date("0001-04-29").toString()
    }

    //All Values Empty
    if(orgid == 0 && deptid == 0 && awdid == 0 && fdate == new Date("0001-04-15").toString() && tdate == new Date("0001-04-29").toString()){
      console.log("All Values Empty!! No Need To Call API.")
    }

    //Filtered By Organisation and Department wise
    if(orgid != 0 && deptid != 0 && awdid == 0 && fdate == new Date("0001-04-15").toString() && tdate == new Date("0001-04-29").toString()){
      console.log("Filtered By Organisation and Department wise.")
      this.sharedService.getallorganddept(this.SelectOrg, this.SelectDep).subscribe( (res) =>
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
          console.log(d1)

          //setting into calculate a total count in dictionary
          var dict:any = {}
          for(var a of d1){
            for(var b of a){
              var new_item = b
              dict[new_item] = dict.hasOwnProperty(new_item)? ++dict[new_item] : 1;
            }
          }
          console.log(dict)

          //Setting Organisation into a list
          var org:any = []
          const search = (targetElement : string) => (arrElement : string) => arrElement === targetElement;
          for(var x of d1){
              if(org.some(search(x[0]))){
                continue
              }
              else{
                org.push(x[0])
              }
          }
          this.org = org
          console.log(this.org)

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
          console.log(this.award)

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
          console.log("Organisation :",this.orgcnt)

          //setting award values into a list
          var awdcnt:any = []
          for(var j of award){
            for(var k of Object.keys(dict)){
              if(j == k){
                awdcnt.push(dict[k])
              }
            }
          }
          console.log("Awards :",awdcnt)

          // Dictionary Creation and uploaded it to a list
          var temp:any = {}
          temp["data"] = awdcnt
          console.log("Temp : ",temp)
          var temp1 = []
          temp1.push(temp)
          this.pieChartDatasets = temp1

      });
    }

    //Filtered By Organisation and Award wise
    if(orgid != 0 && deptid == 0 && awdid != 0 && fdate == new Date("0001-04-15").toString() && tdate == new Date("0001-04-29").toString()){
      console.log("Get All Data Filtered By Organisation and Award Type.")
      this.sharedService.getallorgandawd(this.SelectOrg, this.SelectAward).subscribe(res => {

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
        console.log("List: ",d1)
  
        //setting into calculate a total count in dictionary
        var dict:any = {}
        for(var a of d1){
          for(var b of a){
            var new_item = b
            dict[new_item] = dict.hasOwnProperty(new_item)? ++dict[new_item] : 1;
          }
        }
        console.log("Dict: ",dict)
  
        //Setting Organisation into a list
        var org:any = []
        const search = (targetElement : string) => (arrElement : string) => arrElement === targetElement;
        for(var x of d1){
            if(org.some(search(x[0]))){
              continue
            }
            else{
              org.push(x[0])
            }
        }
        this.org = org
        console.log("Organisation: ", this.org)
  
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
        console.log("Departent: ",this.dept)
  
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
        console.log("Award: ",this.award)
  
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
        console.log("Organisation Count:",this.orgcnt)
  
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
        console.log("Department Count:",this.deptcnt)
  
        //setting award values into a list
        var awdcnt:any = []
        for(var j of award){
          for(var k of Object.keys(dict)){
            if(j == k){
              awdcnt.push(dict[k])
            }
          }
        }
        console.log("Awards Count:",awdcnt)
  
        // Dictionary Creation and uploaded it to a list
        var temp:any = {}
        temp["data"] = deptcnt
        console.log("Temp : ",temp)
        var temp1 = []
        temp1.push(temp)

      
        this.pieChartDatasets = temp1
        this.pieChartLabels = dept

        console.log("piechartlabels: ",this.pieChartLabels)
  
      });
    }

    //Filtered By Organisation and From Date
    if(orgid != 0 && deptid == 0 && awdid == 0 && fdate != new Date("0001-04-15").toString() && tdate == new Date("0001-04-29").toString()){
      console.log("Get Data By Organisation and From Date.")
      this.sharedService.getAllFilterdOrgandFromDateWise(this.SelectOrg, this.fromdate).subscribe( res =>
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
        console.log("List: ",d1)
  
        //setting into calculate a total count in dictionary
        var dict:any = {}
        for(var a of d1){
          for(var b of a){
            var new_item = b
            dict[new_item] = dict.hasOwnProperty(new_item)? ++dict[new_item] : 1;
          }
        }
        console.log("Dict: ",dict)
  
        //Setting Organisation into a list
        var org:any = []
        const search = (targetElement : string) => (arrElement : string) => arrElement === targetElement;
        for(var x of d1){
            if(org.some(search(x[0]))){
              continue
            }
            else{
              org.push(x[0])
            }
        }
        this.org = org
        console.log("Organisation: ", this.org)
  
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
        console.log("Departent: ",this.dept)
  
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
        console.log("Award: ",this.award)
  
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
        console.log("Organisation Count:",this.orgcnt)
  
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
        console.log("Department Count:",this.deptcnt)
  
        //setting award values into a list
        var awdcnt:any = []
        for(var j of award){
          for(var k of Object.keys(dict)){
            if(j == k){
              awdcnt.push(dict[k])
            }
          }
        }
        console.log("Awards Count:",awdcnt)
  
        // Dictionary Creation and uploaded it to a list
        var temp:any = {}
        temp["data"] = deptcnt
        console.log("Temp : ",temp)
        var temp1 = []
        temp1.push(temp)

      
        this.pieChartDatasets = temp1
        this.pieChartLabels = dept

        console.log("piechartlabels: ",this.pieChartLabels)

      });
    }

    //Filtered By Organisation and To Date
    if(orgid != 0 && deptid == 0 && awdid == 0 && fdate == new Date("0001-04-15").toString() && tdate != new Date("0001-04-29").toString()){
      console.log("Get Data By Organisation and To Date.")
      this.sharedService.getAllFilterdOrgandToDateWise(this.SelectOrg, this.todate).subscribe( res => {

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
        console.log("List: ",d1)
  
        //setting into calculate a total count in dictionary
        var dict:any = {}
        for(var a of d1){
          for(var b of a){
            var new_item = b
            dict[new_item] = dict.hasOwnProperty(new_item)? ++dict[new_item] : 1;
          }
        }
        console.log("Dict: ",dict)
  
        //Setting Organisation into a list
        var org:any = []
        const search = (targetElement : string) => (arrElement : string) => arrElement === targetElement;
        for(var x of d1){
            if(org.some(search(x[0]))){
              continue
            }
            else{
              org.push(x[0])
            }
        }
        this.org = org
        console.log("Organisation: ", this.org)
  
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
        console.log("Departent: ",this.dept)
  
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
        console.log("Award: ",this.award)
  
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
        console.log("Organisation Count:",this.orgcnt)
  
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
        console.log("Department Count:",this.deptcnt)
  
        //setting award values into a list
        var awdcnt:any = []
        for(var j of award){
          for(var k of Object.keys(dict)){
            if(j == k){
              awdcnt.push(dict[k])
            }
          }
        }
        console.log("Awards Count:",awdcnt)
  
        // Dictionary Creation and uploaded it to a list
        var temp:any = {}
        temp["data"] = deptcnt
        console.log("Temp : ",temp)
        var temp1 = []
        temp1.push(temp)

      
        this.pieChartDatasets = temp1
        this.pieChartLabels = dept

        console.log("piechartlabels: ",this.pieChartLabels)

      });
    }

    //Filtered By Organisation, Department and Awards
    if(orgid != 0 && deptid != 0 && awdid != 0 && fdate == new Date("0001-04-15").toString() && tdate == new Date("0001-04-29").toString()){
      console.log("Get Data By Organisation, Department and Awards.")
      this.sharedService.getallorgdeptandawd(this.SelectOrg, this.SelectDep, this.SelectAward).subscribe( res => {

        

      });
    }

    //Filtered By Organisation, Department and From Date
    if(orgid != 0 && deptid != 0 && awdid == 0 && fdate != new Date("0001-04-15").toString() && tdate == new Date("0001-04-29").toString()){
      console.log("Get Data By Organisation, Department and From Date.")
    }

    //Filtered By Organisation, Award and From Date
    if(orgid != 0 && deptid == 0 && awdid != 0 && fdate != new Date("0001-04-15").toString() && tdate == new Date("0001-04-29").toString()){
      console.log("Get Data By Organisation, Award and From Date.")
    }

    //Filtered By Organisation, Department and To Date
    if(orgid != 0 && deptid != 0 && awdid == 0 && fdate == new Date("0001-04-15").toString() && tdate != new Date("0001-04-29").toString()){
      console.log("Get Data By Organisation, Department and To Date.")
    }

    //Filtered By Organisation, Award and To Date
    if(orgid != 0 && deptid == 0 && awdid != 0 && fdate == new Date("0001-04-15").toString() && tdate != new Date("0001-04-29").toString()){
      console.log("Get Data By Organisation, Award and To Date.")
    }

    //Filtered By From Date
    if(orgid == 0 && deptid == 0 && awdid == 0 && fdate != new Date("0001-04-15").toString() && tdate == new Date("0001-04-29").toString()){
      console.log("Get Data By From Date.")
      this.sharedService.getAllFilterdFromDateWise(this.fromdate).subscribe( res =>{

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
         console.log("List: ",d1)
   
         //setting into calculate a total count in dictionary
         var dict:any = {}
         for(var a of d1){
           for(var b of a){
             var new_item = b
             dict[new_item] = dict.hasOwnProperty(new_item)? ++dict[new_item] : 1;
           }
         }
         console.log("Dict: ",dict)
   
         //Setting Organisation into a list
         var org:any = []
         const search = (targetElement : string) => (arrElement : string) => arrElement === targetElement;
         for(var x of d1){
             if(org.some(search(x[0]))){
               continue
             }
             else{
               org.push(x[0])
             }
         }
         this.org = org
         console.log("Organisation: ", this.org)
   
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
         console.log("Departent: ",this.dept)
   
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
         console.log("Award: ",this.award)
   
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
         console.log("Organisation Count:",this.orgcnt)
   
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
         console.log("Department Count:",this.deptcnt)
   
         //setting award values into a list
         var awdcnt:any = []
         for(var j of award){
           for(var k of Object.keys(dict)){
             if(j == k){
               awdcnt.push(dict[k])
             }
           }
         }
         console.log("Awards Count:",awdcnt)
   
         // Dictionary Creation and uploaded it to a list
         var temp:any = {}
         temp["data"] = orgcnt
         console.log("Temp : ",temp)
         var temp1 = []
         temp1.push(temp)
 
       
         this.pieChartDatasets = temp1
         this.pieChartLabels = org
 
         console.log("piechartlabels: ",this.pieChartLabels)

      });
    }

    //Filtered By To Date
    if(orgid == 0 && deptid == 0 && awdid == 0 && fdate == new Date("0001-04-15").toString() && tdate != new Date("0001-04-29").toString()){
      console.log("Get Data By To Date.")
      this.sharedService.getAllFilterdToDateWise(this.todate).subscribe( res => {

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
        console.log("List: ",d1)
  
        //setting into calculate a total count in dictionary
        var dict:any = {}
        for(var a of d1){
          for(var b of a){
            var new_item = b
            dict[new_item] = dict.hasOwnProperty(new_item)? ++dict[new_item] : 1;
          }
        }
        console.log("Dict: ",dict)
  
        //Setting Organisation into a list
        var org:any = []
        const search = (targetElement : string) => (arrElement : string) => arrElement === targetElement;
        for(var x of d1){
            if(org.some(search(x[0]))){
              continue
            }
            else{
              org.push(x[0])
            }
        }
        this.org = org
        console.log("Organisation: ", this.org)
  
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
        console.log("Departent: ",this.dept)
  
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
        console.log("Award: ",this.award)
  
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
        console.log("Organisation Count:",this.orgcnt)
  
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
        console.log("Department Count:",this.deptcnt)
  
        //setting award values into a list
        var awdcnt:any = []
        for(var j of award){
          for(var k of Object.keys(dict)){
            if(j == k){
              awdcnt.push(dict[k])
            }
          }
        }
        console.log("Awards Count:",awdcnt)
  
        // Dictionary Creation and uploaded it to a list
        var temp:any = {}
        temp["data"] = orgcnt
        console.log("Temp : ",temp)
        var temp1 = []
        temp1.push(temp)

      
        this.pieChartDatasets = temp1
        this.pieChartLabels = org

        console.log("piechartlabels: ",this.pieChartLabels)

      });
    }

    //All 5 Filter
    if(orgid != 0 && deptid != 0 && awdid != 0 && fdate != new Date("0001-04-15").toString() && tdate != new Date("0001-04-29").toString()){
      console.log("Get all Data Filtered By Organisation, Department, Award, Startdate, Enddate")
      this.sharedService.getAllFiltersDateWise(this.SelectOrg, this.SelectDep, this.SelectAward, this.fromdate, this.todate).subscribe(res => {

        console.log("selctorg: ",this.SelectOrg)
        console.log("selctdep: ",this.SelectDep)
        console.log("selctawd: ",this.SelectAward)
        console.log("fromdate: ",this.fromdate)
        console.log("todate: ",this.todate)

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
      console.log(d1)

      //setting into calculate a total count in dictionary
      var dict:any = {}
      for(var a of d1){
        for(var b of a){
          var new_item = b
          dict[new_item] = dict.hasOwnProperty(new_item)? ++dict[new_item] : 1;
        }
      }
      console.log(dict)

      //Setting Organisation into a list
      var org:any = []
      const search = (targetElement : string) => (arrElement : string) => arrElement === targetElement;
      for(var x of d1){
          if(org.some(search(x[0]))){
            continue
          }
          else{
            org.push(x[0])
          }
      }
      this.org = org
      console.log(this.org)

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
      console.log(this.dept)

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
      console.log(this.award)

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
      console.log("Organisation :",this.orgcnt)

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
      console.log("Department :",this.deptcnt)

      //setting award values into a list
      var awdcnt:any = []
      for(var j of award){
        for(var k of Object.keys(dict)){
          if(j == k){
            awdcnt.push(dict[k])
          }
        }
      }
      console.log("Awards :",awdcnt)

      // Dictionary Creation and uploaded it to a list
      var temp:any = {}
      temp["data"] = deptcnt
      console.log("Temp : ",temp)
      var temp1 = []
      temp1.push(temp)
      this.pieChartDatasets = temp1

      })
    }

  }
}
