const Promise = require('bluebird');


module.exports = (recordeRepository, errors) => {
    return { createOne: createOne, findAll: findAll};

    function createOne(content) {
        return recordeRepository.create(content)
    }

    function findAll(content) {
        return recordeRepository.findAll(content)
    }
};