import { SnackbarPage } from './app.po';

describe('snackbar App', () => {
  let page: SnackbarPage;

  beforeEach(() => {
    page = new SnackbarPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
