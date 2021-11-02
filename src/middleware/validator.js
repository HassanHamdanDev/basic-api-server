'use strict';

function validator(req, res, next) {
    let name = req.query.name;
    if (name) {
        next();
    } else {
        next('500 There is no name !!');
    }
}

module.exports = validator;
