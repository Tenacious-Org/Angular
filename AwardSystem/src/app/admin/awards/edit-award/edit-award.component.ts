import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-edit-award',
  templateUrl: './edit-award.component.html',
  styleUrls: ['./edit-award.component.css']
})
export class EditAwardComponent implements OnInit {
  imageError = "";
  isImageSaved: boolean = false;
  cardImageBase64 = "";
  data :any;
  Id =0;

  constructor(private sharedService: SharedService,private http:HttpClient , private router:ActivatedRoute) { }

  ngOnInit(): void {

    this.router.params.subscribe(params => {
    this.Id = params['id'];
    this.http
      .get<any>(`https://localhost:7275/api/AwardType/GetById?id=${this.Id}`)
      .subscribe((result) => {
        this.data = result;
        console.log(this.Id);
        console.log(this.data);
      });
    });
   

  }

  OnSubmit(){
    console.log(this.data);
    this.sharedService.editAwardType(this.Id,this.data).subscribe(data=>{
      console.log(data);
    });

  }
  ImageConversion(fileInput:any){
    this.imageError = "";
    if (fileInput.target.files && fileInput.target.files[0]) {

      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];

      if (fileInput.target.files[0].size > max_size) {
        this.imageError =
          'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        return false;
      }
      console.log(fileInput.target.files[0].type)

      if (!allowed_types.includes(fileInput.target.files[0].type)) {
        this.imageError = 'Only Images are allowed ( JPG | PNG )';
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {

          const imgBase64Path = e.target.result;
          
          this.cardImageBase64 = imgBase64Path;
          this.cardImageBase64= this.cardImageBase64.replace("data:image/png;base64,", "");
          this.cardImageBase64= this.cardImageBase64.replace("data:image/jpg;base64,", "");
          this.cardImageBase64= this.cardImageBase64.replace("data:image/jpeg;base64,", "");
          this.data.imageString=this.cardImageBase64;
          this.isImageSaved = true;
        }
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    } return false
  }


}
