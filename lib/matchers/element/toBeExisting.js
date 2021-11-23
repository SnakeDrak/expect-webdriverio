"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBePresent = exports.toBeExisting = exports.toExist = void 0;
const utils_1 = require("../../utils");
const expectAdapter_1 = require("../../util/expectAdapter");
function toExistFn(received, options = {}, driver) {
    this.expectation = this.expectation || 'exist';
    this.verb = this.verb || '';
    const browserToUse = driver !== null && driver !== void 0 ? driver : browser;
    return browserToUse.call(async () => {
        const result = await utils_1.executeCommandBe.call(this, received, async (el) => {
            try {
                return el.isExisting();
            }
            catch (_a) {
                return false;
            }
        }, options);
        return result;
    });
}
function toExist(...args) {
    return expectAdapter_1.runExpect.call(this, toExistFn, args);
}
exports.toExist = toExist;
function toBeExisting(el, options, driver) {
    return utils_1.aliasFn.call(this, toExist, { verb: 'be', expectation: 'existing' }, el, options, driver);
}
exports.toBeExisting = toBeExisting;
function toBePresent(el, options, driver) {
    return utils_1.aliasFn.call(this, toExist, { verb: 'be', expectation: 'present' }, el, options, driver);
}
exports.toBePresent = toBePresent;