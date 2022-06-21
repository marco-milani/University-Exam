# Exam #12345: "Exam Title"
## Student: s123456 LASTNAME FIRSTNAME 

## React Client Application Routes

- Route `/`: base page, when not logged in shows the exams list and their info, while when logged in, there is a button that shows a form to create a study plan in case the student doesn't have a study plan or bring to  /studyPlan in case he has it.
- Route `/login` page to handle students login with a form to submit
- Route `/studyPlan`: page to handle the modification of student study plan with two tables, the left one with the choice of exams, the right one with the ones chosen by the student
- Route `/something/:param`: page content and purpose, param specification
## API Server

- GET `/api/exams`
  -  Body: _None_
  -  header:_None_
  -  response code : 
        - ```200 OK``` (success)
        - ```500 Internal Server Error``` (error)
  - response body : List of all exams

- GET `/api/plan`
  -  Body: _None_
  -  header:_None_
  -  Need user log in
  -  response code : 
        - ```200 OK``` (success)
        - ```404 Not Found``` (error)
        - ```500 Internal Server Error``` (error)
  - response body : Study plan

- GET `/api/studyPlan/:id/exams`
  -  Body: _None_
  -  header: id of studyPlan
  -  Need user log in
  -  response code : 
        - ```200 OK``` (success)
        - ```500 Internal Server Error``` (error)
  - response body : List of all exams inside the student study Plan

- POST `/api/plan`
  -  Body: plan data
  -  header: _None_
  -  Need user log in
  -  response code : 
        - ```201 Created``` (success)
        - ```422 Validation of request body failed ``` (error)
        - ```500 Internal Server Error``` (error)
  - response body : List of all exams inside the student study Plan

- POST `/api/login`
  - request parameters and request body content
  - response body content

- GET `/api/something`
  - request parameters
  - response body content
- 
- POST `/api/something`
  - request parameters and request body content
  - response body content
- ...

## Database Tables

- Table `users` - contains xx yy zz
- Table `something` - contains ww qq ss
- ...

## Main React Components

- `ListOfSomething` (in `List.js`): component purpose and main functionality
- `GreatButton` (in `GreatButton.js`): component purpose and main functionality
- ...

(only _main_ components, minor ones may be skipped)

## Screenshot

![Screenshot](./img/screenshot.jpg)

## Users Credentials

- username, password (plus any other requested info)
- username, password (plus any other requested info)
