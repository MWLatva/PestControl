import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DEFAULT_PRESCRIPTION, Prescription } from '../../models/prescription.model';
import { DEFAULT_MEDLOCATION, MedLocation } from '../../models/medLocation.model';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { PrescriptionService } from '../../services/prescription.service';
import { CommonModule } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MapComponent } from '../map/map.component';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    ButtonModule,
    TableModule,
    DropdownModule,
    CommonModule,
    FormsModule,
    MapComponent
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
  providers: [PrescriptionService],
})
// export class HomepageComponent{}
export class HomepageComponent implements OnInit {
  constructor(private prescriptionService: PrescriptionService, private messageService:MessageService) {}

  prescriptions$: Observable<Prescription[]> = this.prescriptionService.prescriptions$;

  selected_drug: Prescription = DEFAULT_PRESCRIPTION;

  drop_down_options: Prescription[] = [
    { name: 'Ibuprofen', price: 9.99 },
    { name: 'asbestos', price: 0.0 },
  ];

  stac: Prescription[] = [];

  location_options: MedLocation[] = [];
  selected_location: MedLocation = DEFAULT_MEDLOCATION;

  ngOnInit() {
    this.drop_down_options = this.prescriptionService.getDrugs();
    this.selected_drug = {name: "Select...", price: 4.20};

  }

  addToList() {
    if (this.selected_drug.name != "Select...") {
      
      // Get locations for the selected drug
      this.prescriptionService.getLocations(this.selected_drug.name).subscribe(locations => {
        this.location_options = locations;
      });
      
      // Ensure the stac only contains unique prescriptions
      if (!this.stac.some(drug => drug.name === this.selected_drug.name)) {
        this.stac.push({name: this.selected_drug.name, price: 4.2}); //...this.table,
      }
    }
  }

  addPrescription() {
    if (this.selected_drug != DEFAULT_PRESCRIPTION && this.selected_drug.name != "Select..."){
      console.log({name:this.selected_drug.name, price: this.selected_drug.price, location:this.selected_location});
      this.prescriptionService.addPrescription({name:this.selected_drug.name, price: this.selected_drug.price, location:this.selected_location});
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Prescription added'});
      this.selected_drug = {name: "Select...", price: 4.20};
      this.selected_location = DEFAULT_MEDLOCATION;
    }
    else 
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Please select a prescription'});
  }
  removePrescription(name: string) {
    this.prescriptionService.removePrescription(name);
  }

  drugChange(event: any) {
    let drug = event.value;
    // this.selected_drug = event.value;
    if(drug.name != "Select..."){
      this.prescriptionService.onPrescriptionsChange.next(drug);
      this.addToList();
    }

  }
}
