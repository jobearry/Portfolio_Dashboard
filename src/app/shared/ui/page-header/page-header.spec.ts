import { TestBed } from '@angular/core/testing';
import { PageHeader } from './page-header';

describe('PageHeader', () => {
  function render(eyebrow: string, title: string, description?: string): HTMLElement {
    const fixture = TestBed.createComponent(PageHeader);
    fixture.componentRef.setInput('eyebrow', eyebrow);
    fixture.componentRef.setInput('title', title);

    if (description !== undefined) {
      fixture.componentRef.setInput('description', description);
    }

    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('renders the eyebrow, title, and description', () => {
    const element = render('Career', 'Experience timeline', 'Roles and projects.');

    expect(element.querySelector('span')?.textContent).toContain('Career');
    expect(element.querySelector('h2')?.textContent).toContain('Experience timeline');
    expect(element.querySelector('p')?.textContent).toContain('Roles and projects.');
  });

  it('omits the description element when it is not provided', () => {
    const element = render('Writing', 'Notes from the journey');

    expect(element.querySelector('h2')?.textContent).toContain('Notes from the journey');
    expect(element.querySelector('p')).toBeNull();
  });
});
