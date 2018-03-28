"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var child_process_1 = require("child_process");
var root = findRoot(process.cwd());
exports.utils = {
    get root() {
        return root;
    },
    get workspaceFile() {
        return root + '/' + path_1.basename(root) + '.code-workspace';
    },
    adaptFolderName: function (packageName) {
        if (packageName.indexOf('-') != -1)
            exports.utils.throw('Invalid package name ' + packageName);
        return packageName.replace('/', '-');
    },
    listPackages: function () {
        var dir = root + '/packages';
        if (!fs_1.existsSync(dir))
            return [];
        return fs_1.readdirSync(dir);
    },
    forEachPackage: function (fn) {
        exports.utils.listPackages().forEach(function (p) {
            fn(p.replace('-', '/'), [root, 'packages', p].join('/'));
        });
    },
    getPackageJsonFor: function (packagName) {
        var json = JSON.parse(fs_1.readFileSync(root + '/packages/' + exports.utils.adaptFolderName(packagName) + '/package.json', { encoding: 'utf-8' }));
        if (json.name !== packagName)
            exports.utils.throw('Package name (' + packagName +
                ') é diferente do que está em name do package.json (' +
                json.name + ')');
        return json;
    },
    throw: function (msg) {
        console.log(msg);
        process.exit(1);
    },
    shell: function (cmd, args, opts) {
        console.log([opts.cwd, '$ ', cmd, ' ', args.join(' ')].join(''));
        var r = child_process_1.spawnSync(cmd, args, __assign({}, opts, { stdio: ['inherit', 'inherit', 'inherit'] }));
        if (r.status != 0)
            process.exit(1);
    }
};
function findRoot(folder) {
    var _loop_1 = function () {
        var files = fs_1.readdirSync(folder);
        var w = path_1.basename(folder) + '.code-workspace';
        if (files.some(function (f) { return f == w; })) {
            return { value: folder };
        }
        folder = path_1.dirname(folder);
    };
    while (folder && folder != '/') {
        var state_1 = _loop_1();
        if (typeof state_1 === "object")
            return state_1.value;
    }
    exports.utils.throw('no code-workspace file found');
    return '';
}
//# sourceMappingURL=utils.js.map