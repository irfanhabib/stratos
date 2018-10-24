import { by, ElementFinder, promise, element } from 'protractor';

import { Component } from './component.po';
import { BooleangIndicatorComponent } from './boolean-indicator.po';

export class MetaDataItemComponent extends Component {

  static withLabel(locator: ElementFinder, label: string): MetaDataItemComponent {
    return new MetaDataItemComponent(locator.element(by.css(`app-metadata-item[label="${label}"]`)));
  }

  constructor(private elementFinder: ElementFinder) {
    super(elementFinder);
  }

  public getLabel(): promise.Promise<string> {
    return this.locator.element(by.css('.metadata-item__label')).getText();
  }

  public getValue(): promise.Promise<string> {
    return this.locator.element(by.css('.metadata-item__value')).getText();
  }

  public getBooleanIndicator(): BooleangIndicatorComponent {
    return new BooleangIndicatorComponent(this.locator.element(by.css('.metadata-item__value')));
  }

}
