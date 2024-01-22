import { Component,AfterViewInit,ViewChild ,OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DataService } from '../data.service';
import { FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { StepperComponent } from '../stepper/stepper.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'mobilenumber','emailid','accountnumber','holdername','ifsccode','address','language','dateofbirth','action'];
  dataSource!: MatTableDataSource<any>;
  empForm!:FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dataService:DataService,private router:Router, private _dialog: MatDialog,private snackBar: MatSnackBar){

  }
 
  getEmployeeList() {
    this.dataService.getEmployeeList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        // this.dataSource.sort = this.sort;
        this.dataSource.sort = this.sort;
        this.sort.active = 'id'; // Set the initial sort column
        this.sort.direction = 'desc'; // Set the initial sort direction
        this.dataSource.paginator = this.paginator;
        
      },
      error: console.log,
    });
  }
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
    delete(id:number){
      this.dataService.deleteEmployee(id).subscribe({
        next:(res)=>{
          this.snackBar.open('User deleted successfully!', 'Close', {
            duration: 5000, // Duration in milliseconds
          });
          this.getEmployeeList()
        },
        error:console.log,
      })

    }
    ngOnInit() {
      // this.empForm.patchValue(this.id);
      
        this.getEmployeeList();
        const formData = this.dataService.getFormData();
        
      
    }
    
  
    openEditForm(data: any) {
      this.dataService.getEmployeeList( ).subscribe({
        next: (res) => {
          // Assuming the API response includes the updated data
          const updatedData = res; 
    
          // Navigate to the Stepper component with the updated data
          this.router.navigate(['/stepper'], {
            queryParams: {
              data: encodeURIComponent(JSON.stringify(updatedData)),

            },
            state: {
              firstname: "updateddata",
              lastname: "lastname",
              mobilenumber: "mobilenumber",
              email: "email",
              accountnumber: "accountnumber",
              ifsccode: "ifsccode",
              holdername: "holdername",
              address: "address",
              
            },
          });
        },
        error: console.error, // Log any errors
      });
      
      
   
      const navigationExtras: NavigationExtras = {
        queryParams: {
          data: encodeURIComponent(JSON.stringify(data))
        }
        
      };
    
     
      this.router.navigate(['/form'], navigationExtras);
    }
   
   
    
  

}
