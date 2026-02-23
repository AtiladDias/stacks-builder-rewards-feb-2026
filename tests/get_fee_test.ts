import { Clarinet, Tx, Chain, Account, types } from "https://deno.land/x/clarinet@v1.7.0/index.ts";

Clarinet.test({
  name: "get-fee returns current fee value",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;

    // initial fee should be 0
    let ro = chain.callReadOnlyFn("proof-of-action", "get-fee", [], deployer.address);
    ro.result.expectOk().expectUint(0n);

    // set fee to 500 and read back
    const block = chain.mineBlock([
      Tx.contractCall("proof-of-action", "set-fee", [types.uint(500)], deployer.address)
    ]);
    block.receipts[0].result.expectOk().expectUint(500n);

    ro = chain.callReadOnlyFn("proof-of-action", "get-fee", [], deployer.address);
    ro.result.expectOk().expectUint(500n);
  }
});
