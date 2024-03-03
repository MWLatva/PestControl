import { Component, CUSTOM_ELEMENTS_SCHEMA, Pipe, PipeTransform} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { GoogleMapsModule } from '@angular/google-maps';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    HeaderComponent, 
    ButtonModule, 
    TableModule, 
    MenuModule, 
    MenubarModule, 
    GoogleMapsModule,
    DropdownModule,
    ToastModule,
    FormsModule
  ],
  templateUrl: './app.component.html',
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'RxPicker';
}

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url:string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
