import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService} from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-navigation-menu',
  standalone: true,
  imports: [MenuModule, ToastModule, ButtonModule],
  templateUrl: './navigation-menu.component.html',
  styleUrl: './navigation-menu.component.css',
  providers:[MessageService]
})
export class NavigationMenuComponent {

  items: MenuItem[] = [
    {
      label:'Home',
      icon:'pi pi-home',
      command: ()=>{
        this.router.navigate(['/']);
        }
    },
    {
      label:'RxList',
      icon:'pi pi-book',
      command: ()=>{
        this.router.navigate(['/list']);
      }
    },
    {
      label:'RxMap',
      icon:'pi pi-google',
      command: ()=>{
        this.router.navigate(['/map']);
      }
    },
    {
      label:'About',
      icon:'pi pi-info-circle',
      command: ()=>{
        this.router.navigate(['/about']);
      }
    },
  ];


  constructor(public router:Router) {}
}
