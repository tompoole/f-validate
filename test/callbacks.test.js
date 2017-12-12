import { addCallBack, runCallbacks } from '../src/callbacks';

describe('add callbacks', () => {

    it('should allow callbacks to be added to a callback array', () => {

        // Arrange
        const callBacks = [];
        const callBack = jest.fn();

        // Act
        addCallBack(callBacks, callBack);

        // Assert
        expect(callBacks.length).toBe(1);

    });

    it('should throw exception when string type callbacks are specified', () => {

        // Arrange
        const callBacks = [];
        const callBack = '';

        // Act & Assert
        expect(() => {
            addCallBack(callBacks, callBack);
        }).toThrowError(TypeError);

        expect(() => {
            addCallBack(callBacks, callBack);
        }).toThrowError('call back is not a function');

    });

    it('should throw exception when array type success callbacks options are specified', () => {

        // Arrange
        const callBacks = [];
        const callBack = [];

        // Act & Assert
        expect(() => {
            addCallBack(callBacks, callBack);
        }).toThrowError(TypeError);

        expect(() => {
            addCallBack(callBacks, callBack);
        }).toThrowError('call back is not a function');

    });

    it('should throw exception when object type success callbacks options are specified', () => {

        // Arrange
        const callBacks = [];
        const callBack = {};

        // Act & Assert
        expect(() => {
            addCallBack(callBacks, callBack);
        }).toThrow(TypeError);

        expect(() => {
            addCallBack(callBacks, callBack);
        }).toThrowError('call back is not a function');

    });

    it('should throw exception when null type success callbacks are added', () => {

        // Arrange
        const callBacks = [];
        const callBack = null;

        // Act & Assert
        expect(() => {
            addCallBack(callBacks, callBack);
        }).toThrowError(TypeError);

        expect(() => {
            addCallBack(callBacks, callBack);
        }).toThrowError('call back is not a function');

    });

});

describe('run callbacks', () => {

    it('should call all callbacks', () => {

        // Arrange
        const cb1 = jest.fn();
        const cb2 = jest.fn();
        const cb3 = jest.fn();
        const callbacks = [cb1, cb2, cb3];

        // Act
        runCallbacks(callbacks);

        // Assert
        expect(cb1.mock.calls.length).toBe(1);
        expect(cb2.mock.calls.length).toBe(1);
        expect(cb3.mock.calls.length).toBe(1);

    });
});
