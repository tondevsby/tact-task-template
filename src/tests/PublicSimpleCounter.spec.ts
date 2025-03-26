import { Blockchain, SandboxContract, TreasuryContract, BlockchainSnapshot } from "@ton/sandbox";
import { toNano } from "@ton/core";
import { SimpleCounter } from "../wrappers/SimpleCounter";
import "@ton/test-utils";

describe("SimpleCounter", () => {
  let blockchain: Blockchain;
  let deployer: SandboxContract<TreasuryContract>;
  let simpleCounter: SandboxContract<SimpleCounter>;
  let snapshot: BlockchainSnapshot;

  const tonLimit = toNano("0.01");

  beforeAll(async () => {
    blockchain = await Blockchain.create();

    simpleCounter = blockchain.openContract(await SimpleCounter.fromInit(0n));

    deployer = await blockchain.treasury("deployer");

    const deployResult = await simpleCounter.send(
      deployer.getSender(),
      {
        value: tonLimit,
      },
      {
        $$type: "Deploy",
        queryId: 0n,
      }
    );

    expect(deployResult.transactions).toHaveTransaction({
      from: deployer.address,
      to: simpleCounter.address,
      deploy: true,
      success: true,
    });

    snapshot = blockchain.snapshot();
  });

  beforeEach(async () => {
    await blockchain.loadFrom(snapshot);
  });

  it("should deploy", async () => {});

  it("should increase counter", async () => {
    const increaseTimes = 3;
    for (let i = 0; i < increaseTimes; i++) {
      const increaser = await blockchain.treasury("increaser" + i);

      const counterBefore = await simpleCounter.getCounter();

      const increaseBy = BigInt(Math.floor(Math.random() * 100));

      const increaseResult = await simpleCounter.send(
        increaser.getSender(),
        {
          value: tonLimit,
        },
        {
          $$type: "Add",
          amount: increaseBy,
        }
      );

      expect(increaseResult.transactions).toHaveTransaction({
        from: increaser.address,
        to: simpleCounter.address,
        success: true,
      });

      const counterAfter = await simpleCounter.getCounter();

      expect(counterAfter).toBe(counterBefore + increaseBy);
    }
  });

  it("should increase counter uint265", async () => {
    let increaseResult = await simpleCounter.send(
      deployer.getSender(),
      {
        value: tonLimit,
      },
      {
        $$type: "Add",
        amount: 115792089237316195423570985008687907853269984665640564039457584007913129639935n - 1n,
      }
    );

    expect(increaseResult.transactions).toHaveTransaction({
      from: deployer.address,
      to: simpleCounter.address,
      success: true,
    });

    let counterAfter = await simpleCounter.getCounter();
    expect(counterAfter).toBe(115792089237316195423570985008687907853269984665640564039457584007913129639935n - 1n);

    increaseResult = await simpleCounter.send(
      deployer.getSender(),
      {
        value: tonLimit,
      },
      {
        $$type: "Add",
        amount: 1n,
      }
    );

    counterAfter = await simpleCounter.getCounter();
    expect(counterAfter).toBe(115792089237316195423570985008687907853269984665640564039457584007913129639935n);
  });
});
