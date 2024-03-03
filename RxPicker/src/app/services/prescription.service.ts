import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { Prescription } from '../models/prescription.model';
import { MedLocation } from '../models/medLocation.model';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  
  locations$:Observable<MedLocation[]> = new Observable<MedLocation[]>();

  prescriptions$:BehaviorSubject<Prescription[]> = new BehaviorSubject<Prescription[]>([]);

  onPrescriptionsChange:Subject<Prescription> = new Subject<Prescription>();

  constructor(private http:HttpClient) {
    var storage = localStorage.getItem("prescriptions")
    let storedData:Prescription[] = []
    if (storage!=null)
      storedData = JSON.parse(storage);
    
    if(storedData.length!=0)
      this.prescriptions$.next(storedData)
   }
  // [values]="(locations$ | async) ?? []"

  getLocations(prescription:string) : Observable<MedLocation[]> {
   return this.http.get<MedLocation[]>('http://127.0.0.1:5000/search_prescription/'+prescription, {responseType:"json"});
  }

  getDrugs(): Prescription[] {
    let drugs: Prescription[] = [{name: "if u see this its broken", price: 999}];
    this.http.get<string[]>('http://127.0.0.1:5000/prescription', {responseType:"json"}).pipe(
      tap(names=>{
        for (let i = 0; i < names.length; i++) 
        drugs[i] = {name: names[i], price: 4.20};
      })
    ).subscribe();
    return drugs;
  }

  getPrescriptions() {
    var drugs =  localStorage.getItem('prescriptions');
    let prescriptions:Prescription[] = []
      if(drugs==null){
        prescriptions = []
      }
      else {
        prescriptions = JSON.parse(drugs);
      }
      //this.prescriptions$.next(prescriptions);
      return prescriptions;
  }

  setPrescriptions(drugs: Prescription[]){
    localStorage.setItem('prescriptions', JSON.stringify(drugs));
    this.prescriptions$.next(drugs)
    return;
  }

  addPrescription(drug: Prescription){
    var drugs = localStorage.getItem('prescriptions');
    let prescriptions: Prescription[] = [];
    if (drugs == null) {
      prescriptions = [];
    } else {
      prescriptions = JSON.parse(drugs);
    }
    prescriptions.push(drug);
    localStorage.setItem('prescriptions',JSON.stringify(prescriptions));
    this.prescriptions$.next(prescriptions);
  }

  removePrescription(name: string) {
    var drugs = localStorage.getItem('prescriptions');
    let prescriptions: Prescription[] = [];
    if (drugs == null) {
      return;
    } else {
      prescriptions = JSON.parse(drugs);
    }
    //remove any prescriptions with name of specified removal
    let prescrUpdate : Prescription[] = prescriptions.filter(function (p) {
      return p.name !== name;
    });
    localStorage.setItem('prescriptions',JSON.stringify(prescrUpdate));
    this.prescriptions$.next(prescrUpdate);
  }


  getMap(rx:string):Observable<string>{
    return this.http.get<string>('http://127.0.0.1:5000/map/'+rx);
  }
}
