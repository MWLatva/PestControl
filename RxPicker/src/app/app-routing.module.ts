import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/homepage.html'

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }




import { HomePageComponent } from './components/home-page/home-page.component'
import { TracerPageComponent } from './components/tracer-page/tracer-page.component'
import { SensitivityPageComponent } from './components/sensitivity-page/sensitivity-page.component'
import { AboutPageComponent } from './components/about-page/about-page.component'

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomePageComponent},
  { path: 'tracer', component: TracerPageComponent},
  { path: 'sensitivity', component: SensitivityPageComponent},
  { path: 'about', component: AboutPageComponent}

];


