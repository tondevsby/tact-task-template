import {
  Cell,
  Slice,
  Address,
  Builder,
  beginCell,
  ComputeError,
  TupleItem,
  TupleReader,
  Dictionary,
  contractAddress,
  address,
  ContractProvider,
  Sender,
  Contract,
  ContractABI,
  ABIType,
  ABIGetter,
  ABIReceiver,
  TupleBuilder,
  DictionaryValue,
} from "@ton/core";

export type DataSize = {
  $$type: "DataSize";
  cells: bigint;
  bits: bigint;
  refs: bigint;
};

export function storeDataSize(src: DataSize) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeInt(src.cells, 257);
    b_0.storeInt(src.bits, 257);
    b_0.storeInt(src.refs, 257);
  };
}

export function loadDataSize(slice: Slice) {
  const sc_0 = slice;
  const _cells = sc_0.loadIntBig(257);
  const _bits = sc_0.loadIntBig(257);
  const _refs = sc_0.loadIntBig(257);
  return { $$type: "DataSize" as const, cells: _cells, bits: _bits, refs: _refs };
}

function loadTupleDataSize(source: TupleReader) {
  const _cells = source.readBigNumber();
  const _bits = source.readBigNumber();
  const _refs = source.readBigNumber();
  return { $$type: "DataSize" as const, cells: _cells, bits: _bits, refs: _refs };
}

function loadGetterTupleDataSize(source: TupleReader) {
  const _cells = source.readBigNumber();
  const _bits = source.readBigNumber();
  const _refs = source.readBigNumber();
  return { $$type: "DataSize" as const, cells: _cells, bits: _bits, refs: _refs };
}

function storeTupleDataSize(source: DataSize) {
  const builder = new TupleBuilder();
  builder.writeNumber(source.cells);
  builder.writeNumber(source.bits);
  builder.writeNumber(source.refs);
  return builder.build();
}

function dictValueParserDataSize(): DictionaryValue<DataSize> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeDataSize(src)).endCell());
    },
    parse: (src) => {
      return loadDataSize(src.loadRef().beginParse());
    },
  };
}

export type StateInit = {
  $$type: "StateInit";
  code: Cell;
  data: Cell;
};

export function storeStateInit(src: StateInit) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeRef(src.code);
    b_0.storeRef(src.data);
  };
}

export function loadStateInit(slice: Slice) {
  const sc_0 = slice;
  const _code = sc_0.loadRef();
  const _data = sc_0.loadRef();
  return { $$type: "StateInit" as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
  const _code = source.readCell();
  const _data = source.readCell();
  return { $$type: "StateInit" as const, code: _code, data: _data };
}

function loadGetterTupleStateInit(source: TupleReader) {
  const _code = source.readCell();
  const _data = source.readCell();
  return { $$type: "StateInit" as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
  const builder = new TupleBuilder();
  builder.writeCell(source.code);
  builder.writeCell(source.data);
  return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
    },
    parse: (src) => {
      return loadStateInit(src.loadRef().beginParse());
    },
  };
}

export type Context = {
  $$type: "Context";
  bounceable: boolean;
  sender: Address;
  value: bigint;
  raw: Slice;
};

export function storeContext(src: Context) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeBit(src.bounceable);
    b_0.storeAddress(src.sender);
    b_0.storeInt(src.value, 257);
    b_0.storeRef(src.raw.asCell());
  };
}

export function loadContext(slice: Slice) {
  const sc_0 = slice;
  const _bounceable = sc_0.loadBit();
  const _sender = sc_0.loadAddress();
  const _value = sc_0.loadIntBig(257);
  const _raw = sc_0.loadRef().asSlice();
  return { $$type: "Context" as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
  const _bounceable = source.readBoolean();
  const _sender = source.readAddress();
  const _value = source.readBigNumber();
  const _raw = source.readCell().asSlice();
  return { $$type: "Context" as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

function loadGetterTupleContext(source: TupleReader) {
  const _bounceable = source.readBoolean();
  const _sender = source.readAddress();
  const _value = source.readBigNumber();
  const _raw = source.readCell().asSlice();
  return { $$type: "Context" as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
  const builder = new TupleBuilder();
  builder.writeBoolean(source.bounceable);
  builder.writeAddress(source.sender);
  builder.writeNumber(source.value);
  builder.writeSlice(source.raw.asCell());
  return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeContext(src)).endCell());
    },
    parse: (src) => {
      return loadContext(src.loadRef().beginParse());
    },
  };
}

