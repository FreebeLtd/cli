<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
**Table of Contents**

- [Roles / Keypairs](#roles--keypairs)
    - [Issuer](#issuer)
    - [Distributor](#distributor)
    - [User](#user)
- [One Time Setup](#one-time-setup)
    - [Install dependencies](#install-dependencies)
    - [Create Issuer Account](#create-issuer-account)
    - [Create Distributor Account](#create-distributor-account)
    - [Give the Distributor Account some of the Coins](#give-the-distributor-account-some-of-the-coins)
- [User Setup](#user-setup)
    - [If no account exists](#if-no-account-exists)
    - [Add initial coins to the user account](#add-initial-coins-to-the-user-account)
- [General Tasks](#general-tasks)
    - [Get balances and general information about any account](#get-balances-and-general-information-about-any-account)
    - [Transfer coins from user to user](#transfer-coins-from-user-to-user)
    - [Get Information about Asset](#get-information-about-asset)
    - [Live Stream of Effects of Asset](#live-stream-of-effects-of-asset)

<!-- markdown-toc end -->


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
