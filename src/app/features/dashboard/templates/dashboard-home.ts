import { Component, OnInit } from '@angular/core';
import { Overview } from '../components/overview/overview';

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
