import { browser, by, element, promise, ExpectedConditions } from 'protractor';

export class AppPage {
  EC = ExpectedConditions;

  navigateTo() {
    return browser.get('/');
  }

  getTitleText() {
    return element(by.css('mat-toolbar span')).getText();
  }

  getNotes() {
    return element.all(by.css('.mat-card'));
  }

  getLatestCardTitle(): promise.Promise<string> {
    return element.all(by.css('.mat-card-title')).first().getText(); // returns in reverse order
  }

  getNote(idx: number = 0) {
    return this.getNotes().get(idx);
  }

  getNoteTitle(idx: number = 0) {
    return element.all(by.css('.mat-card-title')).get(idx).getText();
  }

  getNoteContent(idx: number = 0) {
    return element.all(by.css('.dashboard-note-content')).get(idx).getText();
  }

  async editNote(title: string, content: string, idx: number = 0) {
    const note = await this.getNote(idx);
    // browser.wait(ExpectedConditions.elementToBeClickable(note), 1000);
    // browser.sleep(1000);
    note.click().then(_ => {
      element(by.name('title')).sendKeys(title).then( __ => {
        element(by.name('content')).sendKeys(content).then( ___ => {
          element(by.css('button.submit span')).click();
        });
      });
    });
  }

  addNote(title: string, content: string) {
    element(by.css('button.mat-fab')).click();
    element(by.name('title')).sendKeys(title);
    element(by.name('content')).sendKeys(content);
    element(by.css('button.submit span')).click();
  }

  deleteNote(idx: number = 0) {
    element.all(by.css('.delete-button')).get(idx).click();
  }
}
