import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-block',
  imports: [CommonModule],
  templateUrl: './block-container.html',
})
export class BlockComponent {
  @Input() class: string = '';
  @Input() title: string = '';
  @Input() description: string = '';

}
