const test = require('./test.json');
const history = require('./history.json');

module.exports = function () {
    return {
        test,
        history
    };
}();