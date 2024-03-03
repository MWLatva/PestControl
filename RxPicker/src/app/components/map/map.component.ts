import { Component, OnInit, ViewChild, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { GoogleMapsModule, MapMarker, MapInfoWindow, GoogleMap, MapAdvancedMarker } from '@angular/google-maps';
import { PrescriptionService } from '../../services/prescription.service';
import { Observable } from 'rxjs';
import { Prescription } from '../../models/prescription.model';
import { MedLocation } from '../../models/medLocation.model';
import { BrowserModule, DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import { SafePipe } from '../../app.component';
import { SafeHtmlPipe } from 'primeng/menu';


declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  imports: [
    MapInfoWindow,
    MapMarker,
    GoogleMap,
    GoogleMapsModule,
    CommonModule,
    MapAdvancedMarker,
  ],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MapComponent implements OnInit {
  @ViewChild('workPlease', { static: true }) simple:any;

  

  pathCircle = google.maps.SymbolPath.CIRCLE;
  zoom = 12;
  center: google.maps.LatLngLiteral = { lat: 40.6012728, lng: -75.3598203 };
  prescriptions = [];
  mapOptions: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  };

  map = google.maps.Maps;

  markers: {
    position: { lat: number; lng: number };
    label: { color: string; text: string };
    title: string;
    options: { animation: google.maps.Animation };
    infoContent: string;
  }[] = [];

  mapUrl!: SafeHtml;
  constructor(
    private prescriptionService: PrescriptionService,
    private sanitzer: DomSanitizer
  ) {}

  ngOnInit() {
    this.center = { lat: 40.6012728, lng: -75.3598203 }; // Default center
    this.fetchLocations("none");
    this.prescriptionService.onPrescriptionsChange.subscribe((prescription) => {
      this.fetchLocations(prescription.name);
    });

  }

  fetchLocations(drug:string) {
    this.prescriptionService.getMap(drug).subscribe((map) => {
      this.mapUrl = this.sanitzer.bypassSecurityTrustHtml(map);
      //this.simple.srcdoc = this.mapUrl;
    });

  }

  buildContent(location: MedLocation, totalLocations: number) {
    const color = this.getColorForRank(location.price, totalLocations); // Assuming you want to color by price
    return `<div style="color: ${color};">${
      location.name
    } - $${location.price.toFixed(2)}</div>`; // Simplified for example
  }

  getColorForRank(price: number, total: number) {
    // Modify this function based on how you want to determine color
    const third = total / 3;
    const twoThirds = 2 * third;
    if (price <= third) return 'rgb(76, 175, 80)';
    else if (price <= twoThirds) return 'rgb(255, 152, 0)';
    else return 'rgb(244, 67, 54)';
  }

  addMarker() {}

  logCenter() {}

  zoomOut() {}

  zoomIn() {}

  openInfo(marker: any, pass: string) {}
}