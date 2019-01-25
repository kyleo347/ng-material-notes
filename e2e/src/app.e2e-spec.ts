import { AppPage } from './app.po';
import { ExpectedConditions, browser } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
    browser.sleep(1000);
  });

  it('should display app title', () => {
    expect(page.getTitleText()).toEqual('notes');
  });

  it('should load demo notes', () => {
    expect(page.getNotes().count()).toEqual(3);
  });

  it('should edit a note', () => {
    const title = 'edited title';
    const content = 'edited content';
    page.editNote(title, content).then( _ => {
      // browser.wait(ExpectedConditions.textToBePresentInElement(page.getNote(), title), 3000);
      browser.sleep(1000);
      // browser.waitForAngular();
      expect(page.getNoteTitle()).toContain(title);
      expect(page.getNoteContent()).toContain(content);
    });
  });

  it('should add a note', () => {
    const title = 'testtitle';
    const content = 'testcontent';
    page.addNote(title, content);
    expect(page.getNotes().count()).toEqual(4);
    expect(page.getLatestCardTitle().then(text => text.trim())).toEqual(title);
  });

  it('should delete a note', () => {
    page.getNotes().count().then(count => {
      if (count > 0) {
        page.deleteNote();
        expect(page.getNotes().count()).toEqual(count - 1);
      }
    });
  });
});
