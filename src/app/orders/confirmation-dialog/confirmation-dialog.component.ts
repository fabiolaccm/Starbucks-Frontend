import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {

  constructor(
      public dialogo: MatDialogRef<ConfirmationDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public mensaje: string) { }
  
      cerrarDialogo(): void {
        this.dialogo.close(false);
      }
      confirmado(): void {
        this.dialogo.close(true);
      }
  
    ngOnInit() {
    }
  
  }
