"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toHaveStyle = exports.toHaveStyleFn = void 0;
const utils_1 = require("../../utils");
const expectAdapter_1 = require("../../util/expectAdapter");
async function condition(el, style, options) {
    return utils_1.compareStyle(el, style, options);
}
function toHaveStyleFn(received, style, options = {}, driver) {
    const isNot = this.isNot;
    const { expectation = 'style', verb = 'have' } = this;
    const browserToUse = driver !== null && driver !== void 0 ? driver : browser;
    return browserToUse.call(async () => {
        let el = await received;
        let actualStyle;
        const pass = await utils_1.waitUntil(async () => {
            const result = await utils_1.executeCommand.call(this, el, condition, options, [style, options]);
            el = result.el;
            actualStyle = result.values;
            return result.success;
        }, isNot, options);
        utils_1.updateElementsArray(pass, received, el);
        const message = utils_1.enhanceError(el, utils_1.wrapExpectedWithArray(el, actualStyle, style), actualStyle, this, verb, expectation, '', options);
        return {
            pass,
            message: () => message
        };
    });
}
exports.toHaveStyleFn = toHaveStyleFn;
function toHaveStyle(...args) {
    return expectAdapter_1.runExpect.call(this, toHaveStyleFn, args);
}
exports.toHaveStyle = toHaveStyle;