export type SendParameters = {
  $$type: "SendParameters";
  mode: bigint;
  body: Cell | null;
  code: Cell | null;
  data: Cell | null;
  value: bigint;
  to: Address;
  bounce: boolean;
};

export function storeSendParameters(src: SendParameters) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeInt(src.mode, 257);
    if (src.body !== null && src.body !== undefined) {
      b_0.storeBit(true).storeRef(src.body);
    } else {
      b_0.storeBit(false);
    }
    if (src.code !== null && src.code !== undefined) {
      b_0.storeBit(true).storeRef(src.code);
    } else {
      b_0.storeBit(false);
    }
    if (src.data !== null && src.data !== undefined) {
      b_0.storeBit(true).storeRef(src.data);
    } else {
      b_0.storeBit(false);
    }
    b_0.storeInt(src.value, 257);
    b_0.storeAddress(src.to);
    b_0.storeBit(src.bounce);
  };
}

export function loadSendParameters(slice: Slice) {
  const sc_0 = slice;
  const _mode = sc_0.loadIntBig(257);
  const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
  const _code = sc_0.loadBit() ? sc_0.loadRef() : null;
  const _data = sc_0.loadBit() ? sc_0.loadRef() : null;
  const _value = sc_0.loadIntBig(257);
  const _to = sc_0.loadAddress();
  const _bounce = sc_0.loadBit();
  return {
    $$type: "SendParameters" as const,
    mode: _mode,
    body: _body,
    code: _code,
    data: _data,
    value: _value,
    to: _to,
    bounce: _bounce,
  };
}

function loadTupleSendParameters(source: TupleReader) {
  const _mode = source.readBigNumber();
  const _body = source.readCellOpt();
  const _code = source.readCellOpt();
  const _data = source.readCellOpt();
  const _value = source.readBigNumber();
  const _to = source.readAddress();
  const _bounce = source.readBoolean();
  return {
    $$type: "SendParameters" as const,
    mode: _mode,
    body: _body,
    code: _code,
    data: _data,
    value: _value,
    to: _to,
    bounce: _bounce,
  };
}

function loadGetterTupleSendParameters(source: TupleReader) {
  const _mode = source.readBigNumber();
  const _body = source.readCellOpt();
  const _code = source.readCellOpt();
  const _data = source.readCellOpt();
  const _value = source.readBigNumber();
  const _to = source.readAddress();
  const _bounce = source.readBoolean();
  return {
    $$type: "SendParameters" as const,
    mode: _mode,
    body: _body,
    code: _code,
    data: _data,
    value: _value,
    to: _to,
    bounce: _bounce,
  };
}

function storeTupleSendParameters(source: SendParameters) {
  const builder = new TupleBuilder();
  builder.writeNumber(source.mode);
  builder.writeCell(source.body);
  builder.writeCell(source.code);
  builder.writeCell(source.data);
  builder.writeNumber(source.value);
  builder.writeAddress(source.to);
  builder.writeBoolean(source.bounce);
  return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
    },
    parse: (src) => {
      return loadSendParameters(src.loadRef().beginParse());
    },
  };
}

export type MessageParameters = {
  $$type: "MessageParameters";
  mode: bigint;
  body: Cell | null;
  value: bigint;
  to: Address;
  bounce: boolean;
};

export function storeMessageParameters(src: MessageParameters) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeInt(src.mode, 257);
    if (src.body !== null && src.body !== undefined) {
      b_0.storeBit(true).storeRef(src.body);
    } else {
      b_0.storeBit(false);
    }
    b_0.storeInt(src.value, 257);
    b_0.storeAddress(src.to);
    b_0.storeBit(src.bounce);
  };
}

