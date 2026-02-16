import { Component, HostListener, OnInit } from '@angular/core';
import { MAIN_BLOCK_CONTENT, SIDE_BLOCK_CONTENT } from './constants/home.constants';
import { LucideAngularModule } from "lucide-angular";
import { DynamicHostComponent } from "./components/host";
import { BlockComponent } from './components/block-container/block-container';

@Component({
  selector: 'app-home',
  imports: [
    BlockComponent, LucideAngularModule,
    DynamicHostComponent
],
  templateUrl: './home.html',
})
export class Home implements OnInit {
  sideblock = SIDE_BLOCK_CONTENT;
  mainblock = MAIN_BLOCK_CONTENT;

  isDesktop = window.innerHeight >= 768;
  @HostListener('window:resize') onResize(){
    this.isDesktop = window.innerWidth >= 768
  }
  constructor(){}

  ngOnInit(): void {
    this.isDesktop = window.innerWidth >= 768
  }
}
