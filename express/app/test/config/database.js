/**
 * Test for mariadb.json.
 */
'use strict';

/* global describe it */

var assert = require('assert');
const { testFuncOne, testFuncTwo } = require('../../config/istanbulTest.js');

describe('Get config properties', function () {
    describe('Get name of database', function () {
        it('should be mydb', function () {
            assert.equal(testFuncOne(), 'mydb');
        });
    });
    describe('Get name of user', function () {
        it('should be user', function () {
            assert.equal(testFuncTwo(), 'user');
        });
    });
});
