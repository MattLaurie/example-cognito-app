import { CognitoAppPage } from './app.po';

describe('cognito-app App', () => {
  let page: CognitoAppPage;

  beforeEach(() => {
    page = new CognitoAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
