scrapper = require('../js/scrapper');
let config = require('../config/config.json')

test("If there is syntax problems in confsg.json, the test is failed", () => {
    expect(() => config.forEach(channel => {
        scrapper.initialize(channel, 1)
    })).not.toThrowError(SyntaxError);
})
