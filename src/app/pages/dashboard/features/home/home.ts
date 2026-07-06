import { Component, OnInit } from '@angular/core';
import { Maintenance } from "../../../../components/maintenance.ts/maintenance";

@Component({
  selector: 'app-home',
  imports: [Maintenance],
  templateUrl: './home.html',
  styles: ``,
})
export class Home implements OnInit{
  async ngOnInit(): Promise<void> {
  }
}
