import { getExpectMessage, getReceived, getExpected } from '../../__fixtures__/utils';
import { toHaveValueContaining } from '../../../src/matchers/element/toHaveValueContaining'

describe('toHaveValueContaining', () => {
    let el: WebdriverIO.Element

    beforeEach(async () => {
        el = await $('sel')
        el._value = jest.fn().mockImplementation(() => {
            return "This is an example value"
        })
    })

    describe('success', () => {
        test('exact passes', async () => {
            const result = await toHaveValueContaining(el, "This is an example value");
            expect(result.pass).toBe(true)
        });
        test('exact passes with custom driver', async () => {
            const result = await toHaveValueContaining(el, "This is an example value", {}, browser);
            expect(result.pass).toBe(true)
        });
        test('part passes', async () => {
            const result = await toHaveValueContaining(el, "example value");
            expect(result.pass).toBe(true)
        });
    })

    describe('failure', () => {
        let result: any

        beforeEach(async () => {
            result = await toHaveValueContaining(el, "webdriver");
        })

        test('does not pass', () => {
            expect(result.pass).toBe(false)
        })

        describe('message shows correctly', () => {
            test('expect message', () => {
                expect(getExpectMessage(result.message())).toContain('to have property value')
            })
            test('expected message', () => {
                expect(getExpected(result.message())).toContain('webdriver')
            })
            test('received message', () => {
                expect(getReceived(result.message())).toContain('This is an example value')
            })
        })
    });

});
