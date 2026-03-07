import { Component, HostListener, OnInit } from '@angular/core';
import { MAIN_BLOCK_CONTENT, SIDE_BLOCK_CONTENT } from './constants/home.constants';
import { LucideAngularModule } from "lucide-angular";
import { DynamicHostComponent } from "./components/host";
import { BlockComponent } from './components/block-container/block-container';
import { Heatmap } from "../../features/github/components/heatmap";
import { Store } from '@ngrx/store';
import { State } from '../../shared/store.provider';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Spinner } from "../../components/spinner";
import { GithubAPIActions } from '../../features/github/store/github.action';

@Component({
  selector: 'app-home',
  imports: [
    BlockComponent, LucideAngularModule, CommonModule,
    DynamicHostComponent,
    Heatmap,
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
  ngOnInit(): void {
    this.isDesktop = window.innerWidth >= 768
  }
}
