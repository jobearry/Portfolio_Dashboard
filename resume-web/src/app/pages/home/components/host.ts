import { Component, Input, OnChanges, SimpleChanges, Type, ViewContainerRef, ComponentRef, OnDestroy, inject } from '@angular/core';

@Component({
  selector: 'app-host',
  template: '' // nothing rendered here; child component is created in the view container
})
export class DynamicHostComponent implements OnChanges, OnDestroy {
  private vcr = inject(ViewContainerRef);

  @Input() component!: Type<object>;
  @Input() inputs?: Record<string, unknown>;
  private compRef?: ComponentRef<object>;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['component'] && this.component) {
      this.vcr.clear();
      this.compRef = this.vcr.createComponent(this.component);
      this.applyInputs();
    } else if (changes['inputs']) {
      this.applyInputs();
    }
  }

  private applyInputs() {
    if (!this.compRef || !this.inputs) return;
    Object.assign(this.compRef.instance, this.inputs);
    this.compRef.changeDetectorRef.detectChanges();
  }

  ngOnDestroy() {
    this.compRef?.destroy();
  }
}
