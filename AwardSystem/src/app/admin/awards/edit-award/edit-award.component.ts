import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/authentication.service';
@Component({
  selector: 'app-edit-award',
  templateUrl: './edit-award.component.html',
  styleUrls: ['./edit-award.component.css']
})

export class EditAwardComponent implements OnInit {
  imageError = "";
  imgsrc = '';
  isImageSaved: boolean = false;
  cardImageBase64 = "";
  Id = 0;
  endpoint = "AwardType";
  error = 'any';


  data: any = {
    id: 0,
    awardName: '',
    awardDescription: '',
    image: null,
    imageName: '',
    imageString: this.cardImageBase64,
    addedBy: 1,
    addedOn: Date.now
  }

  constructor(private sharedService: SharedService, private route: ActivatedRoute, private routing: Router, private toastService: HotToastService) { }

  ngOnInit(): void {
    if (!AuthenticationService.GetData("Admin")) {
      this.routing.navigateByUrl("")

    }
    this.route.params.subscribe(params => {
      this.Id = params['id'];
      this.sharedService.GetById(this.endpoint, this.Id).subscribe((result) => {
        this.data = result;
        if (this.data.image != '') {
          this.imgsrc = 'data:image/jpg;base64,' + this.data.image;
        }
      });
    });
  }

  OnSubmit() {
    if (this.data.imageString == null && this.data.image != '') {
      this.data.imageString = this.data.image;
    }
    this.sharedService.Edit(this.endpoint, this.data).subscribe({
      // this.showToast();
      next: (res) => { res ? this.showToast() : null },
      error: (error) => this.error = error.error.message
    });

  }
  showToast() {
    this.toastService.success('Award updated Successfully !',
      {
        autoClose: true,
        dismissible: true,

      })
    this.routing.navigate(['/admin/awards']);
  }

  ImageConversion(fileInput: any) {
    var x: any = document.getElementById("image");
    var file = x.files[0];
    if ('name' in file) {
      this.data.imageName = file.name;
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

      if (!allowed_types.includes(fileInput.target.files[0].type)) {
        this.imageError = 'Only Images are allowed ( JPG | PNG )';
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          this.imgsrc = e.target.result;
          const imgBase64Path = e.target.result;
          this.cardImageBase64 = imgBase64Path;
          this.cardImageBase64 = this.cardImageBase64.replace("data:image/png;base64,", "");
          this.cardImageBase64 = this.cardImageBase64.replace("data:image/jpg;base64,", "");
          this.cardImageBase64 = this.cardImageBase64.replace("data:image/jpeg;base64,", "");
          this.data.imageString = this.cardImageBase64;
          this.isImageSaved = true;
        }
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    } return false
  }
}
