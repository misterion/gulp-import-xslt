/* jshint node: true */
/* global describe, it */

'use strict';

var assert = require('assert'),
    fs = require('fs'),
    gutil = require('gulp-util'),
    PassThrough = require('stream').PassThrough,
    importXslt = require('./../index');

function count(str, subStr) {
    return (String(str).match(new RegExp(String(subStr), 'g')) || []).length;
}

describe('gulp-import-xslt', function() {
    it('should work in buffer mode', function(done) {
        var stream = importXslt(),
            path = './test/fixtures/sample.xsl';

        var fakeFile = new gutil.File({
            path: path,
            contents: new Buffer(fs.readFileSync(path))
        });

        stream.on('data', function(newFile) {
            assert.equal(1, count(newFile.contents, '<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">'));
            assert.equal(1, count(newFile.contents, '<xsl:template name="header">'));
            assert.equal(1, count(newFile.contents, '<xsl:template name="footer">'));
            assert.equal(1, count(newFile.contents, '<xsl:template name="page">'));
            assert.equal(1, count(newFile.contents, 'Sample Content'));
        });

        stream.on('end', function() {
            done();
        });

        stream.write(fakeFile);
        stream.end();
    });

    it('should pretty xsl', function(done) {
        var stream = importXslt({prettyMethod: 'prettify'}),
            prettyPath = './test/fixtures/sample_pretty.xsl',
            path = './test/fixtures/sample.xsl';

        var fakeFile = new gutil.File({
            path: path,
            contents: new Buffer(fs.readFileSync(path))
        });

        stream.on('data', function(newFile) {
            var prettyData = new Buffer(fs.readFileSync(prettyPath));
            assert.equal(String(prettyData), String(newFile.contents));
        });

        stream.on('end', function() {
            done();
        });

        stream.write(fakeFile);
        stream.end();
    });

    it('should minify xsl', function(done) {
        var stream = importXslt({prettyMethod: 'minify'}),
            prettyPath = './test/fixtures/sample_minify.xsl',
            path = './test/fixtures/sample.xsl';

        var fakeFile = new gutil.File({
            path: path,
            contents: new Buffer(fs.readFileSync(path))
        });

        stream.on('data', function(newFile) {
            var prettyData = new Buffer(fs.readFileSync(prettyPath));
            assert.equal(String(prettyData), String(newFile.contents));
        });

        stream.on('end', function() {
            done();
        });

        stream.write(fakeFile);
        stream.end();
    });
});