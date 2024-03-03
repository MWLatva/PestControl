import { Component, OnInit, ViewChild, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { GoogleMapsModule, MapMarker } from '@angular/google-maps';
import { PrescriptionService } from '../../services/prescription.service';
import { Observable } from 'rxjs';
import { Prescription } from '../../models/prescription.model';

declare var google: any; // Add this line if google is not recognized
@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    GoogleMapsModule // Import GoogleMapsModule here
  ]
})

export class MapComponent implements OnInit {
  // @ViewChild(MapInfoWindow, { static: false })
  // infoWindow!: MapInfoWindow;
  infoContent='';
  center: google.maps.LatLngLiteral = { lat: 40.6012728, lng: -75.3598203 };
  zoom = 12;
  mapOptions: google.maps.MapOptions = {
    mapId: 'DEMO_MAP_ID',
    zoomControl: true,
    scrollwheel: true,
  };
  prescriptions: any[] = [];
  prescriptions$: Observable<Prescription[]> =
    this.prescriptionService.getLocations('Ibuprofen');
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  google = google; // Make google object available in the template

  constructor(
    private http: HttpClient,
    private prescriptionService: PrescriptionService
  ) {}

  ngOnInit(): void {
    this.fetchPrescriptions();
  }

  fetchPrescriptions(): void {
    this.http
      .get('/search_prescription/Ibuprofen?sort=price&radius=25')
      .subscribe((data: any) => {
        this.prescriptions = data.map((prescription: any, index: number) => ({
          ...prescription,
          lat: parseFloat(prescription.lat), // Ensure latitude is a number
          lng: parseFloat(prescription.lng), // Ensure longitude is a number
          rank: index + 1,
          color: this.getColorForRank(index + 1, data.length),
        }));
      });
  }

  getColorForRank(rank: number, total: number): string {
    const third = total / 3;
    const twoThirds = 2 * third;

    if (rank <= third) {
      return '#4caf50'; // Green
    } else if (rank <= twoThirds) {
      return '#ff9800'; // Orange
    } else {
      return '#f44336'; // Red
    }
  }

  openInfo(marker: MapMarker, content: string) {
    this.infoContent = content;
    this.infoWindow.open(marker);
  }
}