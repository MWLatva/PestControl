import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Prescription } from '../../models/prescription.model';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [ButtonModule, TableModule, DropdownModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
// export class HomepageComponent{}
export class HomepageComponent implements OnInit{
  drug_names!: Prescription[];

  selected_drug: Prescription | undefined;

  ngOnInit() {
    this.drug_names = [{name:"Ibuprofen", price: 9.99}, {name: "asbestos", price: 0.00}];
  }
}
