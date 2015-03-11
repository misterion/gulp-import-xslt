/* jshint node:true */
'use strict';

var gutil = require('gulp-util'),
  path = require('path'),
  fs = require('fs'),
  through = require('through2');

var PLUGIN_NAME = 'gulp-import-xslt';

function replace(data, basePath, deep, importGraph) {
  var realDeep = deep| 0,
      strData = String(data),
      rx;

  if (realDeep > 0) {
    rx = /(<xsl:stylesheet.+?>)|(<\/xsl:stylesheet>)|(<\?xml.+?\?>)|(<!--[\s\S]*?-->)/img;
  } else {
    rx = /(<!--[\s\S]*?-->)/img;
  }

  strData = strData.replace(rx, '');

  return strData.replace(/(<xsl:(include|import).+?href=")(.+?)(".+?\>)/img, function(match, g1, g2, g3, g4) {
    var filePath = path.resolve(basePath, g3);
    if (importGraph.hasOwnProperty(filePath)) {
      return '';
    }

    importGraph[filePath] = 1;
    return replace(fs.readFileSync(filePath), path.dirname(filePath), realDeep + 1, importGraph);
  });
}

module.exports = function() {
  return through.obj(function(file, enc, cb) {
    if (file.isStream()) {
      this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
      return cb();
    }

    file.contents = new Buffer(replace(file.contents, path.dirname(file.path), 0, {}));
    this.push(file);
    cb();
  });
};