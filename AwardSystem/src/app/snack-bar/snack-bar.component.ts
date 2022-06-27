import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css'],
})
export class SnackBarComponent implements OnInit {
  @Input() snackBarMessage: string = '';
  @Input() snackBarAction: string = '';
  constructor(private _snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.openSnackBar();
  }

  openSnackBar() {
    this._snackBar.open(this.snackBarMessage, this.snackBarAction, {
      duration: 3000,
    });
  }
}