export function loadMessageParameters(slice: Slice) {
  const sc_0 = slice;
  const _mode = sc_0.loadIntBig(257);
  const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
  const _value = sc_0.loadIntBig(257);
  const _to = sc_0.loadAddress();
  const _bounce = sc_0.loadBit();
  return { $$type: "MessageParameters" as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

function loadTupleMessageParameters(source: TupleReader) {
  const _mode = source.readBigNumber();
  const _body = source.readCellOpt();
  const _value = source.readBigNumber();
  const _to = source.readAddress();
  const _bounce = source.readBoolean();
  return { $$type: "MessageParameters" as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

function loadGetterTupleMessageParameters(source: TupleReader) {
  const _mode = source.readBigNumber();
  const _body = source.readCellOpt();
  const _value = source.readBigNumber();
  const _to = source.readAddress();
  const _bounce = source.readBoolean();
  return { $$type: "MessageParameters" as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

function storeTupleMessageParameters(source: MessageParameters) {
  const builder = new TupleBuilder();
  builder.writeNumber(source.mode);
  builder.writeCell(source.body);
  builder.writeNumber(source.value);
  builder.writeAddress(source.to);
  builder.writeBoolean(source.bounce);
  return builder.build();
}

function dictValueParserMessageParameters(): DictionaryValue<MessageParameters> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeMessageParameters(src)).endCell());
    },
    parse: (src) => {
      return loadMessageParameters(src.loadRef().beginParse());
    },
  };
}

export type DeployParameters = {
  $$type: "DeployParameters";
  mode: bigint;
  body: Cell | null;
  value: bigint;
  bounce: boolean;
  init: StateInit;
};

export function storeDeployParameters(src: DeployParameters) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeInt(src.mode, 257);
    if (src.body !== null && src.body !== undefined) {
      b_0.storeBit(true).storeRef(src.body);
    } else {
      b_0.storeBit(false);
    }
    b_0.storeInt(src.value, 257);
    b_0.storeBit(src.bounce);
    b_0.store(storeStateInit(src.init));
  };
}

export function loadDeployParameters(slice: Slice) {
  const sc_0 = slice;
  const _mode = sc_0.loadIntBig(257);
  const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
  const _value = sc_0.loadIntBig(257);
  const _bounce = sc_0.loadBit();
  const _init = loadStateInit(sc_0);
  return { $$type: "DeployParameters" as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

function loadTupleDeployParameters(source: TupleReader) {
  const _mode = source.readBigNumber();
  const _body = source.readCellOpt();
  const _value = source.readBigNumber();
  const _bounce = source.readBoolean();
  const _init = loadTupleStateInit(source);
  return { $$type: "DeployParameters" as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

function loadGetterTupleDeployParameters(source: TupleReader) {
  const _mode = source.readBigNumber();
  const _body = source.readCellOpt();
  const _value = source.readBigNumber();
  const _bounce = source.readBoolean();
  const _init = loadGetterTupleStateInit(source);
  return { $$type: "DeployParameters" as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

function storeTupleDeployParameters(source: DeployParameters) {
  const builder = new TupleBuilder();
  builder.writeNumber(source.mode);
  builder.writeCell(source.body);
  builder.writeNumber(source.value);
  builder.writeBoolean(source.bounce);
  builder.writeTuple(storeTupleStateInit(source.init));
  return builder.build();
}

function dictValueParserDeployParameters(): DictionaryValue<DeployParameters> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeDeployParameters(src)).endCell());
    },
    parse: (src) => {
      return loadDeployParameters(src.loadRef().beginParse());
    },
  };
}

export type StdAddress = {
  $$type: "StdAddress";
  workchain: bigint;
  address: bigint;
};

export function storeStdAddress(src: StdAddress) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeInt(src.workchain, 8);
    b_0.storeUint(src.address, 256);
  };
}

export function loadStdAddress(slice: Slice) {
  const sc_0 = slice;
  const _workchain = sc_0.loadIntBig(8);
  const _address = sc_0.loadUintBig(256);
  return { $$type: "StdAddress" as const, workchain: _workchain, address: _address };
}

function loadTupleStdAddress(source: TupleReader) {
  const _workchain = source.readBigNumber();
  const _address = source.readBigNumber();
  return { $$type: "StdAddress" as const, workchain: _workchain, address: _address };
}

