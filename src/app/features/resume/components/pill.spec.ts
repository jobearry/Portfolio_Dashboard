import { TestBed } from '@angular/core/testing';
import { Pill } from './pill';

describe('Pill', () => {
  it('renders the brand variant as a theme-aware tag', () => {
    const fixture = TestBed.createComponent(Pill);
    fixture.componentRef.setInput('label', 'Software Engineer');
    fixture.componentRef.setInput('variant', 'brand');
    fixture.componentRef.setInput('size', 'sm');
    fixture.detectChanges();

    const tag = fixture.nativeElement.querySelector('span') as HTMLSpanElement;
    expect(tag.textContent).toContain('Software Engineer');
    expect(tag.classList.contains('border-accent-brand/30')).toBe(true);
    expect(tag.classList.contains('bg-accent-brand/10')).toBe(true);
    expect(tag.classList.contains('text-accent-brand')).toBe(true);
  });
});
