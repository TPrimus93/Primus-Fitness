# Mann Lawn Care App 
### Requirements Document

Created by: Trevor Primus


## Concept

I want to build the backend of an application for a lawn service company. 
The purpose of the app would be to handle the scheduling of various lawn services for a number of clients. 
The company only has x amount of hours a week for each employee and each service takes y amount of hours. 
The app would accept lawn service requests from clients and assign them to either a preferred employee (if the client specifies one) or to an employee with enough free work hours to complete the requested services. 
If there is not enough time left in the current week to complete the requested work, the client will be asked to try again next week. 
The app will not schedule exact times for the services (i.e. employee x will perform task y at exactly 1pm on Wednesday) but instead it will give each employee a list of tasks they must complete that week. 


## Endpoint URLs: 

### Employees

GET: /PrimusWebProject/employees

GET: /PrimusWebProject/employees/\<employeeID>

POST: /PrimusWebProject/employees

PUT: /PrimusWebProject/employees/\<employeeID>

DELETE: /PrimusWebProject/employees/\<employeeID>


### Clients

GET: /PrimusWebProject/clients

GET: /PrimusWebProject/clients/\<clientID>

POST: /PrimusWebProject/clients

PUT: /PrimusWebProject/clients/\<clientID>

DELETE: /PrimusWebProject/clients/\<clientID>

### Jobs

GET: /PrimusWebProject/jobs

GET: /PrimusWebProject/jobs/\<jobID>

POST: /PrimusWebProject/jobs

POST: /PrimusWebProject/jobs/\<employeeID>

PUT: /PrimusWebProject/jobs/\<jobID>

DELETE: /PrimusWebProject/jobs/\<jobID>

# Employees:

## GET: /PrimusWebProject/employees

### Description

Returns all employees in the company

### Request 

```
curl --location --request GET 'http://localhost:9080/PrimusWebProject/employees'
```

### Response

```
[
    {
        "firstName": "fname1",
        "lastName": "lname1",
        "username": "uname1",
        "password": "pword1",
        "workHours": 10.0,
        "employee_ID": 1
    },
    {
        "firstName": "fname2",
        "lastName": "lname2",
        "username": "uname2",
        "password": "pword2",
        "workHours": 5.0,
        "employee_ID": 2
    }
]
```

## GET: /PrimusWebProject/employees/\<employeeID>

### Description

Returns information about a specific employee

### Request 

```
curl --location --request GET 'http://localhost:9080/PrimusWebProject/employees/1'
```

### Responses

```
{
    "firstName": "abc",
    "lastName": "def",
    "username": "uname",
    "password": "pword",
    "workHours": 10.0,
    "employee_ID": 1
}
```

```
404 Not found
```

## POST: /PrimusWebProject/employees

### Description

Adds a new employee to the database

### Request Body

```
curl --location --request POST 'http://localhost:9080/PrimusWebProject/employees' \
--header 'Content-Type: text/plain' \
--data-raw '{
  "firstName": "fname2",
  "lastName": "lname2",
  "username": "uname2",
  "password": "pword2",
  "workHours": 5
}'
```

### Responses

```
{
    "firstName": "fname2",
    "lastName": "lname2",
    "username": "uname2",
    "password": "pword2",
    "workHours": 5.0,
    "employee_ID": 2
}
```

## PUT: /PrimusWebProject/employees/\<employeeID>

### Description

Updates an employees info in the database

### Request Body

```
curl --location --request PUT 'http://localhost:9080/PrimusWebProject/employees/2' \
--header 'Content-Type: text/plain' \
--data-raw '{
  "firstName": "fname2",
  "lastName": "lname2",
  "username": "uname2",
  "password": "pword2",
  "workHours": 5
}'
```

### Responses

```
{
    "firstName": "fname2",
    "lastName": "lname2",
    "username": "uname2",
    "password": "pword2",
    "workHours": 5.0,
    "employee_ID": 2
}
```

```
404 Not Found
```
## DELETE: /PrimusWebProject/employees/\<employeeID>

### Description

Deletes an employee from the database

### Request Body

```
curl --location --request DELETE 'http://localhost:9080/PrimusWebProject/employees/2'
```

### Responses

```
{
    "firstName": "fname2",
    "lastName": "lname2",
    "username": "uname2",
    "password": "pword2",
    "workHours": 5.0,
    "employee_ID": 2
}
```

```
404 Not Found
```

# Clients:

## GET: /PrimusWebProject/clients

### Description

Returns information about all clients

### Request 

```
curl --location --request GET 'http://localhost:9080/PrimusWebProject/clients'
```

### Responses

```
[
    {
        "name": "Client1",
        "username": "pword1",
        "password": "uname1",
        "clientID": 1
    },
    {
        "name": "Client2",
        "username": "pword2",
        "password": "uname2",
        "clientID": 2
    }
]
```

## GET: /PrimusWebProject/clients/\<clientID>

### Description

Returns information about a specific client

### Request Body

```
curl --location --request GET 'http://localhost:9080/PrimusWebProject/clients/1'
```

### Responses

```
{
    "name": "Client1",
    "username": "pword1",
    "password": "uname1",
    "clientID": 1
}
```

```
404 Not found
```

## POST: /PrimusWebProject/clients

### Description

