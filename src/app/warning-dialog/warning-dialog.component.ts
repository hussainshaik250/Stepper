import { Component, Inject ,ViewChild} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';


@Component({
  selector: 'app-warning-dialog',
  templateUrl: './warning-dialog.component.html',
  styleUrls: ['./warning-dialog.component.css']
})
export class WarningDialogComponent {
  @ViewChild('stepper') stepper!: MatStepper;


  
  constructor(
    public dialogRef: MatDialogRef<WarningDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  onCloseClick(): void {
    this.dialogRef.close();
  }
  goToPreviousStep(): void {
    this.stepper.previous();
  }

}
