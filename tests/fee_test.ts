import { Clarinet, Tx, Chain, Account, types } from "https://deno.land/x/clarinet@v1.7.0/index.ts";

Clarinet.test({
  name: "only contract owner can set fee",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const user = accounts.get("wallet_1")!;

    // non-owner -> err u100
    let block = chain.mineBlock([
      Tx.contractCall("proof-of-action", "set-fee", [types.uint(1000)], user.address),
    ]);
    block.receipts[0].result.expectErr().expectUint(100n);

    // owner -> ok u1000
    block = chain.mineBlock([
      Tx.contractCall("proof-of-action", "set-fee", [types.uint(1000)], deployer.address),
    ]);
    block.receipts[0].result.expectOk().expectUint(1000n);
  }
});
``
