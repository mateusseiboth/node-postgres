# 🚗 CutuCar API

Welcome to my project! 👋

I created this project as part of a web course assignment. The main goal of the project is to simulate requests to a REST API in a parking management application. This includes handling authentication, authorization, and CRUD operations for users, cars, clients, tickets, parking spaces, and parking space types.

Through this project, I have honed my skills in programming and web development.

Thank you for taking the time to check out my project!

![divBar](https://user-images.githubusercontent.com/117425361/220209151-a5c53a41-c9b0-4fa7-a358-f430571ed026.png)

## 🔖 Table of Contents

- [Mandatory requirements](#-mandatory-requirements)
- [Business Logic](#-business-logic)
- [Usage](#-usage)
- [Technologies](#-technologies)
- [Project Architecture](#-project-architecture)
- [Endpoints](#-endpoints)

![divBar](https://user-images.githubusercontent.com/117425361/220209151-a5c53a41-c9b0-4fa7-a358-f430571ed026.png)

## 🚀 Mandatory requirements

- [X] Readability
- [X] README documentation
- [X] JWT
- [X] Authentication route
- [X] Protected routes (token bearer with 1h deadline)

![divBar](https://user-images.githubusercontent.com/117425361/220209151-a5c53a41-c9b0-4fa7-a358-f430571ed026.png)

## 🌟 Business Logic

### Users
- [X] Username must be unique in the base.

### Cars
- [X] The car plate must be unique in the base.
- [X] The car must have a client.

### Ticket
- [X] The ticket needs a parking space.
- [X] The ticket needs a parking space type.
- [X] The ticket needs a car.

### Parking space
- [X] The same parking space cannot be used in the same period of time.

### Parking space type
- [X] The parking space type needs a description.
- [X] The parking space type needs an hourly cost.

### Client
- [X] The client needs a unique CPF (Brazilian ID number) in the base.

![divBar](https://user-images.githubusercontent.com/117425361/220209151-a5c53a41-c9b0-4fa7-a358-f430571ed026.png)

## 💻 Usage

### Local hosting

#### Pre-requisites

- 📜 [**Node.JS**](https://nodejs.org/en)
- 🍃 [**PostgreSQL**](https://www.postgresql.org/)

You will need to have [Node.JS](https://nodejs.org/en) installed on your machine, as well as a [PostgreSQL Server](https://www.postgresql.org/download/).

#### Step by step

1. Check if you have the listed pre-requisites.
2. Clone the repository to your local machine with the command:
```bash
$ git clone https://github.com/mateusseiboth/node-postgres.git
```
3. Install project dependencies with the command:
```bash
$ npm install
```
4. Edit a `.env` file at the project root.
5. Start the server with the command:
```bash
$ npm start
```
6. The server will be running at `localhost:port`.

![divBar](https://user-images.githubusercontent.com/117425361/220209151-a5c53a41-c9b0-4fa7-a358-f430571ed026.png)

## 🧰 Technologies

[![My Skills](https://skillicons.dev/icons?i=nodejs,express,postgres)](https://skillicons.dev)

### Main Stack

- [Node.JS](https://nodejs.org/en/): JavaScript development platform.
- [Express](https://expressjs.com/pt-br/): Web application framework.
- [PostgreSQL](https://www.postgresql.org/): Object-relational database.

### Security and authentication
- [JsonWebToken](https://jwt.io/): Library for generating JSON web tokens for authentication and authorization.
- [Bcrypt](https://www.npmjs.com/package/bcrypt): Hashing library for password encryption.

### Utilitary and Middleware
- [Dotenv](https://www.npmjs.com/package/dotenv): Library to load env variables from .env file for easier environment configuration.
- [Nodemon](https://www.npmjs.com/package/nodemon): Utility that monitors code changes and auto-restarts the server.

![divBar](https://user-images.githubusercontent.com/117425361/220209151-a5c53a41-c9b0-4fa7-a358-f430571ed026.png)

## 🧩 Project Architecture

The `src/api` folder contains all the application's source code and is organized as follows:

- 📂 **models**: Contains the data models used by the application, such as Car, User and Ticket.
- 📂 **controllers**: Contains the controller logic of the application, organized by features or pages.
- 📂 **middlewares**: Contains middleware functions used by the application, such as authentication and rate limit.
- 📂 **routes**: Contains the API routes.
- 📂 **utils**: Contains utility functions used by the application, such as jwt token creation.
- 📂 **database**: Contains the creation of the database connection pool
- 📄 **app.js**: Main file that configures the server and check connection with database.
- 📄 **server.js**: Instantiates the server and listens for HTTP requests.

![divBar](https://user-images.githubusercontent.com/117425361/220209151-a5c53a41-c9b0-4fa7-a358-f430571ed026.png)

## 🛣 Endpoints

- Main Route: `/api/v1`

### Authentication Routes

| Method | Endpoint | Protected | Description |
|--------|----------|-----------|-------------|
| **`POST`**   | /user/auth    | false     | Authenticate a user |

> **Note**
> This route is for generating or renewing the authentication token.

### Example

<details>
<summary><h4>Generate Token (POST)</h4></summary>
  
  <h4>Request</h4>
  
  ```json
  {
    "email": "joazinho@email.com",
    "password": "123456"
  }
  ```
  
  <h4>Response</h4>
  
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzMxMjk2MDM5ZDk2MDg1NmQxZDZkYSIsImlhdCI6MTY4MTA2ODkwMiwiZXhwIjoxNjgxMTEyMTAyfQ.D5zEzXoHSvQZNKdW48Ip_HVq0jlVo9Wxuf_Rf4AhFdg"
  }
  ```
  
</details>

---

### User Routes

| Method | Endpoint | Protected | Description |
|--------|----------|-----------|-------------|
| **`POST`**   | /user/new   | false     | Register a new user |
| **`GET`**    | /user/me    | true      | Return token details |

### Examples

<details>
<summary><h4>Create (POST)</h4></summary>
  
  <h4>Request</h4>
  
  ```json
  {
    "username": "mateus",
    "password": "123456"
  }
  ```
  
  <h4>Response</h4>
  
  ```json
  {
    "message": "User created successfully"
  }
  ```
  
</details>

<details>
<summary><h4>Me (GET)</h4></summary>
  
  <h4>Response</h4>
  
  ```json
  {
    "user": {
        "id": 3,
        "iat": 1681500982,
        "exp": 1681504582
    }
}
  ```
  
</details>

### Car Routes

| Method | Endpoint | Protected | Description |
|--------|----------|-----------|-------------|
| **`GET`**    | /car/list   | true      | List all cars |
| **`POST`**   | /car/new    | true      | Register a new car |
| **`DELETE`** | /car/:id    | true      | Remove a car by ID |
| **`PUT`**    | /car/update | true      | Update a car by ID |


### Examples

<details>
<summary><h4>Create (POST)</h4></summary>
  
  <h4>Request</h4>
  
  ```json
  {
    "placa": "HRT7J76",
    "cliente_id": 2
  }
  ```
  
  <h4>Response</h4>
  
  ```json
  {
    "message": "Car criado"
  }
  ```
  
</details>

<details>
<summary><h4>Read (GET)</h4></summary>
  
  <h4>Response</h4>
  
  ```json
  [
    {
        "id": 1,
        "placa": "FRT0876",
        "cliente_id": 1,
        "cliente_nome": "Robson"
    },
    {
        "id": 2,
        "placa": "FRT0806",
        "cliente_id": 2,
        "cliente_nome": "JuninhoBen10"
    },
    {
        "id": 3,
        "placa": "FTR0934",
        "cliente_id": 1,
        "cliente_nome": "Robson"
    },
    {
        "id": 5,
        "placa": "HRO7J76",
        "cliente_id": 1,
        "cliente_nome": "Robson"
    },
    {
        "id": 6,
        "placa": "HRT7J76",
        "cliente_id": 2,
        "cliente_nome": "JuninhoBen10"
    },
    {
        "id": 8,
        "placa": "HRy7J76",
        "cliente_id": 2,
        "cliente_nome": "JuninhoBen10"
    },
    {
        "id": null,
        "placa": null,
        "cliente_id": null,
        "cliente_nome": "Sem Cliente"
    }
  ]
  ```
  
</details>

<details>
<summary><h4>Update (PUT)</h4></summary>
  
  <h4>Request (PUT car)</h4>
  
  ```json
  {
    "id": "5",
    "placa": "HRO7J76",
    "cliente_id": 1
  }
  ```
  
  <h4>Response (PUT car)</h4>
  
  ```json
  {
    "message": "ok"
  }
  ```

</details>

<details>
<summary><h4>Delete (DELETE)</h4></summary>
  
  <h4>Response (DELETE car)</h4> 
  
  ```json
    {
      "message": "ok"
    }
  ```
</details>

---

### Ticket Routes

| Method | Endpoint | Protected | Description |
|--------|----------|-----------|-------------|
| **`POST`**   | /ticket/new         | true  | Register a new ticket |
| **`GET`**    | /ticket/listAll     | true  | List all tickets |
| **`GET`**    | /ticket/listAtivo   | true  | List all active tickets |
| **`PUT`**    | /ticket/:id         | true  | Close the ticket with the sent ID |

### Examples

<details>
<summary><h4>Create (POST)</h4></summary>
  
  <h4>Request</h4>
  
  ```json
  {
    "carro": "1",
    "vaga": "2",
    "tipo": "1"
  }
  ```
  
  <h4>Response</h4>
  
  ```json
  {
    "message": "Ticket criado"
  }
  ```
  
</details>

<details>
<summary><h4>Read (GET)</h4></summary>
  
  <h4>Response</h4>
  
  ```json
  [
    {
        "hora_entrada": "11:09:53",
        "nome_cliente": "Robson",
        "nome_placa": "FRT0876",
        "tipo_vaga": "Preço por hora Carro",
        "preco_tipo": "3.79",
        "id_vaga": 2,
        "ticket_id": 15,
        "hora_saida": "Não recuperado",
        "custo": "0.0"
    },
    {
        "hora_entrada": "13:59:10",
        "nome_cliente": "Robson",
        "nome_placa": "FTR0934",
        "tipo_vaga": "Preço por hora Moto",
        "preco_tipo": "3.80",
        "id_vaga": 10,
        "ticket_id": 16,
        "hora_saida": "Não recuperado",
        "custo": "0.0"
    },
    {
        "hora_entrada": "15:44:14",
        "nome_cliente": "Robson",
        "nome_placa": "FRT0876",
        "tipo_vaga": "Preço por hora Carro",
        "preco_tipo": "3.79",
        "id_vaga": 2,
        "ticket_id": 17,
        "hora_saida": "Não recuperado",
        "custo": "0.0"
    }
]
  ```
  
</details>

<details>
<summary><h4>Close ticket (PUT)</h4></summary>

  <h4>Response</h4>
  
  ```json
  {
    "message": "ok"
  }
  ```
</details>

### Type Routes

| Method | Endpoint | Protected | Description |
|--------|----------|-----------|-------------|
| **`POST`**   | /tipo/new           | true  | Register a new type |
| **`DELETE`** | /tipo/:id           | true  | Delete type by ID |
| **`GET`**    | /tipo/list        | true  | List all types |
| **`PUT`**    | /tipo/update        | true  | Update type by ID |

### Examples

<details>
<summary><h4>Create (POST)</h4></summary>
  
  <h4>Request</h4>
  
  ```json
  {
    "preco": "12.89",
    "descr": "Hora carro"
  }
  ```
  
  <h4>Response</h4>
  
  ```json
  {
    "message": "Ok"
  }
  ```
  
</details>

<details>
<summary><h4>Update (PUT)</h4></summary>
  
  <h4>Request</h4>
  
  ```json
  {
    "id": "5",
    "preco": "14.90",
    "descr": "Via API"
  }
  ```
  
  <h4>Response</h4>
  
  ```json
  {
    "message": "Ok"
  }
  ```
  
</details>

<details>
<summary><h4>Delete (DELETE)</h4></summary>
  
  <h4>Response</h4>
  
  ```json
  {
    "message": "Ok"
  }
  ```
</details>

<details>
<summary><h4>List (GET)</h4></summary>
  
  <h4>Response</h4>
  
  ```json
 [
    {
        "id": 1,
        "preco": "3.79",
        "descr": "Preço por hora Carro"
    },
    {
        "id": 3,
        "preco": "3.80",
        "descr": "Preço por hora Moto"
    },
    {
        "id": 4,
        "preco": "444.00",
        "descr": "Teste"
    },
    {
        "id": 6,
        "preco": "12.87",
        "descr": "Teste"
    }
  ]
  ```
</details>

### Parking space Routes

| Method | Endpoint | Protected | Description |
|--------|----------|-----------|-------------|
| **`GET`**    | /vaga/new       | true | Register a new Parking space |
| **`DELETE`** | /vaga/:id      | true  | Delete Parking space by ID |
| **`GET`**    | /vaga/list     | true  | List all Parking space |


### Examples

<details>
<summary><h4>Delete (DELETE)</h4></summary>
  
  <h4>Response</h4>
  
  ```json
  {
    "message": "Ok"
  }
  ```
</details>

<details>
<summary><h4>List (GET)</h4></summary>
  
  <h4>Response</h4>
  
  ```json
  [
    {
        "id": 3,
        "estado": true
    },
    {
        "id": 4,
        "estado": true
    },
    {
        "id": 6,
        "estado": true
    }
  ]
  ```
</details>
<details>
<summary><h4>Create (GET)</h4></summary>
  
  <h4>Response</h4>
  
  ```json
 
    {
      "message": "Ok"
    }
  ```
</details>

### Client Routes

| Method | Endpoint | Protected | Description |
|--------|----------|-----------|-------------|
| **`POST`**   | /client/new           | true  | Register a new client |
| **`DELETE`** | /client/:id           | true  | Delete client by ID |
| **`GET`**    | /client/list          | true  | List all clients |
| **`PUT`**    | /client/update        | true  | Update client by ID |

### Examples

<details>
<summary><h4>Create (POST)</h4></summary>
  
  <h4>Request</h4>
  
  ```json
  {
    "nome":"Junior Ben10 mil",
    "cpf":"09889076545",
    "telefone": "999999999"
  }
  ```
  
  <h4>Response</h4>
  
  ```json
  {
    "message": "Ok"
  }
  ```
  
</details>

<details>
<summary><h4>Update (PUT)</h4></summary>
  
  <h4>Request</h4>
  
  ```json
  {
    "id": "6",
    "nome":"Junior Ben10 mil milhoes",
    "cpf":"09889076545",
    "telefone": "999999999"
  }
  ```
  
  <h4>Response</h4>
  
  ```json
  {
    "message": "Ok"
  }
  ```
  
</details>

<details>
<summary><h4>Delete (DELETE)</h4></summary>
  
  <h4>Response</h4>
  
  ```json
  {
    "message": "Ok"
  }
  ```
</details>

<details>
<summary><h4>List (GET)</h4></summary>
  
  <h4>Response</h4>
  
  ```json
 [
    {
        "id": 1,
        "nome": "Robson",
        "cpf": "03045623412",
        "telefone": "67920002212"
    },
    {
        "id": 2,
        "nome": "JuninhoBen10",
        "cpf": "03045623432",
        "telefone": "67920002212"
    },
    {
        "id": 0,
        "nome": "Sem Cliente",
        "cpf": "00000000000",
        "telefone": "00000000"
    },
    {
        "id": 8,
        "nome": "Junior Ben10 mil",
        "cpf": "09889076545",
        "telefone": "999999999"
    }
  ]
  ```
</details>

![divBar](https://user-images.githubusercontent.com/117425361/220209151-a5c53a41-c9b0-4fa7-a358-f430571ed026.png)
