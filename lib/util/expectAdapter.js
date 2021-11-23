"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runExpect = exports.runJasmineExpect = exports.jestResultToJasmine = exports.buildJasmineFromJestResult = exports.runJestExpect = exports.getContext = void 0;
const options_1 = require("../options");
const config = options_1.getConfig();
const { mode: MODE } = config;
const getContext = (context) => global === context ? {} : context || {};
exports.getContext = getContext;
function runJestExpect(fn, args) {
    return fn.apply(this !== null && this !== void 0 ? this : {}, args);
}
exports.runJestExpect = runJestExpect;
const buildJasmineFromJestResult = (result, isNot) => {
    return {
        pass: result.pass !== isNot,
        message: result.message()
    };
};
exports.buildJasmineFromJestResult = buildJasmineFromJestResult;
const jestResultToJasmine = (result, isNot) => {
    if (result instanceof Promise) {
        return result.then(jestStyleResult => exports.buildJasmineFromJestResult(jestStyleResult, isNot));
    }
    return exports.buildJasmineFromJestResult(result, isNot);
};
exports.jestResultToJasmine = jestResultToJasmine;
function runJasmineExpect(fn) {
    const context = exports.getContext(this);
    return {
        compare(...args) {
            const result = fn.apply({ ...context, isNot: false }, args);
            return exports.jestResultToJasmine(result, false);
        },
        negativeCompare(...args) {
            const result = fn.apply({ ...context, isNot: true }, args);
            return exports.jestResultToJasmine(result, true);
        }
    };
}
exports.runJasmineExpect = runJasmineExpect;
exports.runExpect = MODE === 'jasmine' ? runJasmineExpect : runJestExpect;