function loadGetterTupleStdAddress(source: TupleReader) {
  const _workchain = source.readBigNumber();
  const _address = source.readBigNumber();
  return { $$type: "StdAddress" as const, workchain: _workchain, address: _address };
}

function storeTupleStdAddress(source: StdAddress) {
  const builder = new TupleBuilder();
  builder.writeNumber(source.workchain);
  builder.writeNumber(source.address);
  return builder.build();
}

function dictValueParserStdAddress(): DictionaryValue<StdAddress> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeStdAddress(src)).endCell());
    },
    parse: (src) => {
      return loadStdAddress(src.loadRef().beginParse());
    },
  };
}

export type VarAddress = {
  $$type: "VarAddress";
  workchain: bigint;
  address: Slice;
};

export function storeVarAddress(src: VarAddress) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeInt(src.workchain, 32);
    b_0.storeRef(src.address.asCell());
  };
}

export function loadVarAddress(slice: Slice) {
  const sc_0 = slice;
  const _workchain = sc_0.loadIntBig(32);
  const _address = sc_0.loadRef().asSlice();
  return { $$type: "VarAddress" as const, workchain: _workchain, address: _address };
}

function loadTupleVarAddress(source: TupleReader) {
  const _workchain = source.readBigNumber();
  const _address = source.readCell().asSlice();
  return { $$type: "VarAddress" as const, workchain: _workchain, address: _address };
}

function loadGetterTupleVarAddress(source: TupleReader) {
  const _workchain = source.readBigNumber();
  const _address = source.readCell().asSlice();
  return { $$type: "VarAddress" as const, workchain: _workchain, address: _address };
}

function storeTupleVarAddress(source: VarAddress) {
  const builder = new TupleBuilder();
  builder.writeNumber(source.workchain);
  builder.writeSlice(source.address.asCell());
  return builder.build();
}

function dictValueParserVarAddress(): DictionaryValue<VarAddress> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeVarAddress(src)).endCell());
    },
    parse: (src) => {
      return loadVarAddress(src.loadRef().beginParse());
    },
  };
}

export type BasechainAddress = {
  $$type: "BasechainAddress";
  hash: bigint | null;
};

export function storeBasechainAddress(src: BasechainAddress) {
  return (builder: Builder) => {
    const b_0 = builder;
    if (src.hash !== null && src.hash !== undefined) {
      b_0.storeBit(true).storeInt(src.hash, 257);
    } else {
      b_0.storeBit(false);
    }
  };
}

export function loadBasechainAddress(slice: Slice) {
  const sc_0 = slice;
  const _hash = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
  return { $$type: "BasechainAddress" as const, hash: _hash };
}

function loadTupleBasechainAddress(source: TupleReader) {
  const _hash = source.readBigNumberOpt();
  return { $$type: "BasechainAddress" as const, hash: _hash };
}

function loadGetterTupleBasechainAddress(source: TupleReader) {
  const _hash = source.readBigNumberOpt();
  return { $$type: "BasechainAddress" as const, hash: _hash };
}

function storeTupleBasechainAddress(source: BasechainAddress) {
  const builder = new TupleBuilder();
  builder.writeNumber(source.hash);
  return builder.build();
}

function dictValueParserBasechainAddress(): DictionaryValue<BasechainAddress> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeBasechainAddress(src)).endCell());
    },
    parse: (src) => {
      return loadBasechainAddress(src.loadRef().beginParse());
    },
  };
}

export type Deploy = {
  $$type: "Deploy";
  queryId: bigint;
};

export function storeDeploy(src: Deploy) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(2490013878, 32);
    b_0.storeUint(src.queryId, 64);
  };
}

export function loadDeploy(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 2490013878) {
    throw Error("Invalid prefix");
  }
  const _queryId = sc_0.loadUintBig(64);
  return { $$type: "Deploy" as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
  const _queryId = source.readBigNumber();
  return { $$type: "Deploy" as const, queryId: _queryId };
}

