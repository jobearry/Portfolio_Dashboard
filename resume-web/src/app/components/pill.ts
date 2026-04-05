import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pill',
  imports: [],
  template: `
    <span role="status" [attr.aria-label]="label" [class]="classes" [style]="style">{{label}}</span>
  `,
  styles: ``,
})
export class Pill {
  @Input() label: string = '';
  @Input() variant: 'neutral' | 'primary' | 'success' | 'warning' | 'danger' = 'neutral';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  get classes(): string {
    let base = 'inline-flex items-center font-medium rounded-full';
    if (this.size === 'sm') base += ' px-2 py-0.5 text-xs';
    else if (this.size === 'lg') base += ' px-4 py-1.5 text-sm';
    else base += ' px-3 py-1 text-sm';

    switch (this.variant) {
      case 'primary':
        base += ' bg-blue-100 text-blue-800';
        break;
      case 'success':
        base += ' bg-green-100 text-green-800';
        break;
      case 'warning':
        base += ' bg-yellow-100 text-yellow-800';
        break;
      case 'danger':
        base += ' bg-red-100 text-red-800';
        break;
      default:
        base += ' bg-gray-100 text-gray-800';
    }

    return base;
  }

  get style(): string {
    let bg = 'var(--color-muted)';
    let fg = 'var(--color-muted-foreground)';

    switch (this.variant) {
      case 'primary':
        bg = 'var(--color-primary)';
        fg = 'var(--color-primary-foreground)';
        break;
      case 'success':
        bg = 'var(--color-accent)';
        fg = 'var(--color-accent-foreground)';
        break;
      case 'warning':
        bg = 'var(--color-secondary)';
        fg = 'var(--color-secondary-foreground)';
        break;
      case 'danger':
        bg = 'var(--color-destructive)';
        fg = 'var(--color-popover-foreground)';
        break;
      default:
        break;
    }

    return `background: ${bg}; color: ${fg}; border: 1px solid var(--color-border);`;
  }
}
