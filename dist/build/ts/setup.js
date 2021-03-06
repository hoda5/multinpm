"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var utils_1 = require("../../utils");
var path_1 = require("path");
function projectUsesTypeScript(packageName) {
    return utils_1.utils.exists(packageName, 'tsconfig.json');
}
exports.projectUsesTypeScript = projectUsesTypeScript;
function setupTypeScript(name, withReact) {
    return __awaiter(this, void 0, void 0, function () {
        function ajust_packagejson() {
            return __awaiter(this, void 0, void 0, function () {
                var packageJSON;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, utils_1.utils.getPackageJsonFor(name)];
                        case 1:
                            packageJSON = _a.sent();
                            if (!packageJSON.scripts) {
                                packageJSON.scripts = {};
                            }
                            packageJSON.scripts.build = 'tsc';
                            packageJSON.scripts.watch = 'tsc -w';
                            packageJSON.scripts.lint = 'tslint --project .';
                            packageJSON.scripts.lintfix = 'tslint --project . --fix';
                            if (packageJSON.dependencies && packageJSON.dependencies.react)
                                withReact = true;
                            packageJSON.jest = {
                                transform: {
                                    '^.+\\.tsx?$': 'ts-jest',
                                },
                                testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
                                moduleFileExtensions: [
                                    'ts',
                                    'tsx',
                                    'js',
                                    'jsx',
                                    'json',
                                    'node',
                                ],
                                coveragePathIgnorePatterns: [
                                    '/node_modules/',
                                    '/dist/',
                                ],
                                collectCoverage: true,
                                coverageReporters: [
                                    'json-summary',
                                    'lcov',
                                    'text',
                                ],
                            };
                            fs_1.writeFileSync(utils_1.utils.path(name, 'package.json'), JSON.stringify(packageJSON, null, 2), 'utf-8');
                            return [2 /*return*/];
                    }
                });
            });
        }
        function save_tsconfig() {
            var tsconfig = JSON.parse(fs_1.readFileSync(path_1.resolve(path_1.join(__dirname, '../../tsconfig.json')), 'utf-8'));
            if (withReact)
                tsconfig.compilerOptions.lib.push('dom');
            fs_1.writeFileSync(utils_1.utils.path(name, 'tsconfig.json'), JSON.stringify(tsconfig, null, 2), 'utf-8');
        }
        function save_tslint() {
            var tslint = JSON.parse(fs_1.readFileSync(path_1.resolve(path_1.join(__dirname, '../../tslint.json')), 'utf-8'));
            fs_1.writeFileSync(utils_1.utils.path(name, 'tslint.json'), JSON.stringify(tslint, null, 2), 'utf-8');
        }
        function install_pkgs() {
            var argsDeps = [];
            if (!/^@hoda5\/(hdev|h5global)$/g.test(name)) {
                argsDeps.push('@hoda5/h5global@latest');
            }
            var argsDevs = [
                'typescript@latest',
                'tslint@latest',
                'jest@latest',
                'ts-jest@latest',
                '@types/jest@latest',
            ];
            if (!/^@hoda5\/(hdev)$/g.test(name)) {
                argsDevs.push('@hoda5/h5dev@latest');
            }
            if (withReact) {
                argsDeps.push('react@latest');
                argsDevs.push('@types/react@latest');
            }
            if (argsDeps.length) {
                utils_1.utils.exec('npm', ['install', '--save'].concat(argsDeps), { cwd: utils_1.utils.path(name), title: '' });
            }
            if (argsDevs.length) {
                utils_1.utils.exec('npm', ['install', '--save-dev'].concat(argsDevs), { cwd: utils_1.utils.path(name), title: '' });
            }
        }
        return __generator(this, function (_a) {
            ajust_packagejson();
            save_tsconfig();
            save_tslint();
            install_pkgs();
            return [2 /*return*/];
        });
    });
}
exports.setupTypeScript = setupTypeScript;
//# sourceMappingURL=setup.js.map