Adds a new client to the database

### Request 

```
curl --location --request POST 'http://localhost:9080/PrimusWebProject/clients' \
--header 'Content-Type: text/plain' \
--data-raw '{
  "name": "Client1",
  "username": "uname1",
  "password": "pword1"
}
'
```

### Responses

```
{
    "name": "Client1",
    "username": "pword1",
    "password": "uname1",
    "clientID": 1
}
```

## PUT: /PrimusWebProject/clients/\<clientID>

### Description
Adds a new client to the database

### Request

```
curl --location --request PUT 'http://localhost:9080/PrimusWebProject/clients/2' \
--header 'Content-Type: text/plain' \
--data-raw '{
  "name": "Client2",
  "username": "uname2",
  "password": "pword2"
}'
```

### Responses

```
{
    "name": "Client2",
    "username": "uname2",
    "password": "pword2",
    "clientID": 2
}
```

```
404 Not Found
```

## DELETE: /PrimusWebProject/clients/\<clientID>

### Description
Deletes an client from the database

### Request

```
curl --location --request DELETE 'http://localhost:9080/PrimusWebProject/clients/2'
```

### Responses

```
{
    "name": "Client2",
    "username": "pword2",
    "password": "uname2",
    "clientID": 2
}
```

```
404 Not Found
```

# Jobs:

## GET: /PrimusWebProject/jobs

### Description

Returns all jobs for the company

### Request
curl --location --request GET 'http://localhost:9080/PrimusWebProject/jobs' \
--data-raw ''

### Responses

```
[
    {
        "title": "Mowing",
        "jobID": 1,
        "clientID": 2,
        "employeeID": 1,
        "hours": 2.1
    },
    {
        "title": "Trimming",
        "jobID": 2,
        "clientID": 3,
        "employeeID": 3,
        "hours": 1.2
    },
    {
        "title": "Pool",
        "jobID": 3,
        "clientID": 1,
        "employeeID": 3,
        "hours": 38.0
    }
]
```

## GET: /PrimusWebProject/jobs/\<jobID>

### Description

Returns information about a specific job

### Request

```
curl --location --request GET 'http://localhost:9080/PrimusWebProject/jobs/1'
```

### Responses

```
{
    "title": "mowing",
    "jobID": 1,
    "clientID": 1,
    "employeeID": 1,
    "hours": 2.2
}
```

```
404 Not found
```

## POST: /PrimusWebProject/jobs

### Description

Adds a new job to the database

### Request 

```
curl --location --request POST 'http://localhost:9080/PrimusWebProject/jobs' \
--header 'Content-Type: text/plain' \
--data-raw '{
  "title": "Pool",
  "clientID": 1,
  "hours": 38
}'
```

### Responses

```
{
    "title": "Pool",
    "jobID": 3,
    "clientID": 1,
    "employeeID": 3,
    "hours": 38.0
}
```

## POST: /PrimusWebProject/jobs/\<employeeID>

### Description

Adds a new job to the database with a specific employee

### Request 

```
curl --location --request POST 'http://localhost:9080/PrimusWebProject/jobs/3' \
--header 'Content-Type: text/plain' \
--data-raw '{
  "title": "Trimming",
  "clientID": 3,
  "hours": 1.2
}'
```

### Responses

```
{
    "title": "Trimming",
    "jobID": 2,
    "clientID": 3,
    "employeeID": 3,
    "hours": 1.2
}
```

## PUT: /PrimusWebProject/jobs/\<jobID>

### Description

Updates an job info in the database

### Request

```
curl --location --request PUT 'http://localhost:9080/PrimusWebProject/jobs/1' \
--header 'Content-Type: text/plain' \
--data-raw '{
  "title": "trim",
  "clientID": 1,
  "employeeID": 2,
  "hours": 2.5
}'
```

### Responses

```
{
    "title": "trim",
    "jobID": 1,
    "clientID": 1,
    "employeeID": 2,
    "hours": 2.5
}
```

```
404 Not Found
```

## DELETE: /PrimusWebProject/jobs/\<jobID>

### Description

Deletes a job from the database

### Request

```
curl --location --request DELETE 'http://localhost:9080/PrimusWebProject/jobs/3'
```

### Responses

```
{
    "title": "Pool",
    "jobID": 3,
    "clientID": 1,
    "employeeID": 3,
    "hours": 38.0
}
```

```
404 Not Found
```


# Database Schemas


## Employees Database

| Field Name | Type | Description
| --- | --- | --- |
| firstName | varchar(100) | Employees First Name
| lastName | varchar(100) | Employees Last Name
| username | varchar(45) | Employees Username
| password | varchar(45) | Employees Password
| workHours | double | Employees Work hours
| employee_ID | int AI PK | Employees ID

## Clients Database

| Field Name | Type | Description
| --- | --- | --- |
| name | varchar(100) | Name of Client 
| username | varchar(45) | Clients Username
| password | varchar(45) | Clients Password
| clientID | int AI PK | Clients ID


## Jobs Database

| Field Name | Type | Description
| --- | --- | --- |
| jobID | int AI PK | Job ID
| title | varchar(100) | Job title
| clientID | int | Clients ID
| employeeID | int | Employee ID
| hours | double | Job Hours

# Model-View-Controller Diagrams
