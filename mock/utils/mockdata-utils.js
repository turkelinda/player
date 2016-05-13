"use strict";
const _ = require('lodash');

module.exports = (() => {
    const self = {};

    const findObjectWithIdInList = (id, list) => {
        const index = _.findIndex(list, obj => {
            return obj && id && obj.id === parseInt(id);
        });
        return list[index];
    };

    self.getObjectFromListById = (list, id) => {
        return findObjectWithIdInList(id, list);
    };

    self.getObjectsFromListByNames = (list, names) => {
        return self.getObjectsFromListByAttribute(list, names, 'name');
    };

    self.getObjectsFromListByAttribute = (list, searchValues, searchAttribute) => {
        const searchObject = {};
        if (Object.prototype.toString.call(searchValues) === Object.prototype.toString.call([])) {
            const results = [];
            _.forEach(searchValues, searchValue => {
                searchObject[searchAttribute] = searchValue;
                results.push(_.find(list, searchObject));
            });
            return results;
        } else {
            searchObject[searchAttribute] = searchValues;
            return _.find(list, searchObject);
        }
    };

    self.getRandomIdOfList = (list) => {
        const index = Math.floor(Math.random() * (list.length - 1));
        return list[index].id;
    };

    return self;
})();