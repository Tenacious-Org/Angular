import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogboxComponent } from 'src/app/dialogbox/dialogbox.component';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
import { Awards } from 'Models/Awards';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-add-awards',
  templateUrl: './add-awards.component.html',
  styleUrls: ['./add-awards.component.css']
})
export class AddAwardsComponent implements OnInit {
  imgsrc="";
  endpoint ="AwardType";
  imageError = "";
  isImageSaved: boolean = false;
  cardImageBase64 = "";
  error: any;
  
  
  constructor(private toastService: HotToastService,private sharedService:SharedService,private router: Router) { }

  response="success"; 
  AwardType : any ={
  id : 0,
  awardName : '',
  awardDescription :'',
  image: null,
  imageName:'',
  imageString : this.cardImageBase64,
  addedBy : 1,
  addedOn : Date.now
  }

  ngOnInit(): void {
    if(!AuthenticationService.GetData("Admin")){
      this.router.navigateByUrl("")
    }
  }

  OnSubmit(){
    console.log(this.AwardType);
    this.sharedService.Add(this.endpoint,this.AwardType).subscribe({
      // console.log(res);
      // this.showToast();
      next:(res) => { console.log(res), res?this.showToast():null },
        error: (error) => this.error = error.error.message
    });

  }
  
  showToast() {
    this.toastService.success('Award added Successfully !',
    {
      autoClose: true,
      dismissible: true,
      
    })
    this.router.navigate(['/awards']);

  }
  

  ImageConversion(fileInput:any){
    var x:any=document.getElementById("image");
    var file=x.files[0];
    if('name' in file){
      this.AwardType.imageName=file.name;
      console.log(this.AwardType.imageName);
    }
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
          this.imgsrc=e.target.result;
          const imgBase64Path = e.target.result;
          this.cardImageBase64 = imgBase64Path;
          this.cardImageBase64= this.cardImageBase64.replace("data:image/png;base64,", "");
          this.cardImageBase64= this.cardImageBase64.replace("data:image/jpg;base64,", "");
          this.cardImageBase64= this.cardImageBase64.replace("data:image/jpeg;base64,", "");
          this.AwardType.imageString=this.cardImageBase64;
          this.isImageSaved = true;
        }
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    } return false
  }

}
