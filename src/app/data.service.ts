import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  private formData1: any = {};
  private formData2: any = {};
  combinedData:any;
  data: any;
  constructor(private _http: HttpClient ) {}

  // Set data for formData1
  setFormData1(data: any) {
    this.formData1 = data;
  }

  // Set data for formData2
  setFormData2(data: any) {
    this.formData2 = data;
  }

  // Get formData1
  getFormData1() {
    return this.formData1;
  }

  // Get formData2
  getFormData2() {
    return this.formData2;
  }

  // Combine formData1 and formData2
  combineFormData() :Observable<any>{
    return { ...this.formData1, ...this.formData2 };
    // return this._http.post('http://localhost:3000/employees',this.data);
  }

  // Example usage in a component method
  onCombineData() {
     this.combinedData = this.combineFormData();
    
    // return this._http.post('http://localhost:3000/employees',this.combinedData);
    return this.combinedData;
    
  }
  onSubmit(){
    //  return this._http.post('http://localhost:3000/employees',this.combinedData);
     alert("You have successfully submitted your data");

  }
  postData(data: any): Observable<any> {
    return this._http.post<any>('http://localhost:3000/employees', data);
  }
getEmployeeList(): Observable<any> {
    return this._http.get('http://localhost:3000/employees');
  }

  deleteEmployee(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/employees/${id}`);
  }
  updateEmployee(id: number, data: any): Observable<any> {
    return this._http.put (`http://localhost:3000/employees/${id}`, data);
  }
  private formData: any;

  setFormData(data: any): void {
    this.formData = data;
  }

  getFormData(): any {
    return this.formData;
  }

  
  
}
  

