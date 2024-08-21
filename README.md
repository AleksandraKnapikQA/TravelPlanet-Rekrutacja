# Introduction
This is the automated test suite made for the recruitment process at TravelPlanet. <br/>
It is written using the Playwright test framework (v.1.46.0) and Typescript.

# Setup
## Prerequisites 
Ensure you have the following installed on your machine:
- Node.js (version 20.x or higher)
- npm (comes with Node.js) or yarn

## Clone the Repository
Clone this repository to your local machine:
`$ git clone https://github.com/AleksandraKnapikQA/TravelPlanet-Rekrutacja.git`

## Install Dependencies
Navigate to the project directory and install the required dependencies:
`$ npm install`

Or if you're using yarn:
`$ yarn install`

## Install Playwright Browsers
Playwright requires specific browser binaries to run tests. Install these by running:
`$ npx playwright install` . <br/> This will download and install the necessary browsers (Chromium, Firefox, and WebKit) to run your tests.

# Usage
## Domains and Test Run
To run your Playwright tests for all required domains use:
`$ npx playwright test`

You can also select the appropriate domain option:
- in test explorer, in the "PROJECTS" section ("Testing" tab) OR 
- add "--project <projName>" in CLI OR
- use one of the available scripts:
```
$ npm run CZ      // Run tests for invia.cz only
$ npm run SK      // Run tests for invia.sk only
$ npm run HU      // Run tests for invia.hu only
$ npm run PL      // Run tests for travelplanet.pl only
$ npm run ALL     // Run tests for all domains
```
The tests will be executed on chromium (default browser).

## Structure 
As this project use the Page Object Pattern - most locators and page methods are stored in PageObjects. <br/>
All 4 tasks are in one spec file - allTasks.spec.ts - to avoid unnecessary complexity while having a few tests.

## Reporting
The json and xml reports are created in the 'test-results' folder after the tests run.