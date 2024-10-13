
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
  <a href="https://developers.moralis.com/" target="blank"><img src="https://moralis.com/_next/static/media/MoralisMoneyLogomark.968154c8.svg" width="120" alt="Moralis Logo" /></a>
  <a href="https://nodemailer.com/" target="blank"><img src="https://nodemailer.com/nm_logo_200x136.png" width="120" alt="Nodemailer Logo" /></a>
</p>

  <p align="center">An API for setting alerts and tracking blockchain prices using Moralis SDK and Nodemailer</p>
    <p align="center">
</p>


## Description

This project is a blockchain price tracker application built using **Nest.js**, designed to monitor and track the prices of **Ethereum** and **Polygon** tokens. The application provides various features for monitoring and interacting with blockchain data, including email alerts and swap rate calculations between **Ethereum** and **Bitcoin**.

## Project setup

```bash
$ npm install
```
## Environtment Variable
<table><thead>
  <tr>
    <th>Variable</th>
    <th>Description</th>
  </tr></thead>
<tbody>
  <tr>
    <td>APP_PORT</td>
    <td>Port for running application</td>
  </tr>
  <tr>
<td>DATABASE_HOST<br>DATABASE_PORT<br>DATABASE_USER<br>DATABASE_PASSWORD<br>DATABASE_NAME<br>DATABASE_SYNC</td>
    <td>For database connection using MySQL. Database sync is true for development using TypeORM</td>
  </tr>
  <tr>
    <td>MORALIS_ADDRESS<br>MORALIS_API_KEY</td>
    <td>For connecting to blockchain data platform using Moralis SDK</td>
  </tr>
  </tr>
  <tr>
    <td>SMTP_HOST<br>SMTP_PORT<br>SMTP_USER<br>SMTP_PASSWORD</td>
    <td>For connecting mail service to SMTP server using Nodemailer</td>
  </tr>
</tbody>
</table>


## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
or
$ docker compose up --build
```
## API
Access Swagger at localhost:port/api