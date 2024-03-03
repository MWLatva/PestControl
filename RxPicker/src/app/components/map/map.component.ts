import { Component, OnInit, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrescriptionService } from '../../services/prescription.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  imports: [
    CommonModule,
  ],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MapComponent implements OnInit {
  @ViewChild('workPlease', { static: true }) simple:any;

  mapUrl!: SafeHtml;
  constructor(
    private prescriptionService: PrescriptionService,
    private sanitzer: DomSanitizer
  ) {}

  ngOnInit() {
    this.fetchLocations("none");
    this.prescriptionService.onPrescriptionsChange.subscribe((prescription) => {
      this.fetchLocations(prescription.name);
    });

  }

  fetchLocations(drug:string) {
    this.prescriptionService.getMap(drug).subscribe((map) => {
      this.mapUrl = this.sanitzer.bypassSecurityTrustHtml(map);
    });

  }
}