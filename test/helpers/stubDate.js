const stubDate = date => {

    const stubbedDate = new Date(date);

    beforeEach(() => {
        global.Date = jest.fn(() => stubbedDate);
    });

    afterEach(() => {
        global.Date = Date;
    });

};

export default stubDate;
