# 🧱 Stacks Builder Rewards – February 2026
Smart contracts, dApps and tooling built for the **Stacks Builder Rewards – February 2026** program.  
This repository contains my complete builder activity for the month, including Clarity smart contracts, a Stacks Connect dApp, tests, documentation, and development updates.

---

## 🚀 Overview

This project implements a full builder workflow on the Stacks blockchain, featuring:

### ✔️ Clarity Smart Contracts  
Fully functional contracts built as part of the Builder Rewards challenge, beginning with the **Proof-of-Action** contract — a simple and extensible on-chain action registry.

### ✔️ dApp using Stacks Connect  
A React/Next.js decentralized application with wallet login, transaction signing, and interaction with the smart contract via `@stacks/connect` and `@stacks/transactions`.

### ✔️ Tooling & Scripts  
CLI utilities, helper scripts, tests, and developer workflows built throughout the month.

### ✔️ Daily Progress  
Commits, improvements, issues, and documentation created as part of the tracking for the Talent protocol leaderboard.

---

## 📦 Project Structure

```
stacks-builder-rewards-feb-2026/
├─ contracts/
│  └─ proof-of-action.clar        # Main Clarity smart contract
│
├─ tests/
│  └─ proof-of-action_test.ts     # Contract tests (Clarinet)
│
├─ clarinet.json                  # Clarinet project configuration
│
├─ dapp/
│  ├─ package.json
│  ├─ next.config.js
│  ├─ src/
│  │  ├─ pages/
│  │  │  ├─ index.tsx             # Main UI with wallet login
│  │  │  └─ _app.tsx
│  │  ├─ lib/stacks.ts            # Contract interaction utilities
│  │  └─ components/
│  │     └─ ActionForm.tsx        # Submit on-chain actions
│  └─ ...
│
└─ README.md                      # Project documentation (this file)
```

---

## 📑 Smart Contract: Proof-of-Action

A minimal but useful Clarity contract that allows users to:

- Register actions on-chain  
- Store action hashes or short descriptions  
- Retrieve their on-chain action history  
- Track timestamps  
- Emit events  
- Pay optional fees (owner-configurable)

This type of contract is ideal for Builder Rewards because it is functional, extensible, and verifiably useful.

---

## 🧪 Testing

Tests are written using **Clarinet** and follow best practices for contract validation.

Run tests:

```bash
clarinet test
```

## 🌐 dApp (Stacks Connect)
The dApp provides:

Wallet login
On-chain action submissions
Contract read/write functions
Transaction signing using @stacks/connect
Integration with the deployed smart contract

Run locally:

cd dapp
npm install
npm run dev

## 🔧 Tooling
This repository may also include supporting tools such as:

CLI transaction sender
Batch action generator
Automated testing scripts
Deployment helpers

These improvements will be added progressively throughout February.

## 📅 Roadmap (February 2026)

 Create repository and base structure
 Add Proof-of-Action contract
 Extend contract with advanced features (fees, events, admin tools)
 Build complete dApp interface (history, confirmations, UI polish)
 Add API / indexing integration
 Add CLI utilities
 Improve documentation and tutorials
 Contribute to external Stacks repos (issues/PRs)
 Final deployment (testnet/mainnet)

## 🔗 Useful Links

Stacks Documentation: https://docs.stacks.co
Clarity Language Docs: https://docs.stacks.co/write-smart-contracts/clarity-language
Stacks Connect Docs: https://docs.stacks.co/build-apps/transaction-signing
Clarinet: https://github.com/hirosystems/clarinet

## 📜 License
This project is released under the MIT License.
You are free to use, modify, and build upon this software.

## 👤 Author
Átila Dias
Builder – Stacks Builder Rewards (February 2026)
