"use strict";

BigInt.prototype.toJSON = function () {
  return Number(this);
};

const fs = require("fs");
const path = require("path");
const tactCompiler = require("@tact-lang/compiler");
const vfs = require("./shared/vfs.cjs");
const { rmForceSync } = require("./shared/fs.cjs");
const { getAst } = require("./shared/ast.cjs");
const { default: stdlibFiles } = require("@tact-lang/compiler/dist/stdlib/stdlib");

const ROOT_DIR = process.cwd();
const BUILD_DIR = path.join(ROOT_DIR, "/build");
const AST_FILE = path.join(BUILD_DIR, "ast.json");
const TACT_CONFIG_FILE = path.join(ROOT_DIR, "tact.config.json");

rmForceSync(BUILD_DIR);

const tactConfig = getTactConfig(TACT_CONFIG_FILE);
const stdlib = tactCompiler.createVirtualFileSystem("@stdlib", stdlibFiles);

tactConfig.projects.map((projectConfig) => {
  const ast = getAst(vfs, stdlib, projectConfig.path);
  vfs.writeFile(AST_FILE, JSON.stringify(ast));

  tactCompiler.build({
    config: projectConfig,
    project: vfs,
    stdlib,
  });
});

function getTactConfig(file) {
  const tactConfig = JSON.parse(fs.readFileSync(file).toString("utf-8"));

  return tactConfig;
}
