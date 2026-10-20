import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { UserMenu } from './user-menu';

describe('UserMenu', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserMenu],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  afterEach(() => {
    document.documentElement.className = '';
  });

  function create() {
    const fixture = TestBed.createComponent(UserMenu);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const trigger = element.querySelector('button[aria-haspopup="menu"]') as HTMLButtonElement;

    return { fixture, element, trigger };
  }

  it('opens the menu from the trigger', () => {
    const { fixture, element, trigger } = create();

    trigger.click();
    fixture.detectChanges();

    expect(element.querySelector('[role="menu"]')).toBeTruthy();
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
  });

  it('switches the theme, then closes the menu', () => {
    const { fixture, element, trigger } = create();
    trigger.click();
    fixture.detectChanges();

    const themeItem = element.querySelector(
      '[role="menu"] button[role="menuitem"]',
    ) as HTMLButtonElement;
    expect(themeItem.textContent).toContain('Switch to light mode');

    themeItem.click();
    fixture.detectChanges();

    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(element.querySelector('[role="menu"]')).toBeFalsy();
  });

  it('supports arrow navigation and Escape', async () => {
    const { fixture, element, trigger } = create();

    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    fixture.detectChanges();
    await Promise.resolve();

    const items = Array.from(element.querySelectorAll<HTMLElement>('[role="menuitem"]'));
    expect(document.activeElement).toBe(items[0]);

    items[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    expect(document.activeElement).toBe(items[1]);

    items[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();

    expect(element.querySelector('[role="menu"]')).toBeFalsy();
    expect(document.activeElement).toBe(trigger);
  });

  it('closes on an outside pointerdown', () => {
    const { fixture, element, trigger } = create();
    trigger.click();
    fixture.detectChanges();

    document.body.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }));
    fixture.detectChanges();

    expect(element.querySelector('[role="menu"]')).toBeFalsy();
  });
});
