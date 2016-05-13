"use strict";
const _ = require('lodash');

module.exports = function (mockdata) {

    var objects = [
        {username: "turkel", firstname: "Linda", lastname: "Turke", orgUnit: "B/FP-1 IT-Services EX-09-FIX"},
        {username: "hoertrej", firstname: "Jochen", lastname: "Hörtreiter", email: "Jochen.Hoertreiter@msg.de", orgUnit: "XT"},
        {username: "test1", firstname: 'Test', lastname: 'User1', orgUnit: "msg systems ag"},
        {username: "test2", firstname: 'Test', lastname: 'User2', orgUnit: "msg systems ag"},
        {username: "test3", firstname: 'Test', lastname: 'User3', orgUnit: "msg systems ag"},
        {username: "test4", firstname: 'Test', lastname: 'User4', orgUnit: "msg systems ag"},
        {username: "test5", firstname: 'Test', lastname: 'User5', orgUnit: "msg systems ag"},
        {username: "test6", firstname: 'Test', lastname: 'User6', orgUnit: "msg systems ag"},
        {username: "test7", firstname: 'Test', lastname: 'User7', orgUnit: "msg systems ag"},
        {username: "test8", firstname: 'Test', lastname: 'User8', orgUnit: "msg systems ag"},
        {username: "test9", firstname: 'Test', lastname: 'User9', orgUnit: "msg systems ag"},
        {username: "test10", firstname: 'Test', lastname: 'User10', orgUnit: "msg systems ag"},
        {username: "test11", firstname: 'Test', lastname: 'User11', orgUnit: "msg systems ag"},
        {username: "test12", firstname: 'Test', lastname: 'User12', orgUnit: "msg systems ag"},
        {username: "test13", firstname: 'Test', lastname: 'User13', orgUnit: "msg systems ag"},
        {username: "test14", firstname: 'Test', lastname: 'User14', orgUnit: "msg systems ag"},
        {username: "test15", firstname: 'Test', lastname: 'User15', orgUnit: "msg systems ag"},
        {username: "test16", firstname: 'Test', lastname: 'User16', orgUnit: "msg systems ag"},
        {username: "test17", firstname: 'Test', lastname: 'User17', orgUnit: "msg systems ag"}
    ];

    return _.map(objects, obj => {
        return mockdata.registry.addObject({
            mark: `User.${ obj.username }`,   // add objects under their username into the object registry - reference them by {objectRef: "value"}
            id: mockdata.userId++,
            version: 1,
            username: obj.username,
            firstname: obj.firstname,
            lastname: obj.lastname,
            phone: obj.phone || '+49(555)55555555',
            mobile: obj.mobile || '+49(555)55555555',
            email: obj.email || `${ obj.firstname }.${ obj.lastname }@msg-systems.com`,
            active: obj.active !== false,
            orgUnit: obj.orgUnit
        });
    });
};