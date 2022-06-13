import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.css']
})
export class DialogboxComponent implements OnInit {
  dataType:any;
  constructor(public dialogRef: MatDialogRef<DialogboxComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) {

  }
  ngOnInit(): void {
    this.dataType = typeof(this.data.count);
    console.log( this.dataType);
    console.log( typeof(this.dataType));
  }

  close() {
    this.dialogRef.close();
  }

}
