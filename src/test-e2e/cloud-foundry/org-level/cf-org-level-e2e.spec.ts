import { browser } from 'protractor';

import { e2e, E2ESetup } from '../../e2e';
import { E2EConfigCloudFoundry } from '../../e2e.types';
import { CFHelpers } from '../../helpers/cf-helpers';
import { ConsoleUserType } from '../../helpers/e2e-helpers';
import { CfOrgLevelPage } from './cf-org-level-page.po';
import { CFPage } from '../../po/cf-page.po';
import { SideNavMenuItem } from '../../po/side-nav.po';
import { CfTopLevelPage } from '../cf-level/cf-top-level-page.po';
import { ListComponent } from '../../po/list.po';

describe('CF - Org Level - ', () => {

  let orgPage: CfOrgLevelPage;
  let defaultCf: E2EConfigCloudFoundry;

  function testBreadcrumb() {
    orgPage.breadcrumbs.waitUntilShown();
    orgPage.breadcrumbs.getBreadcrumbs().then(breadcrumbs => {
      expect(breadcrumbs.length).toBe(1);
      expect(breadcrumbs[0].label).toBe(defaultCf.name);
    });
    expect(orgPage.header.getTitleText()).toBe(defaultCf.testOrg);
  }

  function testTabs() {
    orgPage.goToSpacesTab();
    orgPage.goToUsersTab();
    orgPage.goToSummaryTab();
  }

  function navToPage() {
    const page = new CFPage();
    page.sideNav.goto(SideNavMenuItem.CloudFoundry);
    CfTopLevelPage.detect().then(cfPage => {
      cfPage.waitForPageOrChildPage();
      cfPage.loadingIndicator.waitUntilNotShown();
      cfPage.goToOrgTab();

      // Find the Org and click on it
      const list = new ListComponent();
      list.cards.getCardsMetadata().then(cards => {
        const card = cards.find(c => c.title === defaultCf.testOrg);
        expect(card).toBeDefined();
        card.click();
      });
      CfOrgLevelPage.detect().then(o => {
        orgPage = o;
        orgPage.waitForPageOrChildPage();
        orgPage.loadingIndicator.waitUntilNotShown();
      });
    });
  }

  beforeAll(() => {
    defaultCf = e2e.secrets.getDefaultCFEndpoint();
    e2e.setup(ConsoleUserType.admin)
      .clearAllEndpoints()
      .registerDefaultCloudFoundry()
      .connectAllEndpoints(ConsoleUserType.admin)
      .connectAllEndpoints(ConsoleUserType.user);
  });

  describe('As Admin', () => {
    beforeAll(() => {
      e2e.setup(ConsoleUserType.admin)
      .loginAs(ConsoleUserType.admin);
    });

    describe('Basic Tests - ', () => {
      beforeEach(navToPage);

      it('Breadcrumb', testBreadcrumb);

      it('Walk Tabs', testTabs);

    });

  });

  describe('As User', () => {
    beforeAll(() => {
      e2e.setup(ConsoleUserType.user)
      .loginAs(ConsoleUserType.user);
    });

    describe('Basic Tests - ', () => {
      beforeEach(navToPage);

      it('Breadcrumb', testBreadcrumb);

      it('Walk Tabs', testTabs);

    });
  });

});
