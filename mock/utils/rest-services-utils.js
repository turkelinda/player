"use strict";
const moment = require('moment');
const _ = require('lodash');

const mockdata = require('../mockdata.js');

module.exports = (() => {
    const self = {};

    const findObjectWithIdInList = function (id, list) {
        const index = _.findIndex(list, obj => {
            return obj && id && obj.id === parseInt(id);
        });
        return list[index];
    };

    const findObjectWithAttributInList = function (attr, value, list) {
        const index = _.findIndex(list, obj => {
            return obj && value && obj[attr] === value;
        });
        return list[index];
    };

    const findObjectWithIdInTree = function (id, root, childrenAttr) {
        let result;
        const recursiveSearchForObject = function (parent, id) {
            _.forEach(parent[childrenAttr], child => {
                if (child.id === parseInt(id)) {
                    result = child;
                } else {
                    recursiveSearchForObject(child, id);
                }
            });
        };
        if (root.id === parseInt(id)) {
            result = root;
        } else {
            recursiveSearchForObject(root, id);
        }
        return result;
    };

    const findObjectWithAttributInTree = function (value, root, childrenAttr, attribut) {
        let result;
        const recursiveSearchForObject = function (parent, val) {
            _.forEach(parent[childrenAttr], child => {
                if (child[attribut] === val) {
                    result = child;
                } else {
                    recursiveSearchForObject(child, val);
                }
            });
        };
        if (root[attribut] === value) {
            result = root;
        } else {
            recursiveSearchForObject(root, value);
        }
        return result;
    };

    //
    //   U T I L I T Y   F U N C T I O N S
    //
    self.reduceListContentToSpecificAttribute = function (objOrArray, listAttr, reduceAttr) {
        let result = objOrArray;
        if (result) {
            result = _.cloneDeep(result);
            if (result[listAttr] && typeof result[listAttr] === "object") {
                result[listAttr] = result[listAttr][reduceAttr];
            } else {
                _.forEach(result, each => {
                    if (each && each[listAttr] && typeof result[listAttr] === "object")
                        each[listAttr] = each[listAttr][reduceAttr];
                });
            }
        }
        return result;
    };

    self.findUserWithId = function (userId) {
        return findObjectWithIdInList(userId, mockdata.users)
    }

    self.findUserWithUsername = function (username) {
        return findObjectWithAttributInList('username', username, mockdata.users)
    }

    self.createError = function (errorId, parameter) {
        const result = {};
        result.messageId = errorId;
        if (parameter) {
            result.messageParams = parameter;
        }
        return result;
    };

    /**
     * Parse the request content into an object structure.
     * @param content the request content
     * @returns {*} an object representing the content or null in case of parse problems
     */
    self.parseContent = function (content) {
        let parsedContent;
        if (typeof content === 'string') {
            try {
                parsedContent = JSON.parse(content);
            } catch (e) {
            }
        } else if (typeof content === 'object') {
            parsedContent = content;
        }
        return parsedContent;
    };

    /**
     * Use this method to get the current User from any request.
     * It determines the correct request header variable
     * @param request The request object of the middleware
     * @returns {*} Entity User that matches the User or null
     */
    self.getCurrentUserFromRequest = function (request) {
        return self.findUserWithUsername(request.headers.appuser);
    };

    /**
     * Use this method to get the client from any request.
     * It determines the correct request header variable
     * @param request The request object of the middleware
     * @returns {*} clientId
     */
    self.getClientFromRequest = function (request) {
        return request.headers.client;
    };

    /**
     * Use this method to get the current User from any request.
     * It determines the correct request header variable
     * if the header is not available, check if a paramter is given
     * @param request The request object of the middleware
     * @returns {*} Entity User that matches the User or null
     */
    self.getCurrentUserFromRequestOrParam = function (request) {
        let user = self.getCurrentUserFromRequest(request);
        if (!user && request.params) {
            const userId = parseInt(request.params.user, 10);
            if (typeof userId === 'number')
                user = self.findUserWithId(userId);
        }
        return user;
    };

    return self;
})();