function loadGetterTupleDeploy(source: TupleReader) {
  const _queryId = source.readBigNumber();
  return { $$type: "Deploy" as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
  const builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
    },
    parse: (src) => {
      return loadDeploy(src.loadRef().beginParse());
    },
  };
}

export type DeployOk = {
  $$type: "DeployOk";
  queryId: bigint;
};

export function storeDeployOk(src: DeployOk) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(2952335191, 32);
    b_0.storeUint(src.queryId, 64);
  };
}

export function loadDeployOk(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 2952335191) {
    throw Error("Invalid prefix");
  }
  const _queryId = sc_0.loadUintBig(64);
  return { $$type: "DeployOk" as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
  const _queryId = source.readBigNumber();
  return { $$type: "DeployOk" as const, queryId: _queryId };
}

function loadGetterTupleDeployOk(source: TupleReader) {
  const _queryId = source.readBigNumber();
  return { $$type: "DeployOk" as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
  const builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
    },
    parse: (src) => {
      return loadDeployOk(src.loadRef().beginParse());
    },
  };
}

export type FactoryDeploy = {
  $$type: "FactoryDeploy";
  queryId: bigint;
  cashback: Address;
};

export function storeFactoryDeploy(src: FactoryDeploy) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(1829761339, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeAddress(src.cashback);
  };
}

export function loadFactoryDeploy(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 1829761339) {
    throw Error("Invalid prefix");
  }
  const _queryId = sc_0.loadUintBig(64);
  const _cashback = sc_0.loadAddress();
  return { $$type: "FactoryDeploy" as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
  const _queryId = source.readBigNumber();
  const _cashback = source.readAddress();
  return { $$type: "FactoryDeploy" as const, queryId: _queryId, cashback: _cashback };
}

function loadGetterTupleFactoryDeploy(source: TupleReader) {
  const _queryId = source.readBigNumber();
  const _cashback = source.readAddress();
  return { $$type: "FactoryDeploy" as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
  const builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeAddress(source.cashback);
  return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
    },
    parse: (src) => {
      return loadFactoryDeploy(src.loadRef().beginParse());
    },
  };
}

export type Add = {
  $$type: "Add";
  amount: bigint;
};

export function storeAdd(src: Add) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(2877003001, 32);
    b_0.storeUint(src.amount, 256);
  };
}

export function loadAdd(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 2877003001) {
    throw Error("Invalid prefix");
  }
  const _amount = sc_0.loadUintBig(256);
  return { $$type: "Add" as const, amount: _amount };
}

function loadTupleAdd(source: TupleReader) {
  const _amount = source.readBigNumber();
  return { $$type: "Add" as const, amount: _amount };
}

function loadGetterTupleAdd(source: TupleReader) {
  const _amount = source.readBigNumber();
  return { $$type: "Add" as const, amount: _amount };
}

function storeTupleAdd(source: Add) {
  const builder = new TupleBuilder();
  builder.writeNumber(source.amount);
  return builder.build();
}

function dictValueParserAdd(): DictionaryValue<Add> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeAdd(src)).endCell());
    },
    parse: (src) => {
      return loadAdd(src.loadRef().beginParse());
    },
  };
}

export type SimpleCounter$Data = {
  $$type: "SimpleCounter$Data";
  id: bigint;
  counter: bigint;
};

export function storeSimpleCounter$Data(src: SimpleCounter$Data) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(src.id, 32);
    b_0.storeUint(src.counter, 256);
  };
}

export function loadSimpleCounter$Data(slice: Slice) {
  const sc_0 = slice;
  const _id = sc_0.loadUintBig(32);
  const _counter = sc_0.loadUintBig(256);
  return { $$type: "SimpleCounter$Data" as const, id: _id, counter: _counter };
}

function loadTupleSimpleCounter$Data(source: TupleReader) {
  const _id = source.readBigNumber();
  const _counter = source.readBigNumber();
  return { $$type: "SimpleCounter$Data" as const, id: _id, counter: _counter };
}

function loadGetterTupleSimpleCounter$Data(source: TupleReader) {
  const _id = source.readBigNumber();
  const _counter = source.readBigNumber();
  return { $$type: "SimpleCounter$Data" as const, id: _id, counter: _counter };
}

