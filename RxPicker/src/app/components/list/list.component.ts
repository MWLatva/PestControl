import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Prescription } from '../../models/prescription.model';
import { PrescriptionService } from '../../services/prescription.service'
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-list',
    standalone: true,
    imports: [TableModule, CommonModule, ButtonModule],
    templateUrl: './list.component.html',
    styleUrl: './list.component.css',
    providers: [PrescriptionService],
  })
export class ListComponent {
  // [values]="(locations$ | async) ?? []"
  constructor(private prescriptionService: PrescriptionService) {}

  // values: Prescription[] = [
    
  // ];

  prescriptions$: Observable<Prescription[]> = this.prescriptionService.prescriptions$; 

  ngOnInit() {
    //this.prescriptionService.getPrescriptions();
    //this.values = this.prescriptionService.getPrescriptions();
    //{name:"Ibuprofen", price: 9.99}, {name: "asbestos", price: 0.00}
  }
  removePrescription(name: string) {
    this.prescriptionService.removePrescription(name);
  }

}