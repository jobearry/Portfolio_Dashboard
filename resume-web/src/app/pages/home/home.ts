import { Component } from '@angular/core';
import { SIDE_BLOCK_CONTENT } from './constants/home.constants';
import { Block } from "./components/block-container/block-container";
import { LucideAngularModule } from "lucide-angular";
import { Profile } from "./components/profile/profile";
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    Block, LucideAngularModule,
    NgComponentOutlet
],
  templateUrl: './home.html',
})
export class Home {
  sideblock = SIDE_BLOCK_CONTENT;
}
