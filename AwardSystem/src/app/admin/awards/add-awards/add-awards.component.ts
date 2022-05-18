import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';


@Component({
  selector: 'app-add-awards',
  templateUrl: './add-awards.component.html',
  styleUrls: ['./add-awards.component.css']
})
export class AddAwardsComponent implements OnInit {

  constructor(private sharedService:SharedService) { }
  
  imageError = "";
  isImageSaved: boolean = false;
  cardImageBase64 = "";

  AwardType : any ={
  id : 0,
  awardName : '',
  awardDescription :'',
  image: '',
  imageString : this.cardImageBase64,
  addedBy : 1,
  addedOn : Date.now

  }

  ngOnInit(): void {
  }

  OnSubmit(){
    // console.log(this.Organisation)
    this.sharedService.addAwardType(this.AwardType).subscribe((res) =>{
      console.log(res);
    })
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
          this.AwardType.imageString=this.cardImageBase64;
          this.isImageSaved = true;
          

        }

      };

      reader.readAsDataURL(fileInput.target.files[0]);
    } return false
  }

}
