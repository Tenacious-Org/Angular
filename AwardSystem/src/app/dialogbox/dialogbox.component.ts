import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.css']
})
export class DialogboxComponent implements OnInit {
  value: string = '';

  dataType: any;

  constructor(public dialogRef: MatDialogRef<DialogboxComponent>, private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }
  disable = 1;
  publish = 1;
  ngOnInit(): void {
    this.dataType = typeof (this.data.count);

  }

  close() {
    this.dialogRef.close();
    this.router.navigate(this.data.class)
  }


}
