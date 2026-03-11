import { Component, Input } from '@angular/core';
import { BlockComponent } from "../../../pages/home/components/block-container/block-container";
import { LucideAngularModule } from "lucide-angular";
import { GithubRepo } from '../types/github.type';
import { Card } from '../../../components/card';

@Component({
  selector: 'app-github',
  imports: [BlockComponent, LucideAngularModule, Card],
  templateUrl: './github.html',
  styles: ``,
})
export class Github {
  @Input() loading: boolean = false;
  @Input() data: GithubRepo[] = [];
}
