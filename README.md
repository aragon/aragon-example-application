# Aragon Example Application

This is a simple example of an application for Aragon.

The repository contains the UI and logic for the application, as well as the contracts.

The application itself is a simple counter - the user can increment a value in the contract or decrement it, depending on their permissions.

It showcases transactions and reducing events to state.

## Running Locally

```
npx truffle compile
aragon run
```

## Deploying

First you need to deploy the contract. Take note of the contract address and publish your first version to APM. For convenience we have included a small script in `package.json` that does this for you:

```bash
npm run publish
```

Now you can install the application in your DAO.

## Walkthrough

For a walkthrough of building this application, check out our guide ["Your First Aragon App"](#).