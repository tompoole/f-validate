export const addCallBack = (callBacks, callBack) => {
    if (typeof callBack !== 'function') {
        throw new TypeError('call back is not a function');
    }

    callBacks.push(callBack);
};

export const runCallbacks = callBacks => {
    if (!callBacks) {
        return;
    }

    callBacks.forEach(callback => {
        callback();
    });
};
