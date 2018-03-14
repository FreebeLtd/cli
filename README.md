<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
**Table of Contents**

- [Quickstart Demo Version](#quickstart-demo-version)
- [Roles / Keypairs](#roles--keypairs)
    - [Issuer](#issuer)
    - [Distributor](#distributor)
    - [User](#user)
- [One Time Setup](#one-time-setup)
    - [Install dependencies](#install-dependencies)
    - [Generate Issuer Account](#generate-issuer-account)
    - [Generate Distributor Account](#generate-distributor-account)
    - [Give the Distributor Account some of the Coins](#give-the-distributor-account-some-of-the-coins)
- [User Setup](#user-setup)
    - [If no account exists](#if-no-account-exists)
        - [All in one user account creation on testnet](#all-in-one-user-account-creation-on-testnet)
        - [Step by step user account creation](#step-by-step-user-account-creation)
    - [Add initial coins to the user account](#add-initial-coins-to-the-user-account)
- [General Tasks](#general-tasks)
    - [Get balances and general information about any account](#get-balances-and-general-information-about-any-account)
    - [Transfer coins from user to user](#transfer-coins-from-user-to-user)
    - [Get Information about Asset](#get-information-about-asset)
    - [Live Stream of Effects of Asset](#live-stream-of-effects-of-asset)

<!-- markdown-toc end -->

# Quickstart Demo Version

* Clone git repository
* Run `yarn install`
* Rename `.credentials_distributor_demo.js` to `.credentials_distributor.js`
* Rename `.credentials_issuer_demo.js` to `.credentials_issuer.js`
* Run `yarn run` to get an overview over the available tasks
* Run `yarn account:create:test
* Go to [cndy.store](http://cndy.store) and see the changes on the dashboard

**Note**: Please be aware that you are sharing private keys with everyone else when using demo mode!


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


## Generate Issuer Account

Generate account information with `yarn account:generate`, put it into `.credentials_issuer.js` (see `.credentials_example.js` for the right format).

Run `yarn account:fund:test` and enter the **Public Key** of the issuers account.


## Generate Distributor Account

Generate account information with `yarn account:generate`, put it into `.credentials_distributor.js` (see `.credentials_example.js` for the right format).

Run `yarn account:fund:test` and enter the **Public Key** of the Distributor account.

Run `yarn account:info` and enter the **Public Key** of the Distributor account to check if everything is ok.


## Give the Distributor Account some of the Coins

Run `yarn account:trust` and enter the **Private Key** of the Distributor account.

Run `yarn issuer:fund_distributor` and enter the amount of coins you want to transfer.

Run `yarn account:info` and enter the **Public Key** of the Distributor account to check if everything is ok.


# User Setup


## If no account exists


### All in one user account creation on testnet


Run `yarn account:create:test`, which will:

* Create a new keypair
* Fund the keypair on testnet
* Create trustline for asset on new account
* Transfer a given amount of asset to new account

When completed, the task will provide the **Public Key** and the **Private Key** (in form of a QR code) as output.


### Step by step user account creation

Generate account information with `yarn account:generate`.

Run `yarn account:fund:test` and enter the **Public Key** of the user account.

Run `yarn account:trust` and enter the **Private Key** of the user account.

Run `yarn account:info` and enter the **Public Key** of the user account to check if everything is ok.


## Add initial coins to the user account

Run `yarn distributor:transfer` and enter the **Public Key** of the receiving user account as well as the amount.

Run `yarn account:info` and enter the **Public Key** of the receiving user account to check if everything is ok.


# General Tasks


## Get balances and general information about any account

Run `yarn account:info` and enter the **Public Key** of the account.


## Transfer coins from user to user

Run `yarn account:transfer` to transfer an amount of the asset from one account to another. You will need the **Public Key** of the receiving account, but the **Private Key** of the sending account.


## Get Information about Asset

Run `yarn asset:info` to get a short overview over the asset.

## Live Stream of Effects of Asset

Run `yarn asset:watch` to get live stream of what happens with the asset in real-time.
