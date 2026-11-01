import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Spinner } from '../../../../components/spinner';

@Component({
  selector: 'app-block',
  imports: [CommonModule, Spinner],
  templateUrl: './block-container.html',
})
export class BlockComponent {
  @Input() class = '';
  @Input() title = '';
  @Input() description = '';
  @Input() loading = false;
}
