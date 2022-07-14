import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.css']
})
export class DialogboxComponent implements OnInit {
  value:any;
  
  dataType:any;
  
  constructor(public dialogRef: MatDialogRef<DialogboxComponent>,private router: Router,
    @Inject(MAT_DIALOG_DATA) public data:any) {

  }
  ngOnInit(): void {
    this.dataType = typeof(this.data.count);
    console.log( this.dataType);
    console.log( typeof(this.dataType));
    console.log(this.data.class)

  }

  close() {
    this.dialogRef.close();
    this.router.navigate(this.data.class)
  }

}
