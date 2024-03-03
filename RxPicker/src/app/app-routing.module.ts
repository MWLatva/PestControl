import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { RxSelectComponent } from './components/rx-select/rx-select.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomepageComponent},
  { path: 'select', pathMatch: 'full', component: RxSelectComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

