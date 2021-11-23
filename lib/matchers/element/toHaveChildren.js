"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toHaveChildren = void 0;
const utils_1 = require("../../utils");
const expectAdapter_1 = require("../../util/expectAdapter");
async function condition(el, options) {
    const children = await el.$$('./*');
    if (!options.lte && !options.gte && !options.eq) {
        return {
            result: children.length > 0,
            value: children === null || children === void 0 ? void 0 : children.length
        };
    }
    return {
        result: utils_1.compareNumbers(children === null || children === void 0 ? void 0 : children.length, options),
        value: children === null || children === void 0 ? void 0 : children.length
    };
}
function toHaveChildrenFn(received, expected, options = {}, driver) {
    const isNot = this.isNot;
    const { expectation = 'children', verb = 'have' } = this;
    let numberOptions;
    if (typeof expected === 'number') {
        numberOptions = { eq: expected };
    }
    else if (typeof expected === 'object') {
        numberOptions = expected;
    }
    const browserToUse = driver !== null && driver !== void 0 ? driver : browser;
    return browserToUse.call(async () => {
        let el = await received;
        let children;
        const pass = await utils_1.waitUntil(async () => {
            const result = await utils_1.executeCommand.call(this, el, condition, numberOptions, [numberOptions]);
            el = result.el;
            children = result.values;
            return result.success;
        }, isNot, { ...numberOptions, ...options });
        utils_1.updateElementsArray(pass, received, el);
        const error = utils_1.numberError(numberOptions);
        const expected = utils_1.wrapExpectedWithArray(el, children, error);
        const message = utils_1.enhanceError(el, expected, children, this, verb, expectation, '', numberOptions);
        return {
            pass,
            message: () => message
        };
    });
}
function toHaveChildren(...args) {
    return expectAdapter_1.runExpect.call(this, toHaveChildrenFn, args);
}
exports.toHaveChildren = toHaveChildren;