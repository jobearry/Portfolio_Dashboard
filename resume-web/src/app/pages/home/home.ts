import { Component } from '@angular/core';
import { MAIN_BLOCK_CONTENT, SIDE_BLOCK_CONTENT } from './constants/home.constants';
import { Block } from "./components/block-container/block-container";
import { LucideAngularModule } from "lucide-angular";
import { DynamicHostComponent } from "./components/host";

@Component({
  selector: 'app-home',
  imports: [
    Block, LucideAngularModule,
    DynamicHostComponent
],
  templateUrl: './home.html',
})
export class Home {
  sideblock = SIDE_BLOCK_CONTENT;
  mainblock = MAIN_BLOCK_CONTENT;
}
