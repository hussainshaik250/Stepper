import { Component,AfterViewInit,ViewChild } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { StepperComponent } from './stepper/stepper.component';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DataService } from './data.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent {
  
  
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  combinedData: any;
  

  constructor(private _formBuilder: FormBuilder,private _dialog:MatDialog,private dataService:DataService) {}
  onSubmit(){
    console.log(this.dataService.getFormData1());
    console.log(this.dataService.getFormData2());
    // console.log(this.dataService.getformdata());
    // this.router.navigate('/preview')
    this.combinedData=this.dataService.onCombineData();
    // const formData = this.empForm.value;

    this.dataService.postData( this.combinedData)
      .subscribe((response: any) => {
        console.log('Data sent successfully:', response);
        alert("user added successfully!")
        
        // You can add further logic or navigate to another page upon success
      }, error => {
        console.error('Error sending data:', error);
      });
    
    
    
  }
 
  

  
}
  

