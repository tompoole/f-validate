export const addCallBack = (callBacks, callBack, callBackEvent) => {

    if (!callBacks[callBackEvent]) {
        callBacks[callBackEvent] = [];
    }

    callBacks[callBackEvent].push(callBack);

};

export const runCallbacks = (callBacks, callBackEvent) => {

    if (!callBacks[callBackEvent]) {
        return;
    }

    callBacks[callBackEvent].forEach(callback => {
        callback();
    });

};
