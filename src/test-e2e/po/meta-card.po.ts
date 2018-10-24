import { browser, by, ElementFinder, promise, protractor } from 'protractor';
import { By } from 'selenium-webdriver';

import { Component } from './component.po';
import { MenuComponent } from './menu.po';

const until = protractor.ExpectedConditions;

export enum MetaCardTitleType {
  /**
   * Title is in a normal mat-card-title
   */
  MAT_CARD = 'mat-card-title',
  /**
   * Title text is in a custom div (used to inline title with action menu)
   */
  CUSTOM = '.meta-card__title'
}

export interface MetaCardItem {
  key: promise.Promise<string>;
  value: promise.Promise<string>;
}

export class MetaCard extends Component {

  titleBy: By;

  constructor(private elementFinder: ElementFinder, titleType: MetaCardTitleType) {
    super(elementFinder);
    this.titleBy = by.css(titleType);
  }

  getTitleElement() {
    return this.elementFinder.element(this.titleBy);
  }

  waitForTitle(title: string): promise.Promise<any> {
    return browser.wait(until.textToBePresentInElement(this.getTitleElement(), title), 5000);
  }

  getTitle(): promise.Promise<string> {
    return this.getTitleElement().getText();
  }

  openActionMenu(): promise.Promise<MenuComponent> {
    return this.elementFinder.element(by.css('.meta-card__header__button')).click().then(() => {
      // Wait until menu is shown
      const menu = new MenuComponent();
      menu.waitUntilShown();
      return menu;
    });
  }

  getMetaCardItems(): promise.Promise<MetaCardItem[]> {
    const metaCardRows = this.elementFinder.all(by.css('.meta-card-item-row'));
    return metaCardRows.then((rows: ElementFinder[]) => rows.map(row => ({
      key: row.element(by.css('.meta-card-item__key')).getText(),
      value: row.element(by.css('.meta-card-item__value')).getText()
    })));
  }

  click() {
    return this.elementFinder.click();
  }

}
