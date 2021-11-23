"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toHaveAttr = exports.toHaveAttribute = exports.toHaveAttributeFn = exports.toHaveAttributeAndValueFn = void 0;
const utils_1 = require("../../utils");
const expectAdapter_1 = require("../../util/expectAdapter");
async function conditionAttr(el, attribute) {
    const attr = await el.getAttribute(attribute);
    if (typeof attr !== 'string') {
        return { result: false, value: attr };
    }
    else {
        return { result: true, value: attr };
    }
}
async function conditionAttrAndValue(el, attribute, value, options) {
    const attr = await el.getAttribute(attribute);
    if (typeof attr !== 'string') {
        return { result: false, value: attr };
    }
    return utils_1.compareText(attr, value, options);
}
function toHaveAttributeAndValueFn(received, attribute, value, options = {}, driver) {
    const isNot = this.isNot;
    const { expectation = 'attribute', verb = 'have' } = this;
    const browserToUse = driver !== null && driver !== void 0 ? driver : browser;
    return browserToUse.call(async () => {
        let el = await received;
        let attr;
        const pass = await utils_1.waitUntil(async () => {
            const result = await utils_1.executeCommand.call(this, el, conditionAttrAndValue, options, [attribute, value, options]);
            el = result.el;
            attr = result.values;
            return result.success;
        }, isNot, options);
        utils_1.updateElementsArray(pass, received, el);
        const expected = utils_1.wrapExpectedWithArray(el, attr, value);
        const message = utils_1.enhanceError(el, expected, attr, this, verb, expectation, attribute, options);
        return {
            pass,
            message: () => message
        };
    });
}
exports.toHaveAttributeAndValueFn = toHaveAttributeAndValueFn;
function toHaveAttributeFn(received, attribute, driver) {
    const isNot = this.isNot;
    const { expectation = 'attribute', verb = 'have' } = this;
    const browserToUse = driver !== null && driver !== void 0 ? driver : browser;
    return browserToUse.call(async () => {
        let el = await received;
        const pass = await utils_1.waitUntil(async () => {
            const result = await utils_1.executeCommand.call(this, el, conditionAttr, {}, [attribute]);
            el = result.el;
            return result.success;
        }, isNot, {});
        utils_1.updateElementsArray(pass, received, el);
        const message = utils_1.enhanceError(el, !isNot, pass, this, verb, expectation, attribute, {});
        return {
            pass,
            message: () => message
        };
    });
}
exports.toHaveAttributeFn = toHaveAttributeFn;
function toHaveAttribute(...args) {
    if ((args.length === 3 && typeof args[2] === "string") || args.length === 4 || args.length === 5) {
        return expectAdapter_1.runExpect.call(this, toHaveAttributeAndValueFn, args);
    }
    else {
        return expectAdapter_1.runExpect.call(this, toHaveAttributeFn, args);
    }
}
exports.toHaveAttribute = toHaveAttribute;
exports.toHaveAttr = toHaveAttribute;