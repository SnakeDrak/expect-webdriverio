"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBeClickable = void 0;
const utils_1 = require("../../utils");
const expectAdapter_1 = require("../../util/expectAdapter");
function toBeClickableFn(received, options = {}, driver) {
    this.expectation = this.expectation || 'clickable';
    const browserToUse = driver !== null && driver !== void 0 ? driver : browser;
    return browserToUse.call(async () => {
        const result = await utils_1.executeCommandBe.call(this, received, async (el) => {
            try {
                return el.isClickable();
            }
            catch (_a) {
                return false;
            }
        }, options);
        return result;
    });
}
function toBeClickable(...args) {
    return expectAdapter_1.runExpect.call(this, toBeClickableFn, args);
}
exports.toBeClickable = toBeClickable;