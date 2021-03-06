# Status Updates

Weekly status updates are published here.

## 19th October 2018

We are preparing for this month's 2.2.0 release which will be out towards the end of the month.

Highlights for this week:

- Extensions: Fix for side nav. Add initial docs [\#3140](https://github.com/cloudfoundry-incubator/stratos/pull/3140)
- User menu improvements [\#3136](https://github.com/cloudfoundry-incubator/stratos/pull/3136)
- Metrics: Show table of cell health state changes instead of chart [\#3135](https://github.com/cloudfoundry-incubator/stratos/pull/3135)
- Metrics: Update app instance cell data when scaling up [\#3133](https://github.com/cloudfoundry-incubator/stratos/pull/3133)
- Metrics: Ensure CF Cells info is shown for non cf admins [\#3121](https://github.com/cloudfoundry-incubator/stratos/pull/3121)
- Add 'type text to continue' to confirmation modal [\#3131](https://github.com/cloudfoundry-incubator/stratos/pull/3131)
- Delete App Stepper: Disable delete of routes and services that are bound to other app/s [\#3129](https://github.com/cloudfoundry-incubator/stratos/pull/3129)
- Endpoints Table: Only show 'Admin' check icon for cf endpoints [\#3132](https://github.com/cloudfoundry-incubator/stratos/pull/3132)


## 12th October 2018

The team have been preparing for and attending the CF Summit in Basel.

## 5th October 2018

The team have been preparing for the CF Summit in Basel next week.

Highlights for this week (continuing from last week):

- E2E Tests and Automation - Focusing on making the E2E tests more resilient to timing issues. 

- Metrics - Added Diego Cell to the App Instances table when metrics are available and added a Cell view which shows metrics for a given Diego cell.

Fixes:

- Ensure we handle orgs with no users [\#3098](https://github.com/cloudfoundry-incubator/stratos/pull/3098) - fixes a bug creating a space in a new org.

- Endpoint Registration: Only show SSO option for CF Endpoint type [#\3105](https://github.com/cloudfoundry-incubator/stratos/pull/3105)

## 28th September 2018

This week saw the release of 2.1.1 and an update 2.1.2. It was necessary to tag a 2.1.2 release to resolve a broken backend dependency that would affect users deploying via 'cf push'. You should use 2.1.2 and not 2.1.1. 

*2.1.2 Highlights*

- Fix go-flags dependency pinned version broken [\#3071](https://github.com/cloudfoundry-incubator/stratos/pull/3071)

- App wall filtering can stop working  with some filter combinations [\#3043](https://github.com/cloudfoundry-incubator/stratos/pull/3043)

- Can not connect a metrics endpoint [\#3035](https://github.com/cloudfoundry-incubator/stratos/issues/3035)

- Backend build issue due to the pinned commit for a dependency being removed [\#3060](https://github.com/cloudfoundry-incubator/stratos/pull/3060)

- Metrics: Wrong job can be matched up when there are multiple jobs [\#3057](https://github.com/cloudfoundry-incubator/stratos/pull/3057)


Highlights for this week (continuing from last week):

- Extensions - Work continues on adding extension points in the UI. Extensions is targeted for 2.2.0 in October.

- E2E Tests and Automation - Focusing on making the E2E tests more resilient to timing issues. 

- Metrics - Work to tidy up the existing Cloud Foundry Application metrics is complete.

## 21st September 2018

This week saw the release of 2.1.0 - the highlights are:

- Stratos frontend can be pre-built before pushing to Cloud Foundry to enable AOT and reduce push time
- SSO support refinements with the ability to now connect a Cloud Foundry endpoint using SSO in addition to SSO login to Straos itself
- Ability to specify manifest overrides when deploying an application
- Ability to optionally specify Client ID anc Client Secret when registering an endpoint
- Add ability to restage an application
- Endpoints list now shows logged in user's username and whether they're an admin
- Switched to new Stratos logo for login and about pages
- Backend improvements to make it easier for developers to develop with
- Security fixes

Full release information is available [here](https://github.com/cloudfoundry-incubator/stratos/releases/tag/2.1.0).

Highlights for this week (continuing from last week):

- Extensions - Work continues on adding extension points in the UI. Extensions is targeted for 2.2.0 in October.

- E2E Tests and Automation - Focusing on making the E2E tests more resilient to timing issues. We have also spent time getting the E2E tests to run against BrowserStack to allow us to automate testing of Stratos across multiple browser types/platforms.

- Metrics - Work to tidy up the existing Cloud Foundry Application metrics is complete.

- JSON Schema support for Service Instance binding - We have been working to update PR [#2997](https://github.com/cloudfoundry-incubator/stratos/pull/2997) to get this feature into Stratos.

Fixes/Misc:

- Fix app wall filtering issue [#3043](https://github.com/cloudfoundry-incubator/stratos/pull/3043)
- Fix for Connect button not being enabled when SSO is the default [#3004](https://github.com/cloudfoundry-incubator/stratos/pull/3004)
- Version number always reports 'dev' [#3001](https://github.com/cloudfoundry-incubator/stratos/pull/3001)
- Diagnostics does not show GitHub details when cloned via HTTPS [#3007](https://github.com/cloudfoundry-incubator/stratos/pull/3007)
- Fix for NULL Client Secret bug [#3015](https://github.com/cloudfoundry-incubator/stratos/pull/3015)
- Fix bug where token IDs are not set properly when upgrading from a previous version [#3017](https://github.com/cloudfoundry-incubator/stratos/pull/3017)

## 14th September 2018

We've been preparing the 2.1.0 release this week. This will be published next week. Going forward we will be publishing a new release every month. The release notes for 2.1.0 have been created and are [here](https://github.com/cloudfoundry-incubator/stratos/blob/v2-master/CHANGELOG.md#210).

Highlights for this week:

- Extensions - Work continues on adding extension points in the UI. We have PRs up to support adding new side-nav items, tabs and actions. This already goes beyond what could be done in V1 of Stratos. The extension mechanism is also much cleaner due to the use of decorators. Extensions is targeted for 2.2.0 in October.

- E2E Tests and Automation - Continuing to build out the E2E test suite and automate the deploy and test of Stratos in different environments (pushed to Cloud Foundry, pushed to Cloud Foundry with MySQL and Postgres, pushed to Cloud Foundry with SSO, Docker compose, Docker All-in-One)

- Metrics - Work is almost complete on improving the metrics integration and presentation in the UI. Rather than display a timeline under each graph, we are switching to a control to allow you to choose the time period.

Other updates:

- Allow auto-registration name to be configured [#2986](https://github.com/cloudfoundry-incubator/stratos/pull/2986)
- SSO: Refinements [#2982](https://github.com/cloudfoundry-incubator/stratos/pull/2982)
  - Fix consistency of SSO casing and hyphenation => 'Single Sign-On'
  - Make SSO default when connecting if enabled for the endpoint
  - Move the SSO Allowed checkbox to the bottom in 'Advanced Options', so that the form does not move when the checkbox is checked and the advisory text appears
- Add check to make sure DB Schema migrations have completed (fixes an issue with diagnostics and a possible race-condition when deployed via Helm or Docker Compose) [#2977](https://github.com/cloudfoundry-incubator/stratos/pull/2977)


## 7th September 2018

Update for this week:

- Single Sign-On - Added the ability to enable SSO Login when using the Setup screen.

- Metrics - Work continues to improve the metrics integration and presentation in the UI

- Extensions - Work has started on adding extension points in the UI. This will be accomplished via decorators, in the same way that Angular uses decorators for Components etc. [#2962](https://github.com/cloudfoundry-incubator/stratos/pull/2962)

- Deploy App Manifest overrides - Added an extra step in the 'Deploy App' flow to allow you to override manifest settings before deploying [#2924](https://github.com/cloudfoundry-incubator/stratos/pull/2924) 

- Show Service plan cost when selecting a service plan (if not free) [#2959](https://github.com/cloudfoundry-incubator/stratos/pull/2959)

- E2E Tests - Resolved GitHub rate limits issues when running E2E Tests [#2949](https://github.com/cloudfoundry-incubator/stratos/pull/2949)

- Travis - The Travis build has been restructured to run jobs in parallel and E2E tests now run against PRs in addition to branches.


## 31st August 2018

Update for this week:

- Go-backend re-structure - The additional cleanup work has been merged.

- Single-Sign-On - Further work on Single-Sign On:
  - Improvements - improve error handling, add navigate straight to login option [#2522](https://github.com/cloudfoundry-incubator/stratos/pull/2522)
  - Link tokens rather than copying them [#2916](https://github.com/cloudfoundry-incubator/stratos/pull/2916)
  - Allow a Cloud Foundry endpoint to be connected with SSO login [#2928](https://github.com/cloudfoundry-incubator/stratos/pull/2928)

- Allow Client ID and Secret to be set when registering an endpoint [#2920](https://github.com/cloudfoundry-incubator/stratos/pull/2920)

- Scalability:
  - Change application list in service instance table row from vertical to chip list [#2915](https://github.com/cloudfoundry-incubator/stratos/pull/2915)
  - Convert space apps list from local to remote [#2913](https://github.com/cloudfoundry-incubator/stratos/pull/2913)

- Metrics - Work has started on tidying up and improving the metrics views

## 24th August 2018

Update for this week:

- Go-backend re-structure - This work has now been merged and should make it easier to develop with and contribute to. Some additional clean up was done and is awaiting PR review.

- Extended end-to-end test suite - Further work to build-out the E2E test suite. See:
  - Services E2E: Service Instance creation with App Binding [#2855](https://github.com/cloudfoundry-incubator/stratos/pull/2855)
  - E2E: Basic Application Routes tests [#2862](https://github.com/cloudfoundry-incubator/stratos/pull/2862)
  - E2E: Basic Application Instances tests [#2863](https://github.com/cloudfoundry-incubator/stratos/pull/2863)
  - E2E: Basic test for Cf/Org/Space users tables [#2904](https://github.com/cloudfoundry-incubator/stratos/pull/2904)

- Small improvements and fixes for the Diagnostics page [#2860](https://github.com/cloudfoundry-incubator/stratos/pull/2860)


## 17th August 2018

Update for this week:

- 2.0.1 - We tagged a 2.0.1 release. This is identical to 2.0.0 and only fixes an issue with a broken dependency - one of the pinned dependencies was no longer working. This issue only affects you if you were pushing to Cloud Foundry from the 2.0.0 tag.

- Pre-built UI - We added the ability to pre-build the UI before pushing to Cloud Foundry. This allows you to build the UI with AOT (Ahead-of-time) compilation enabled and push to CF. This will also reduce push time. See the doc [Pre-building the UI](https://github.com/cloudfoundry-incubator/stratos/tree/v2-master/deploy/cloud-foundry#pre-building-the-ui).

- Go-backend re-structure. Work is almost complete on re-structuring the go backend to make it easier to develop with and contribute to. See issue [#2815](https://github.com/cloudfoundry-incubator/stratos/issues/2815).

- Extended end-to-end test suite

## 10th August 2018
A similar update to last week, focusing on metrics, testing and the community.

- Testing the new metrics deployment process.
- Improving the end to end test setup process, this will enable better coverage of service tests.
- Improving test coverage, both unit and end to end, of the often used list component.
- Improving test coverage of entity validation, another often used component.
- Manage application stats requests better in the application wall when there are many many started apps.
- Investigating, solving and shepherding community issues. Some of the stand out ones..
  - Stratos URLs are now consistent. Previously for the same CF the id would change every time it's registered, meaning bookmarks would need updating following every re-registration. Now as long as the CF API url doesn't change the CF id in the url will remain the same. - https://github.com/cloudfoundry-incubator/stratos/issues/2798
  - Correctly report application instance counts with respect to app state - https://github.com/cloudfoundry-incubator/stratos/issues/2797
  - Apply permissions to application actions (start, restart, etc) - https://github.com/cloudfoundry-incubator/stratos/issues/2806

## 3 August 2018
This week we've focused on..

- Making metrics components easier to deploy. This will help us apply polish and publicise CF metrics in the coming weeks.
- Improving test suites and coverage.
- Responding to community issues. There's been an increase in use and some great contributions.
- Fixing older, but still valid, issues that haven't quite been important to address at the time.

In addition we’ve created a short (a few minutes) survey to get a better idea how the community plan to use Stratos. Answers and feedback will directly impact the direction we take Stratos, so the quicker we have responses the quicker we can act on them. Follow this link to start answering https://www.surveymonkey.com/r/2L8XWST

## 27 July 2018

The main news this week is that we have released a first version of Stratos 2.0.

We've been focused over the past weeks on fixing bugs and improving tests and we're delighted to have reached this milestone.

The release details are available here - https://github.com/cloudfoundry-incubator/stratos/releases/tag/2.0.0.

We've also started to catch up on some of the outstanding PRs, especially submitted from the community, for example:

- Change DB schema and backend to support storing a client/secret for each Endpoint [\#2622](https://github.com/cloudfoundry-incubator/stratos/pull/2622)
- Fix migrate script to work in Postgresql [\#2601](https://github.com/cloudfoundry-incubator/stratos/pull/2601)

## 20 July 2018

This week the focus has been on further testing and refinement of Release Candidate 2.

We will be publishing a Release Candidate 3 on Monday 23 July. We expect this to be the final RC and will most likely promote this to be the final Version 2 release later next week.

We've been focused on more test automation and building out more end-to-end tests, in addition to fixing a few bugs.

We had an issue with the Angular AOT + build optimization which pushed the final RC into next week. This took a while to get to the bottom of.

For a full list of merged PRs this week, see: [Merged PRs](https://github.com/cloudfoundry-incubator/stratos/pulls?page=1&q=is%3Apr+is%3Amerged+updated%3A%3E%3D2018-07-13&utf8=%E2%9C%93).

## 13 July 2018

The SUSE team has been participating in SUSE Hack Week, so there is no change in status this week.

Work resumes next week on getting a first 2.0 release published.

## 06 July 2018

This week the focus has been on further testing and refinement of Release Candidate 2.

We've been identifying and fixing issues - see: [Merged PRs](
https://github.com/cloudfoundry-incubator/stratos/pulls?utf8=%E2%9C%93&q=is%3Apr+is%3Aclosed+updated%3A%3E%3D2018-07-02+).

## 29 June 2018

This week the focus has been on creating a Release Candidate of Version 2.

In fact, we published two Release Candidates - at the start and end of the week - full details here:
https://github.com/cloudfoundry-incubator/stratos/releases

A large number of bugs and smaller issues have been resolved since last week's Beta 2 release - full details here: https://github.com/cloudfoundry-incubator/stratos/compare/2.0.0-beta-002...2.0.0-rc2

Work has been focused on testing the Release Candidates and fixing defects.

## 22 June 2018

This week the focus has been on creating a second Beta release of Version 2.

A large number of bugs and smaller issues have been resolved - full details here: https://github.com/cloudfoundry-incubator/stratos/releases/tag/2.0.0-beta-002.


## 15 June 2018

We are working towards a release of V2. We are now functionally complete and are working through priority 1 issues and defects.

- The release schedule is updated here - [Roadmap](roadmap.md).
- Priority 1 defects are labelled P1 - you can view them with this [Filter](https://github.com/cloudfoundry-incubator/stratos/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3AP1)
- We have tagged a Beta 1 of Version 2 of Stratos today - https://github.com/cloudfoundry-incubator/stratos/releases/tag/v2.0.0-beta-001

We've been working through a large number of defects this week -

- Deploy info card shows both file and folder info [\#2351](https://github.com/cloudfoundry-incubator/stratos/issues/2351)
- App Service Instances: Modal appears off screen [\#2347](https://github.com/cloudfoundry-incubator/stratos/issues/2347)
- Users list is empty after cancel [\#2339](https://github.com/cloudfoundry-incubator/stratos/issues/2339)
- We still show large no connected CF endpoints even when you connect a metrics endpoint [\#2332](https://github.com/cloudfoundry-incubator/stratos/issues/2332)
- Connected endpoint does not show 'unregister' action [\#2321](https://github.com/cloudfoundry-incubator/stratos/issues/2321)
- Service instance page shows no 'no cf connected' warning [\#2320](https://github.com/cloudfoundry-incubator/stratos/issues/2320)
- No page header on Cloud Foundry pages when you go directly there [\#2319](https://github.com/cloudfoundry-incubator/stratos/issues/2319)
- Service Instance entity is not updated after unbinding an app [\#2317](https://github.com/cloudfoundry-incubator/stratos/issues/2317)
- Service broker card intermittently appears immediately below service summary card [\#2314](https://github.com/cloudfoundry-incubator/stratos/issues/2314)
- Select cf/org/space in create service instance stepper mentions `app` [\#2313](https://github.com/cloudfoundry-incubator/stratos/issues/2313)
- Adding a space scoped service should not show org/space selection step [\#2311](https://github.com/cloudfoundry-incubator/stratos/issues/2311)
- Front-end unit tests are unreliable in Travis [\#2308](https://github.com/cloudfoundry-incubator/stratos/issues/2308)
- Not all backend tests are run [\#2300](https://github.com/cloudfoundry-incubator/stratos/issues/2300)
- Log Stream token refresh does not work [\#2299](https://github.com/cloudfoundry-incubator/stratos/issues/2299)
- Marketplace: Service Broker card should be hidden if the broker isn't returned by API [\#2279](https://github.com/cloudfoundry-incubator/stratos/issues/2279)
- Endpoint Users are not refetched when an endpoint is reconnected as a different user. [\#2274](https://github.com/cloudfoundry-incubator/stratos/issues/2274)
- Marketplace service cards tags list fails to expand [\#2263](https://github.com/cloudfoundry-incubator/stratos/issues/2263)
- App bound service is shown in services to bind to list [\#2253](https://github.com/cloudfoundry-incubator/stratos/issues/2253)
- Error response handling is broken [\#2242](https://github.com/cloudfoundry-incubator/stratos/issues/2242)
- Investigate issue with space-scoped services being returned incorrectly by the `List Services for Space` request [\#2240](https://github.com/cloudfoundry-incubator/stratos/issues/2240)
- App Log Stream shows `Connecting....` for apps that aren't running [\#2235](https://github.com/cloudfoundry-incubator/stratos/issues/2235)
- Map Existing Routes: Sort by apps attached is broken [\#2210](https://github.com/cloudfoundry-incubator/stratos/issues/2210)
- Application: OFFLINE WHILE UPDATING state only allows the delete action. [\#2208](https://github.com/cloudfoundry-incubator/stratos/issues/2208)
- Cf/Org/Space filters are not updating on endpoint change [\#2162](https://github.com/cloudfoundry-incubator/stratos/issues/2162)
- Component effects are cropped in steppers [\#2116](https://github.com/cloudfoundry-incubator/stratos/issues/2116)
- Cloud Foundry orgs and space views contain multiple app-headers [\#2051](https://github.com/cloudfoundry-incubator/stratos/issues/2051)
- 2nd row of tabs sometimes disappears [\#2005](https://github.com/cloudfoundry-incubator/stratos/issues/2005)
- Instances tab shows Unknown when scaling \(with crashed app\) [\#2002](https://github.com/cloudfoundry-incubator/stratos/issues/2002)
- Console setup improvements \#2 [\#1974](https://github.com/cloudfoundry-incubator/stratos/issues/1974)
- Services page does not update after connecting/disconnected an SCF [\#1973](https://github.com/cloudfoundry-incubator/stratos/issues/1973)
- White bar flashes at top of page on Cloud Foundry page [\#1963](https://github.com/cloudfoundry-incubator/stratos/issues/1963)
- Show service type in service wall card [\#2315](https://github.com/cloudfoundry-incubator/stratos/issues/2315)
- Show space name in space broker card [\#2312](https://github.com/cloudfoundry-incubator/stratos/issues/2312)
- Add confirmation modals where required [\#2257](https://github.com/cloudfoundry-incubator/stratos/issues/2257)
- Add git commit id and whether user is an admin on the about page [\#2246](https://github.com/cloudfoundry-incubator/stratos/issues/2246)
- Update base images for git vulnerability CVE 2018-11235 [\#2241](https://github.com/cloudfoundry-incubator/stratos/issues/2241)
- Update service steppers following async stepper changes [\#2234](https://github.com/cloudfoundry-incubator/stratos/issues/2234)
- CF Permissions - Apply to user management [\#2226](https://github.com/cloudfoundry-incubator/stratos/issues/2226)
- CF Permissions - Apply to services [\#2225](https://github.com/cloudfoundry-incubator/stratos/issues/2225)
- CF Permissions - Apply to App Wall + Summary [\#2224](https://github.com/cloudfoundry-incubator/stratos/issues/2224)
- V1 e2e fix [\#2316](https://github.com/cloudfoundry-incubator/stratos/pull/2316) ([nwmac](https://github.com/nwmac))


## 08 June 2018

The team have been working on the following issues and PRs this week:

- Front-end unit tests are unreliable in Travis [#3208](https://github.com/cloudfoundry-incubator/stratos/issues/2308) - we're seeing a lot of problems with the front-end unit tests when running in Travis - we're continuing to dig into this issue to understand what the cause is, since this is affecting reliability of PR gate checks.

- Services permissions [#2284](https://github.com/cloudfoundry-incubator/stratos/pull/2284) - wiring the user permissions service into the Service UI to ensure users are only presented with actions that they are permitted to perform.

- Allow metrics endpoint token to be shared [#2283](https://github.com/cloudfoundry-incubator/stratos/pull/2283) - adding support for the admin user to connect to a Prometheus metrics endpoint and then make that connection available to all users. Note that non-admins can only see metrics for applications that they have permission to view.

- Show whether user is an admin on the about page [#2306](https://github.com/cloudfoundry-incubator/stratos/pull/2306) - we now indicate on the about page if the current user is an administrator of Stratos.

- Add Permissions to CF Users tables [#2291](https://github.com/cloudfoundry-incubator/stratos/pull/2291) - wired in the user permissions service into the Cloud Foundry user management UI.

- Wire in actions to app state [#2288](https://github.com/cloudfoundry-incubator/stratos/pull/2288) - actions on the application view now use the same rules as in V1 to determine which actions should be shown based on the current application state.

- Quicker e2e tests for PRs  [#2273](https://github.com/cloudfoundry-incubator/stratos/pull/2273) - changed the way e2e tests run for PRs. They will now use a quicker local deployment rather than a full deployment in docker.

- Only show add and deploy buttons when there is at least 1 connected CF [#2285](https://github.com/cloudfoundry-incubator/stratos/pull/2285) - we now only show the add and deploy buttons on the application wall when there is a Cloud Foundry available.

- Fetch cf users when not cf admin [#2282](https://github.com/cloudfoundry-incubator/stratos/pull/2282) - ensuring that we use different APIs call when the user is not an admin in order to retrieve the data to display for the user list.

- Hide service broker card if broker information isn't available [#2287](https://github.com/cloudfoundry-incubator/stratos/pull/2287) - we now hide the service broker card if we can not retrieve the broker metadata.

- Only allow password change if user has password.write scope [#2278](https://github.com/cloudfoundry-incubator/stratos/pull/2278) - user is now only presented with the option to change their password if they have permission to do so.

- Backend logging improvements [#2267](https://github.com/cloudfoundry-incubator/stratos/pull/2267) - first round of tidy up to the back-end logging, including not logging an error when verifying the user's seesion when they don't have a valid session.

- Use local fonts [#2260](https://github.com/cloudfoundry-incubator/stratos/pull/2260) - all fonts are now served up by the app itself to allow air-gapped deployment.

- Endpoint confirmation modals [#2258](https://github.com/cloudfoundry-incubator/stratos/pull/2258) - added confirmation modals when disconnecting or un-registering and endpoint.

- Added theming section to developer guide readme [#2249](https://github.com/cloudfoundry-incubator/stratos/pull/2249) - added documentation on how theming is done for Stratos.

- Update permissions when when entities are updated [#2221](https://github.com/cloudfoundry-incubator/stratos/pull/2221) - we now ensure that permissions are updated when endpoints (and other entities) are updated in Stratos.

## 01 June 2018

The team have been working on the following issues and PRs this week:

- Upgrade to Angular 6 [#2227](https://github.com/cloudfoundry-incubator/stratos/pull/2227) - Completed work and testing. Will merge early next week.

- Edit service instance from Services Wall [#2233](https://github.com/cloudfoundry-incubator/stratos/pull/2233) - Added ability to edit an existing service instance.

- E2E Tests [#1523](https://github.com/cloudfoundry-incubator/stratos/issues/1523) - Continuing to extend E2E test suite.

- Fix compression issue [#2248](https://github.com/cloudfoundry-incubator/stratos/pull/2248) - Fixed an issue when Stratos accessed a Cloud Foundry instance with gzip compression enabled. Thanks to everyone for their help with this one.

- Fix App SSH (Broken when auth and token endpoints are different) [#2250](https://github.com/cloudfoundry-incubator/stratos/pull/2250) - Fixed an issue with Application SSH for some CF deplyoments.

- Fix application issue on reload when served by backend [#2238](https://github.com/cloudfoundry-incubator/stratos/pull/2238) - Fixed an issue where refreshing the browser on application pages resulted in a 404 (when deployed via cf push)



## 25 May 2018

The team have been working on the following issues and PRs this week:

- Upgrade to Angular 6 [#2227](https://github.com/cloudfoundry-incubator/stratos/pull/2227)

- Handle async request progress/success/failure in modals [#2223](https://github.com/cloudfoundry-incubator/stratos/pull/2223) - Improving busy state and error feedback in modals - e.g. when creating an application, creating a space etc

- Service Summary tab [#2219](https://github.com/cloudfoundry-incubator/stratos/pull/2219) - add a summary tab to the view for a service, to show summary metadata

- Add support for back-end custom plugins [#2217](https://github.com/cloudfoundry-incubator/stratos/pull/2217)

- Apply user permissions to CF pages (2) [#2212](https://github.com/cloudfoundry-incubator/stratos/pull/2212) - Completion of work to wire in user permissions into the Cloud Foundry view


## 18 May 2018

The team have been working on the following issues and PRs this week:

- User permissions [#2147](https://github.com/cloudfoundry-incubator/stratos/pull/2147) - adding in the framework to control UI elements based on the user's permissions

- Apply user permissions to CF pages [#2198](https://github.com/cloudfoundry-incubator/stratos/pull/2198) - appropriately show the CF actions a user can perform based on their permissions

- Service instances view [#2074](https://github.com/cloudfoundry-incubator/stratos/issues/2074) - adding a view to show service instances

- Services Wall: Create Services instance [#2163](https://github.com/cloudfoundry-incubator/stratos/pull/2163) - adding support for creating service instances from the service marketplace view

- App Services tab: Allow user to bind a service instance [#2188](https://github.com/cloudfoundry-incubator/stratos/pull/2188)

- E2E Tests and E2E Test setup improvements [#2183](https://github.com/cloudfoundry-incubator/stratos/pull/2183)

- Add support for Angular XSRF protection [#2153](https://github.com/cloudfoundry-incubator/stratos/pull/2153) - adding support for the Angular XSRF protection mechanism

- Remove deprecated API & Add confirmation dialogs when detaching/removing service bindings [#2193](https://github.com/cloudfoundry-incubator/stratos/pull/2193)




## 11 May 2018

The work to get V2 to the same level of functionality as V1 is going well and we're nearing completion - the team have been working on the following issues and PRs this week:

- Add restart app button [#2140](https://github.com/cloudfoundry-incubator/stratos/pull/2140) - adding restart action to applications

- CF Push: Bump up memory further [#2135](https://github.com/cloudfoundry-incubator/stratos/pull/2135) - increase memory when pushing to work around the memory-hungry Angular compiler

- Service instances view [#2074](https://github.com/cloudfoundry-incubator/stratos/issues/2074) - adding a view to show service instances

- User permissions [#2147](https://github.com/cloudfoundry-incubator/stratos/pull/2147) - adding in the framework to control UI elements based on the user's permissions

- Customizations [#2133](https://github.com/cloudfoundry-incubator/stratos/pull/2133) - initial support for customizing Stratos (theme etc)

- E2E Tests [#1523](https://github.com/cloudfoundry-incubator/stratos/issues/1523) - putting in place the E2E framework for V2, getting this working in Travis and porting over the V1 Endpoints tests.

- Delete App should show dependencies and allow optional deletion [#2044](https://github.com/cloudfoundry-incubator/stratos/pull/2044) - when deleting an application the user is shown the application dependencies (routes, service instances) and is able to delete these with the application or leave them in place for use by other applications

- Cloud Foundry: Manage Users [#1541](https://github.com/cloudfoundry-incubator/stratos/issues/1541) - re-introducing the equivalent features that V1 has allowing user to manage user roles across Cloud Foundry

## 4 May 2018

The team have been working on the following issues and PRs this week:

- E2E Tests [#1523](https://github.com/cloudfoundry-incubator/stratos/issues/1523) - putting in place the E2E framework for V2, getting this working in Travis and porting over the V1 Endpoints tests.

- Delete App should show dependencies and allow optional deletion [#2044](https://github.com/cloudfoundry-incubator/stratos/pull/2044) - when deleting an application the user is shown the application dependencies (routes, service instances) and is able to delete these with the application or leave them in place for use by other applications

- Cloud Foundry: Manage Users [#1541](https://github.com/cloudfoundry-incubator/stratos/issues/1541) - re-introducing the equivalent features that V1 has allowing user to manage user roles across Cloud Foundry

- Implement Create Service Instance [#2043](https://github.com/cloudfoundry-incubator/stratos/issues/2043) - adding support for creating service instances

- Service Instance creation: Support space-scoped broker provided plans [#2111](https://github.com/cloudfoundry-incubator/stratos/pull/2111)

- Make Service Instance creation wizard service plan visibility aware [#2109](https://github.com/cloudfoundry-incubator/stratos/pull/2109)

- Return better error information from API passthroughs [#2084](https://github.com/cloudfoundry-incubator/stratos/pull/2085)

## 27 April 2018

The team have been working on the following issues this week:

- GitHub tab/deploy updates [#2067](https://github.com/cloudfoundry-incubator/stratos/issues/2067) - When deploying an application from GitHub, we now allow the user to select a commit from their selected branch. When viewing the GitHub tab of an application, the user can see the list of commits and update the application from a different commit on the branch.

- Deploy App: Add support for an archive file or local folder  [#2040](https://github.com/cloudfoundry-incubator/stratos/issues/2040) - In addition to Git deployment, users can now browse to a local application archive file or folder and deploy using that.

- User Profile: Implement edit and password change as per V1 [#2062](https://github.com/cloudfoundry-incubator/stratos/issues/2040) - Users can now edit their profile metadata and change their password.

- Create & List Service Instances - [#2086](https://github.com/cloudfoundry-incubator/stratos/pull/2086) - adding the ability to view and create Service Instances.

- Delete App should show dependencies and allow optional deletion [#2044](https://github.com/cloudfoundry-incubator/stratos/pull/2044) - when deleting and application the user is shown the application dependencies(routes, service instances) and is able to delete these with the application or leave them in place for use by other applications

- Cloud Foundry: Manage Users [#1541](https://github.com/cloudfoundry-incubator/stratos/issues/1541) - re-introducing the equivalent features that V1 has allowing user to manage user roles across Cloud Foundry
