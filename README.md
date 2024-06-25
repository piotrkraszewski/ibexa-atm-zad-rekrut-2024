# Ibexa ATM Application
Application is a virtual ATM machine.<br>
It allows depositing and withdrawing money through buttons that emulate real ATM buttons and keyboard.<br>
It displays current account balance and amount typed by the user.<br>
Detailed requirements available below.

In addition, deposit and withdraw functionalities were covered with unit and integration tests.

## Technologies used
Application uses React, Typescript and Vite.<br>

Test are written in Vitest and RTL.<br>
Integrations tests use extendible Page Object pattern.<br>
Vitest was used instead of jest because it is easier to setup with Vite and it runs faster.

## How to run
To install dependencies, use `npm install`<br>
To start development server, use `npm run dev`<br>
To run tests, use `npm run test`

## Requirements
The task is to create an ATM machine. The ATM should allow depositing and withdrawing money. The ATM should not allow withdrawing more money than the account balance.

Required elements:

1. Buttons for withdrawing and depositing
2. ATM-like keyboard (in the app) to enter the amount of money to deposit or withdraw with an option to clear the input
3. Display to show the amount of money to deposit or withdraw
4. Display to show account balance

What is not required:

1. Login (user is already logged)
2. Choosing a card (there is only one card/account)
