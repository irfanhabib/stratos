import { by, element, ElementFinder } from 'protractor';
import { browser, promise } from 'protractor';
import { protractor } from 'protractor/built';

import { Component } from './component.po';


const until = protractor.ExpectedConditions;

/**
 * Page Object for snack bar component
 */
export class SnackBarComponent extends Component {

  constructor() {
    super(element(by.css('.mat-simple-snackbar')));
  }

  private getButton(): ElementFinder {
    return this.locator.element(by.tagName('button'));
  }

  close(): promise.Promise<void> {
    return this.getButton().click();
  }

  safeClose(): promise.Promise<void> {
    return this.getButton().isPresent().then(isPresent => {
      return isPresent ? this.getButton().click() : null;
    });
  }

  getButtonText(): promise.Promise<string> {
    return this.locator.element(by.tagName('button')).getText();
  }

  hasMessage(expected: string): promise.Promise<boolean> {
    return this.locator.getText().then(actual => {
      // The text has the button text as well - so just check that the text starts with expected text
      return actual.startsWith(expected);
    });
  }

  getMessage(): promise.Promise<string> {
    return this.locator.getText();
  }

  // Wait for snackbar with given message
  waitForMessage(message): promise.Promise<void> {
    const mesgElm = element(by.cssContainingText('.mat-simple-snackbar', message));
    return browser.wait(until.presenceOf(mesgElm), 5000,
      'Snackbar: ' + message + ' taking too long to appear in the DOM').then(() => {
        return browser.driver.sleep(100);
      });
  }
}
