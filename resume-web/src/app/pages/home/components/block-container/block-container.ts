import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Spinner } from '../../../../components/spinner';

@Component({
  selector: 'app-block',
  imports: [CommonModule, Spinner],
  templateUrl: './block-container.html',
})
export class BlockComponent {
  @Input() class: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() loading: boolean = false;
}
