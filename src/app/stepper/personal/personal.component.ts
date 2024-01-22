import { Component,ViewChild,AfterViewInit,OnInit, NgModule,Input } from '@angular/core';
import { FormBuilder, Validators,FormGroup ,AbstractControl,ValidationErrors} from '@angular/forms';
import {DataService} from '../../data.service';
import { Route, Router, RouterLink } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import { HttpClient } from '@angular/common/http';
import { debounceTime, switchMap } from 'rxjs';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { WarningDialogComponent } from '../../warning-dialog/warning-dialog.component';
import { style } from '@angular/animations';
import { DialogRef } from '@angular/cdk/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';

import {MatNativeDateModule} from '@angular/material/core';
import {MatListModule} from '@angular/material/list';


@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent  {
  @Input() formGroup!: FormGroup;
  
  @ViewChild('stepper') stepper!: MatStepper;
  @Input() stepper1!: MatStepper;
  
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'mobilenumber','emailid','accountnumber','ifsccode','holdername','address','action'];
  dataSource!: MatTableDataSource<any>;
  typesOfLanguages: string[] = ['Telugu', 'Hindi', 'English', 'Kannada', 'Tamil'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  form1Data:any;
  form2Data:any;
  combinedData:any;
  isEditable1!:boolean;
  isEditable2!:boolean;
  empForm!: FormGroup;
  id:any;
  isStep1Valid:boolean=false;
  editing: boolean = false;
  dash: boolean=false;
  formData:any;
  form: any;
  private previousValidationStates: { [key: string]: ValidationErrors } = {};
  editMode: boolean=false;
  selectedIndex:boolean=false;
  icon: string='false';
  icon1: string='false';
  doneIcon:boolean=false;
  // @Output( ) firstFormGroup!:FormGroup;
  
  registrationSteps=["Fill out your personal details","account details","done"];
  toggleEditMode() {
    this.editing = !this.editing;
    this.editing ? this.empForm.enable() : this.empForm.disable();
  }
  
  emailValidator = (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null; // Don't validate empty values, leave that to the required validator
    }
  
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    if (!pattern.test(value)) {
      return { invalidEmail: true };
    }
  
    return null;
  };

 
  firstFormGroup = this._formBuilder.group({
    firstname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]], 
    lastname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],  
    mobilenumber: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
    emailid: ['', [Validators.required,  this.emailValidator]],
    language:['',Validators.required],
 
    

  });
  secondFormGroup = this._formBuilder.group({
  accountnumber: ['', [Validators.required,  Validators.pattern(/^\d{12}$/)]],
  ifsccode: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{3}\d{6}$|^[A-Za-z]{4}\d{5}$/)]],
  holdername: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]], 
  address: ['', Validators.required],


  
  });
  steps: any;
  hasError(controlName: string, errorType: string): boolean {
    const control = this.firstFormGroup.get(controlName);
    
    return !!(control && control.hasError(errorType) && (control.dirty || control.touched));
  }
  hasError1(controlName: string, errorType: string): boolean {
    const control = this.secondFormGroup.get(controlName);
    
    return !!(control && control.hasError(errorType) && (control.dirty || control.touched));
  }

  
  constructor(private _formBuilder: FormBuilder,private dataService:DataService,private router:Router,private _http:HttpClient,private route: ActivatedRoute,private dialog: MatDialog,private snackBar: MatSnackBar,private date:MatDatepickerModule) {
    
      this.empForm = this._formBuilder.group({
        firstname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
        lastname: ['',[Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
        emailid: ['',[Validators.required,this.emailValidator] ],
        mobilenumber: ['',[Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
        accountnumber: ['',[Validators.required,  Validators.pattern(/^\d{12}$/)]],
        holdername: ['',[Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
        ifsccode: ['',[Validators.required, Validators.pattern(/^[A-Za-z]{3}\d{6}$|^[A-Za-z]{4}\d{5}$/)]],
        address: ['',Validators.required],
        // chosenDate:['',Validators.required]
        
      });}
      step(){
        if(this.firstFormGroup.valid){
          this.dataService.setFormData1(this.firstFormGroup.value);
          this.stepper1.next();
          this.icon='true';
        }
        else{
          this.openDialog();
        }
      }
   
    
      
     
  step1Data() {
    if (this.firstFormGroup.valid) {
      this.form1Data = this.firstFormGroup.value;
      this.dataService.setFormData1(this.firstFormGroup.value);
      console.log('Form Data:', this.form1Data);
      
      this.icon = 'true'; // Set to true when the form is valid
      this.selectedIndex=true;
      this.isEditable1=false;
      this.doneIcon=true;
      
      console.log(this.stepper,"this is steppper")
      this.stepper1.next();
      
    } else {
      
      this.openDialog();
    }
  }
 

  
  step2Data(){
    if (this.secondFormGroup.valid) {
      
      this.form2Data = this.secondFormGroup.value;
      this.dataService.setFormData2(this.secondFormGroup.value)
      console.log('Form Data:', this.form2Data);
      this.stepper1.next();
      this.icon1='true';  
    }
    else{
      this.openDialog();
    }
    
  }
  // back(){
  //   this.isEditable1=true;
  //   this.stepper1.previous();
  // }
  goToPreviousStep(stepper: MatStepper): void {
    stepper.previous();
  }

  openDialog() {
    const dialogRef = this.dialog.open(WarningDialogComponent, {
      width: '300px', 
      data : 'Fields are required. Please fill out all the fields.',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

  getEmployeeList() {
    this.dataService.getEmployeeList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
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
          alert("user deleted successfully");
          this.getEmployeeList()
        },
        error:console.log,
      })

    }
    

    
    
    
  
  // onSubmit() {
  //   if(this.secondFormGroup.valid){

  //   if(this.editMode){
  //     this.combinedData = this.dataService.onCombineData();
  //     this.dataService.updateEmployee(this.id,this.combinedData).subscribe((response:any)=>{
  //       console.log('Data sent successfully:',response);
  //       this.snackBar.open('User updated successfully!', 'Close', {
  //         duration: 5000, // Duration in milliseconds
  //       });
  //       this.router.navigate(['/dashboard']);
        
  //       // this.router.navigate(['/dashboard'])
  //       // this.router.navigate(['/dashboard']);
  //     }, error => {
  //       console.error('Error sending data:', error);
        
  //     });}
  //     else {
        
  
    
    
  //     console.log(this.dataService.getFormData1());
  //     console.log(this.dataService.getFormData2());
      
  //     this.combinedData = this.dataService.onCombineData();
  
  //     this.dataService.postData(this.combinedData)
  //       .subscribe((response: any) => {
  //         console.log('Data sent successfully:', response);
  //         this.snackBar.open('User added successfully!', 'Close', {
  //           duration: 5000, // Duration in milliseconds
  //         });
  //         this.router.navigate(['/dashboard']);

  
          
  //       }, error => {
  //         console.error('Error sending data:', error);
  //       });
  //     }
    
    
        
        
  //     }
      
    
    
    
  // }
  
  onclick(){
    this.form=this.dataService.onCombineData()
    console.log(this.form)
    return this.form

  }

  ngOnInit() {
    
    
    
    this.empForm = this._formBuilder.group({
      firstname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      lastname: ['',[Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      emailid: ['',[Validators.required,this.emailValidator] ],
      mobilenumber: ['',[Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      accountnumber: ['',[Validators.required,  Validators.pattern(/^\d{12}$/)]],
      holdername: ['',[Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      ifsccode: ['',[Validators.required, Validators.pattern(/^[A-Za-z]{3}\d{6}$|^[A-Za-z]{4}\d{5}$/)]],
      address: ['',Validators.required],
      language:['',Validators.required]
      // gender:['',Validators.required],

      
    });
    // this.firstFormGroup = this._formBuilder.group({
    //   firstname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]], 
    //   lastname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],  
    //   mobilenumber: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
    //   emailid: ['', [Validators.required,  this.emailValidator]],
    //   language:['',Validators.required],
      
      // gender:['',Validators.required]
      // selectedLanguages: ['', Validators.required]

      
  
    // });
    // this.secondFormGroup = this._formBuilder.group({
    //   accountnumber: ['', [Validators.required,  Validators.pattern(/^\d{12}$/)]],
    //   ifsccode: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{3}\d{6}$|^[A-Za-z]{4}\d{5}$/)]],
    //   holdername: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]], 
    //   address: ['', Validators.required],
    //   // chosenDate:['',Validators.required]
      
    //   });
      
      

    this.route.queryParams.subscribe(params => {
      if (params['data']) {
        
        
        this.formData = JSON.parse(decodeURIComponent(params['data']));
        this.id=this.formData.id;
        
        this.populateForm();
        this.setEditMode();
       

        
      }
    });
  }
  populateForm() {
    this.firstFormGroup.patchValue({
      
      emailid: this.formData.emailid,
      firstname: this.formData.firstname,
      
      
      
      lastname: this.formData.lastname,
      mobilenumber: this.formData.mobilenumber,
      language:this.formData.language
      // gender:this.formData.gender
    });
    this.secondFormGroup.patchValue({
      accountnumber: this.formData.accountnumber,
      address: this.formData.address,
      holdername: this.formData.holdername,
      
      ifsccode: this.formData.ifsccode,
      
    });
    // this.id.patchValue({
    //   id:this.formData.id,
    // })
    
   
  }
  setEditMode(){
    this.editMode=true;
  }
  markControlsAsValid() {
    Object.keys(this.empForm.controls).forEach(controlName => {
      const control = this.empForm.get(controlName);
      if (control) {
        control.markAsTouched();
        control.setErrors({}); 
      }
    });
    if(this.empForm.valid){
      this.empForm.touched==true;
    }

  }
  
  
  
    
  
 
  onFormSubmit(){
    if(this.empForm.valid){
      console.log(this.empForm.value);
    }
  }
  ondash(){
    this.router.navigate(['/dashboard']);
  }
  
 
  
  
  
  
  onNavigate(){
   this. router.navigate(['/display'])
  }

  
}





  

  
  




 
 
 
 


