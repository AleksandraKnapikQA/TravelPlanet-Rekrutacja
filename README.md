# Introduction
This is the automated test suite made for the recruitment process at TravelPlanet.
It is written using Playwright(Version 1.46.0) test framework and Typescript.

# Usage
## Domains
The framework implements execution on required sites by selecting proper playwright project. To do this, you can select the appropriate option in test explorer in the "PROJECTS" section OR add "--project <projName>" in CLI or use one of the available scripts (pasekage.json).

# Structure 
As this project use Page Object Pattern - most locators and page methods are stored in PageObjects
All 4 tasks are in one spec file - allTasks.spec.ts to avoid unnecessary complexity having a small number of tests.

# Reporting
json and xml reports in 'test-results' folder