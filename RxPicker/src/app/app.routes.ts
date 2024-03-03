import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { RxSelectComponent } from './components/rx-select/rx-select.component';
import { MapComponent } from './components/map/map.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'select', component: RxSelectComponent },
  { path: 'map', component: MapComponent }
];
