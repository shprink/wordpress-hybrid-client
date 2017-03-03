import {
  Component, Input, ViewChild, ViewContainerRef,
  ComponentFactoryResolver, ComponentRef, ChangeDetectionStrategy
} from '@angular/core';

import { ComponentsMapping } from './../index';

/*
  Generated class for the List component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'list',
  templateUrl: 'list.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {
  @Input() type: string;
  @Input() options: any;
  @Input() list: Array<any>;
  @ViewChild('dynamicComponentTarget', { read: ViewContainerRef })
  dynamicComponentTarget: any;
  componentRef: ComponentRef<any>;

  constructor(
    public componentFactoryResolver: ComponentFactoryResolver
  ) {
  }

  ngOnInit() {
    console.debug('[LIST] ngOnInit')
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.getComponent());
    this.dynamicComponentTarget.clear();
    this.componentRef = this.dynamicComponentTarget.createComponent(componentFactory);
    this.updateRefs();
  }

  ngOnChanges(changes: any) {
    if (!this.componentRef) {
      return;
    }
    console.debug('[LIST] ngOnChanges')
    this.updateRefs();
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  updateRefs() {
    (<any>this.componentRef.instance).type = this.type;
    (<any>this.componentRef.instance).options = this.options;
    (<any>this.componentRef.instance).list = this.list;
  }

  getComponent(): any {
    const { component = '' } = this.options || {};
    const componentName = component || `${this.type}-list`;
    const Component = ComponentsMapping[componentName];
    if (Component) return Component;

    throw new Error(`The component "${componentName}" does not exists`);
  }

}
