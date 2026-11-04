import { Component, Input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideGithub } from '@ng-icons/lucide';
import { BlockComponent } from '../../pages/home/components/block-container/block-container';
import { GithubRepo } from '../../core';
import { Card } from '../../components/card';

@Component({
  selector: 'app-github',
  imports: [BlockComponent, NgIcon, Card],
  providers: [provideIcons({ lucideGithub })],
  templateUrl: './github.html',
  styles: ``,
})
export class Github {
  @Input() loading = false;
  @Input() data: GithubRepo[] = [];
}
