import {
  Clarinet,
  Tx,
  Chain,
  Account,
  types
} from "https://deno.land/x/clarinet@v1.7.0/index.ts";

Clarinet.test({
  name: "record-action stores hash and increments id; read functions return expected values",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const user = accounts.get("wallet_1")!;

    // Call record-action with a short buffer (<= 32 bytes)
    const block = chain.mineBlock([
      Tx.contractCall(
        "proof-of-action",
        "record-action",
        [types.buff("0x1234")],
        user.address
      ),
    ]);
    block.receipts[0].result.expectOk().expectUint(1n);

    // get-count should be 1
    const countRO = chain.callReadOnlyFn(
      "proof-of-action",
      "get-count",
      [types.principal(user.address)],
      user.address
    );
    countRO.result.expectOk().expectUint(1n);

    // get-action should return the same hash
    const actionRO = chain.callReadOnlyFn(
      "proof-of-action",
      "get-action",
      [types.principal(user.address), types.uint(1)],
      user.address
    );
    const tup = actionRO.result.expectOk().expectTuple();
    tup["hash"].expectBuff("0x1234");
  },
});
