import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prescription } from '../models/prescription.model';
import { MedLocation } from '../models/medLocation.model';
import { deserialize } from 'v8';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  locations$:Observable<MedLocation[]> = new Observable<MedLocation[]>();

  prescriptions$:Observable<Prescription[]> = new Observable<Prescription[]>();

  constructor(private http:HttpClient) { }
  

  getLocations(prescription:string) : Observable<MedLocation[]> {
   return this.http.get<MedLocation[]>('127.0.0.1:5000/search_prescription/'+prescription);
  }

  getPrescriptions(): Observable<Prescription[]>{
    var drugs =  localStorage.getItem('prescriptions');
    let prescriptions:any = []
      if(drugs==null){
        prescriptions = []
      }
      else {
        prescriptions = JSON.parse(drugs);
      }
    }
  }

  setPrescriptions(): Observable<Prescription[]>{
    
  }

}
