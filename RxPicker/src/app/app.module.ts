import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { RxSelectComponent } from './components/rx-select/rx-select.component';

@NgModule({
  declarations: [AppComponent, HomepageComponent, RxSelectComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [
    //provideHttpClient(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