function storeTupleSimpleCounter$Data(source: SimpleCounter$Data) {
  const builder = new TupleBuilder();
  builder.writeNumber(source.id);
  builder.writeNumber(source.counter);
  return builder.build();
}

function dictValueParserSimpleCounter$Data(): DictionaryValue<SimpleCounter$Data> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeSimpleCounter$Data(src)).endCell());
    },
    parse: (src) => {
      return loadSimpleCounter$Data(src.loadRef().beginParse());
    },
  };
}

type SimpleCounter_init_args = {
  $$type: "SimpleCounter_init_args";
  id: bigint;
};

function initSimpleCounter_init_args(src: SimpleCounter_init_args) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeInt(src.id, 257);
  };
}

async function SimpleCounter_init(id: bigint) {
  const __code = Cell.fromHex(
    "b5ee9c7241020b01000166000114ff00f4a413f4bcf2c80b01020162020603e8d001d072d721d200d200fa4021103450666f04f86102f862ed44d0d2000197d31fd3ff596c1299810101d7000101d170e203925f03e001d70d1ff2e082218210ab7b94f9ba8f1d31d3ff013112a088f84201706ddb3cc87f01ca005902cb1fcbffc9ed54e0018210946a98b6bae3025f03f2c082030504001800000000436173686261636b0150d33f0131c8018210aff90f5758cb1fcb3fc912f84201706ddb3cc87f01ca005902cb1fcbffc9ed540500a06d6d226eb3995b206ef2d0806f22019132e21024700304804250231036552212c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0002037d380709013eaa18ed44d0d2000197d31fd3ff596c1299810101d7000101d170e2db3c6c2108000220013ea990ed44d0d2000197d31fd3ff596c1299810101d7000101d170e2db3c6c210a000221c5049af9"
  );
  const builder = beginCell();
  builder.storeUint(0, 1);
  initSimpleCounter_init_args({ $$type: "SimpleCounter_init_args", id })(builder);
  const __data = builder.endCell();
  return { code: __code, data: __data };
}

export const SimpleCounter_errors = {
  2: { message: `Stack underflow` },
  3: { message: `Stack overflow` },
  4: { message: `Integer overflow` },
  5: { message: `Integer out of expected range` },
  6: { message: `Invalid opcode` },
  7: { message: `Type check error` },
  8: { message: `Cell overflow` },
  9: { message: `Cell underflow` },
  10: { message: `Dictionary error` },
  11: { message: `'Unknown' error` },
  12: { message: `Fatal error` },
  13: { message: `Out of gas error` },
  14: { message: `Virtualization error` },
  32: { message: `Action list is invalid` },
  33: { message: `Action list is too long` },
  34: { message: `Action is invalid or not supported` },
  35: { message: `Invalid source address in outbound message` },
  36: { message: `Invalid destination address in outbound message` },
  37: { message: `Not enough Toncoin` },
  38: { message: `Not enough extra currencies` },
  39: { message: `Outbound message does not fit into a cell after rewriting` },
  40: { message: `Cannot process a message` },
  41: { message: `Library reference is null` },
  42: { message: `Library change action error` },
  43: { message: `Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree` },
  50: { message: `Account state size exceeded limits` },
  128: { message: `Null reference exception` },
  129: { message: `Invalid serialization prefix` },
  130: { message: `Invalid incoming message` },
  131: { message: `Constraints error` },
  132: { message: `Access denied` },
  133: { message: `Contract stopped` },
  134: { message: `Invalid argument` },
  135: { message: `Code of a contract was not found` },
  136: { message: `Invalid standard address` },
  138: { message: `Not a basechain address` },
} as const;

