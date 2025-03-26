"use strict";

const { CompilerContext } = require("@tact-lang/compiler/dist/context/context");
const { precompile } = require("@tact-lang/compiler/dist/pipeline/precompile");
const { getRawAST } = require("@tact-lang/compiler/dist/context/store");
const { getAstFactory, getParser } = require("@tact-lang/compiler");

function getAst(vfs, stdlib, target) {
  const ast = getAstFactory();
  const parser = getParser(ast);
  let ctx = new CompilerContext();
  ctx = precompile(ctx, vfs, stdlib, target, parser, ast);

  return getRawAST(ctx);
}

module.exports = {
  getAst,
};
