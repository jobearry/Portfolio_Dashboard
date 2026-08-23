import { Component, OnInit } from '@angular/core';
import { Maintenance } from "../../../../components/maintenance.ts/maintenance";
import { Overview } from "../portfolio/pages/overview/overview";

@Component({
  selector: 'app-dashboard-home',
  imports: [Overview],
  templateUrl: './dashboard-home.html',
  styles: ``,
})
export class DashboardHome implements OnInit{
  async ngOnInit(): Promise<void> {
  }
}