export const SimpleCounter_errors_backward = {
  "Stack underflow": 2,
  "Stack overflow": 3,
  "Integer overflow": 4,
  "Integer out of expected range": 5,
  "Invalid opcode": 6,
  "Type check error": 7,
  "Cell overflow": 8,
  "Cell underflow": 9,
  "Dictionary error": 10,
  "'Unknown' error": 11,
  "Fatal error": 12,
  "Out of gas error": 13,
  "Virtualization error": 14,
  "Action list is invalid": 32,
  "Action list is too long": 33,
  "Action is invalid or not supported": 34,
  "Invalid source address in outbound message": 35,
  "Invalid destination address in outbound message": 36,
  "Not enough Toncoin": 37,
  "Not enough extra currencies": 38,
  "Outbound message does not fit into a cell after rewriting": 39,
  "Cannot process a message": 40,
  "Library reference is null": 41,
  "Library change action error": 42,
  "Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree": 43,
  "Account state size exceeded limits": 50,
  "Null reference exception": 128,
  "Invalid serialization prefix": 129,
  "Invalid incoming message": 130,
  "Constraints error": 131,
  "Access denied": 132,
  "Contract stopped": 133,
  "Invalid argument": 134,
  "Code of a contract was not found": 135,
  "Invalid standard address": 136,
  "Not a basechain address": 138,
} as const;

const SimpleCounter_types: ABIType[] = [
  {
    name: "DataSize",
    header: null,
    fields: [
      { name: "cells", type: { kind: "simple", type: "int", optional: false, format: 257 } },
      { name: "bits", type: { kind: "simple", type: "int", optional: false, format: 257 } },
      { name: "refs", type: { kind: "simple", type: "int", optional: false, format: 257 } },
    ],
  },
  {
    name: "StateInit",
    header: null,
    fields: [
      { name: "code", type: { kind: "simple", type: "cell", optional: false } },
      { name: "data", type: { kind: "simple", type: "cell", optional: false } },
    ],
  },
  {
    name: "Context",
    header: null,
    fields: [
      { name: "bounceable", type: { kind: "simple", type: "bool", optional: false } },
      { name: "sender", type: { kind: "simple", type: "address", optional: false } },
      { name: "value", type: { kind: "simple", type: "int", optional: false, format: 257 } },
      { name: "raw", type: { kind: "simple", type: "slice", optional: false } },
    ],
  },
  {
    name: "SendParameters",
    header: null,
    fields: [
      { name: "mode", type: { kind: "simple", type: "int", optional: false, format: 257 } },
      { name: "body", type: { kind: "simple", type: "cell", optional: true } },
      { name: "code", type: { kind: "simple", type: "cell", optional: true } },
      { name: "data", type: { kind: "simple", type: "cell", optional: true } },
      { name: "value", type: { kind: "simple", type: "int", optional: false, format: 257 } },
      { name: "to", type: { kind: "simple", type: "address", optional: false } },
      { name: "bounce", type: { kind: "simple", type: "bool", optional: false } },
    ],
  },
  {
    name: "MessageParameters",
    header: null,
    fields: [
      { name: "mode", type: { kind: "simple", type: "int", optional: false, format: 257 } },
      { name: "body", type: { kind: "simple", type: "cell", optional: true } },
      { name: "value", type: { kind: "simple", type: "int", optional: false, format: 257 } },
      { name: "to", type: { kind: "simple", type: "address", optional: false } },
      { name: "bounce", type: { kind: "simple", type: "bool", optional: false } },
    ],
  },
  {
    name: "DeployParameters",
    header: null,
    fields: [
      { name: "mode", type: { kind: "simple", type: "int", optional: false, format: 257 } },
      { name: "body", type: { kind: "simple", type: "cell", optional: true } },
      { name: "value", type: { kind: "simple", type: "int", optional: false, format: 257 } },
      { name: "bounce", type: { kind: "simple", type: "bool", optional: false } },
      { name: "init", type: { kind: "simple", type: "StateInit", optional: false } },
    ],
  },
  {
    name: "StdAddress",
    header: null,
    fields: [
      { name: "workchain", type: { kind: "simple", type: "int", optional: false, format: 8 } },
      { name: "address", type: { kind: "simple", type: "uint", optional: false, format: 256 } },
    ],
  },
  {
    name: "VarAddress",
    header: null,
    fields: [
      { name: "workchain", type: { kind: "simple", type: "int", optional: false, format: 32 } },
      { name: "address", type: { kind: "simple", type: "slice", optional: false } },
    ],
  },
  {
    name: "BasechainAddress",
    header: null,
    fields: [{ name: "hash", type: { kind: "simple", type: "int", optional: true, format: 257 } }],
  },
  {
    name: "Deploy",
    header: 2490013878,
    fields: [{ name: "queryId", type: { kind: "simple", type: "uint", optional: false, format: 64 } }],
  },
  {
    name: "DeployOk",
    header: 2952335191,
    fields: [{ name: "queryId", type: { kind: "simple", type: "uint", optional: false, format: 64 } }],
  },
  {
    name: "FactoryDeploy",
    header: 1829761339,
    fields: [
      { name: "queryId", type: { kind: "simple", type: "uint", optional: false, format: 64 } },
      { name: "cashback", type: { kind: "simple", type: "address", optional: false } },
    ],
  },
  {
    name: "Add",
    header: 2877003001,
    fields: [{ name: "amount", type: { kind: "simple", type: "uint", optional: false, format: 256 } }],
  },
  {
    name: "SimpleCounter$Data",
    header: null,
    fields: [
      { name: "id", type: { kind: "simple", type: "uint", optional: false, format: 32 } },
      { name: "counter", type: { kind: "simple", type: "uint", optional: false, format: 256 } },
    ],
  },
];

