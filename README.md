# alphavantage-test-automation
## Introduction
This Test Automation Framework is created using `Cypress` and JavaScript. 'cypress-mochawesome-reporter' was used as the reporting plugin and '@cypress/grep' was introduced to filter and execute tests easily

## How to setup the Project
1. Clone the project from Github
2. Navigate into the project directory and install the required dependencies
```
npm install
```
3. You are all set! Happy testing! 🎉

## How to run the Tests Locally
- To open the cypress window -> `npx cypress open`
- To run all the tests using console -> `npx cypress run`

### Additional Configurations
- This project is implemented in a way to enable test execution in different test environments (Eg. dev, stage)
- For each new environment users need to add env.json file in `cypress/environments` directory and specify the required env variables
- To run the tests on any specific environment use the cypress open or run commands with setting envFile variable
```
npx cypress open --env envFile=stage
npx cypress run --env envFile=dev
```
- Also users have the ability to override any env variable using the terminal
```
npx cypress run --env envFile=stage,apikey="demo"
```
- When executing the tests we can use the capabilities of [@cypress/grep](https://www.npmjs.com/package/@cypress/grep) library making it easier to filter specs using various possibilities (There are lot of combinations we could use, please refer the library for more details)
```
npx cypress run --env envFile=stage,grepTags="@smoke"
npx cypress run --env envFile=stage,grep="Test-1.6"
```
## How to run the Tests in CI
- `cypress_tests.yml` file is implemented as a manual trigger. Users are able to execute this workflow in Github Actions providing the required information
  - Branch - required branch to execute the tests from (default is `main`)
  - Test type - Required test tags to execute (default is set as `@smoke`)
  - Environment - Required environment to execute the tests (default is set as `stage`)
 <img width="1492" alt="image" src="https://github.com/user-attachments/assets/0ec67ddf-e067-4735-9aea-b13a02409bca">


## Test Reporting
 - 'cypress-mochawesome-reporter' is configured for reporting. When the tests executed via cypress run command it will create a detailed test report in `cypress/reports` directory
 - When it comes to the CI executions, the report is uploaded as an artifact in the specific build. To access the report download the `cypress-results` artifact and extract. 
<img width="1897" alt="image" src="https://github.com/user-attachments/assets/695d7ce1-03f6-4f4f-b41d-e4a5d14d37ff">


## Eslint Workflow
- eslint workflow is also configured as an static code analysis for the Cypress tests. When there is any commit to the min branch it will be executed automatically and if there are any errors build will fail in CI.
  <img width="1885" alt="image" src="https://github.com/user-attachments/assets/72f82b12-0550-43be-81f5-e92283239205">


## Note
- Please Note that from one alphavantage API_KEY it allows only 25 requests per day. So if we trigger the tests multiple times there can be some issues. 
- To avoid this we could create a API key dynamically before each test run. This was not implemented at the moment since there is also a limit using the same IP


## Overview On Test Cases
- Please find a overview of the Related test cases in the attached document ->
[payrails_tests.pdf](https://github.com/user-attachments/files/16736212/payrails_tests.pdf)
