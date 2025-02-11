# AngularTask

## Goal

The goal of this assignment is to showcase your skills and coding style while building an enterprise grade Angular application. You may take your time with this assessment to show case your skills. Once you have it working you can add some extra flare with unit testing, e2e testing with playwright, updated styles to make it snazzy, or whatever else you feel like.

## Getting Started

-   Install packages with `npm i`
-   Serve the application using `npx nx run angular-task:serve`

## User Management Application

1. Home page should show a card view of users from [JSONplaceholder](https://jsonplaceholder.typicode.com/). The home page should allow you to click on a users card to navigate to their profile page.
2. The profile page should use the angular router and exist at `/users/:id` and display all of the user information for the id in the route path.
3. Add filter(s) to the home page to allow the user to filter the list.
4. Add a way to favorite users in both the card view and detail page.
5. Run the following command to verify that your changes lint, test, and build correctly: `npx nx affected -t lint test build`.

## Running tests:

1. Jest Unit Tests:
	- To run all: `npx nx run-many --target=test --all`
	- For specific project: `npx nx test {project-name}` (i.e. `npx nx test angular-task`)
2. Cypress E2E Tests:
	- headless: `npx nx run angular-task-e2e:e2e`
	- headed: `npx nx run angular-task-e2e:open-cypress`

## Project Organization:
#### Folder Structure
- `/apps`: Contains standalone application
	- `/apps/angular-task`: The main Angular application
	- `/apps/angular-task-e2e`: End-to-end (E2E) Cypress tests for `angular-task`
- `/libs`: Houses reusable libraries
	- `/libs/services`: Contains shared service logic used across the application
	- `/libs/components`: Stores reusable UI Components. 


## Timeline

- This project took me roughly 12 hours to complete. I probably spent 4 hours refreshing myself with Angular and nx and learning some newer Angular concepts (i.e. Signals). I spent 1 hour deciding how to design my app and which `primeng` components to use. I then spent around 5.5 hours to code up my application and debug any issues that I encountered. Finally, I spent 1.5 hour writing E2E and unit tests. 