const SimpleCounter_opcodes = {
  Deploy: 2490013878,
  DeployOk: 2952335191,
  FactoryDeploy: 1829761339,
  Add: 2877003001,
};

const SimpleCounter_getters: ABIGetter[] = [
  {
    name: "counter",
    methodId: 104984,
    arguments: [],
    returnType: { kind: "simple", type: "int", optional: false, format: 257 },
  },
  {
    name: "id",
    methodId: 105872,
    arguments: [],
    returnType: { kind: "simple", type: "int", optional: false, format: 257 },
  },
];

export const SimpleCounter_getterMapping: { [key: string]: string } = {
  counter: "getCounter",
  id: "getId",
};

const SimpleCounter_receivers: ABIReceiver[] = [
  { receiver: "internal", message: { kind: "typed", type: "Add" } },
  { receiver: "internal", message: { kind: "typed", type: "Deploy" } },
];

export class SimpleCounter implements Contract {
  public static readonly storageReserve = 0n;
  public static readonly errors = SimpleCounter_errors_backward;
  public static readonly opcodes = SimpleCounter_opcodes;

  static async init(id: bigint) {
    return await SimpleCounter_init(id);
  }

  static async fromInit(id: bigint) {
    const __gen_init = await SimpleCounter_init(id);
    const address = contractAddress(0, __gen_init);
    return new SimpleCounter(address, __gen_init);
  }

  static fromAddress(address: Address) {
    return new SimpleCounter(address);
  }

  readonly address: Address;
  readonly init?: { code: Cell; data: Cell };
  readonly abi: ContractABI = {
    types: SimpleCounter_types,
    getters: SimpleCounter_getters,
    receivers: SimpleCounter_receivers,
    errors: SimpleCounter_errors,
  };

  constructor(address: Address, init?: { code: Cell; data: Cell }) {
    this.address = address;
    this.init = init;
  }

  async send(
    provider: ContractProvider,
    via: Sender,
    args: { value: bigint; bounce?: boolean | null | undefined },
    message: Add | Deploy
  ) {
    let body: Cell | null = null;
    if (message && typeof message === "object" && !(message instanceof Slice) && message.$$type === "Add") {
      body = beginCell().store(storeAdd(message)).endCell();
    }
    if (message && typeof message === "object" && !(message instanceof Slice) && message.$$type === "Deploy") {
      body = beginCell().store(storeDeploy(message)).endCell();
    }
    if (body === null) {
      throw new Error("Invalid message type");
    }

    await provider.internal(via, { ...args, body: body });
  }

  async getCounter(provider: ContractProvider) {
    const builder = new TupleBuilder();
    const source = (await provider.get("counter", builder.build())).stack;
    const result = source.readBigNumber();
    return result;
  }

  async getId(provider: ContractProvider) {
    const builder = new TupleBuilder();
    const source = (await provider.get("id", builder.build())).stack;
    const result = source.readBigNumber();
    return result;
  }
}
