# Roles / Keypairs


## Issuer

All this account can do is issue units of the asset and transfer it to the Distributor.

It should never be exposed or working on a server. Instead, it should more work like a cold wallet that fills up the Distributor account when needed.

It will never interact with User accounts.


## Distributor

This account gives out units of the assets to users.

It also has some XLM to found new User accounts on the Stellar Network.


## User

Many accounts, trust the Issuer, receive assets from Distributor, pay to Distributor or other users


# One Time Setup


## Install dependencies

Make sure you have `node` and `yarn` installed.

Run `yarn install` to install dependencies.

Run `yarn run` to get a list of all commands.

Make sure to run prettier (respecting the ./prettierrc.js file) before comitting changes.


## Create Issuer Account

Create account information with `yarn account:create`, put it into `.credentials_issuer.js` (see `.credentials_example.js` for the right format).

Run `yarn account:fund:test` and enter the **Public Key** of the issuers account.


## Create Distributor Account

Create account information with `yarn account:create`, put it into `.credentials_distributor.js` (see `.credentials_example.js` for the right format).

Run `yarn account:fund:test` and enter the **Public Key** of the Distributor account.

Run `yarn account:info` and enter the **Public Key** of the Distributor account to check if everything is ok.


## Give the Distributor Account some of the Coins

Run `yarn account:trust` and enter the **Private Key** of the Distributor account.

Run `yarn issuer:fund_distributor` and enter the amount of coins you want to transfer.

Run `yarn account:info` and enter the **Public Key** of the Distributor account to check if everything is ok.


# User Setup


## If no account exists

Create account information with `yarn account:create`.

Run `yarn account:fund:test` and enter the **Public Key** of the user account.

Run `yarn account:trust` and enter the **Private Key** of the user account.

Run `yarn account:info` and enter the **Public Key** of the user account to check if everything is ok.


## Add coins to the user account

Run `yarn distributor:transfer` and enter the **Public Key** of the user account as well as the amount.

Run `yarn account:info` and enter the **Public Key** of the user account to check if everything is ok.
