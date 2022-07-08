import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, ChartData, ChartOptions } from 'chart.js';
import { Department } from 'Models/Department';
import { Organisation } from 'Models/Organisation';
import { SharedService } from 'src/app/shared.service';
import { Employee } from 'Models/Employee';
import { AwardType } from 'Models/AwardType';
import { AwardService } from '../award.service';
import { dashboard } from 'Models/Dashboard';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  chart:any
  
  constructor(private sharedService: SharedService, private awardService: AwardService, private router: Router) { }

  awardData: any;
  isAward = 0;
  Awards: any =
    {
      id: 0,
      requesterId: 0,
      awardeeId: 0,
      awardTypeId: 0,
      approverId: 0,
      reason: '',
      rejectReason: '',
      hRId: 0,
      couponCode: '',
      statusId: 0,
      isActive: true,
    }
    org:any=[]
  award:any=[]
  orgcnt:any=[]
  awdcnt:any=[]
    



  salesData: ChartData<'bar'> = {
    labels: ['Development', 'Testing', 'Facility', 'Security', 'Management'],
    datasets: [
      { label: 'Rolestar', data: [10, 12, 10, 20, 50] },
      { label: 'Tech Thunder', data: [20, 10, 40, 50, 90] },
      { label: 'Gladiator', data: [50, 40, 35, 45, 50] },
      { label: 'First victor', data: [10, 50, 10, 60, 90] },
    ],
  };
  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Awards In each Organisation',
      },
    },
  };
  




  organisations: Organisation[] = [];
  departments: Department[] = [];
  employee: Employee[] = [];
  reportingPersonList: any;
  hrList: any;
  SelectOrg: any = 0;
  SelectDep: any = 0;
  data: AwardType[] = [];


  endpoint = "Organisation";
  endpoint1 = "AwardType";

  

  

  

  ngOnInit(): void {
    this.sharedService.getallwinner().subscribe(
      (res) =>{

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
        this.award = award
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
        this.awdcnt = awdcnt
        console.log("Awards :",this.awdcnt)


      //create a chart data
      // this.chart = new Chart('canvas',{
      //   type: 'line',
      //   data: {
      //     labels: this.award,
      //     datasets: [
      //       {
      //         data: this.awdcnt,
      //         borderColor: '#3cba9f',
      //         fill: false
      //       }
      //     ]
      //   },
      //   options: {
      //     responsive:true
      //   }
      // })

      new Chart('barchart', {
        type: 'bar',
        data: {
          labels: award,
          datasets: [{
            data: awdcnt,
          }]
        },
        options: {
          plugins: {
            legend: {
              position: 'top',
              display: true,
            },
          },
        }
      });


      }
    );


    this.sharedService.getAll(this.endpoint).subscribe(data => {
      this.organisations = data;
    });
    this.sharedService.getAll(this.endpoint1).subscribe(data => {
      this.awardData = data;
    });

  }

  onSelectorg() {
    this.sharedService.getallwinOrgwise(this.SelectOrg).subscribe(res => {

      console.log(res)
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
       this.award = award
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
       this.awdcnt = awdcnt
       console.log("Awards :",this.awdcnt)

       //Creating Charts
       new Chart('barchart', {
        type: 'bar',
        data: {
          labels: award,
          datasets: [{
            data: awdcnt,
          }]
        },
        options: {
          plugins: {
            legend: {
              position: 'top',
              display: true,
            },
          },
        }
      });

    });
  }

  public win:dashboard[] =[];

  
}
