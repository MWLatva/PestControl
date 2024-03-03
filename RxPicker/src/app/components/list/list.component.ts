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
  constructor(private prescriptionService: PrescriptionService) {}

  prescriptions$: Observable<Prescription[]> = this.prescriptionService.prescriptions$; 

  removePrescription(name: string) {
    this.prescriptionService.removePrescription(name);
  }
}