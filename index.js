/* jshint node:true */
'use strict';

var gutil = require('gulp-util'),
  path = require('path'),
  fs = require('fs'),
  pd = require('pretty-data').pd,
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

module.exports = function(opts) {
  var options = opts || {};
  var methodSuffix = options.hasOwnProperty('prettyMethod') ? (options.prettyMethod === 'minify' ? 'min' : '') : false;

  return through.obj(function(file, enc, cb) {
    var content;
    if (file.isStream()) {
      this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
      return cb();
    }

    content = replace(file.contents, path.dirname(file.path), 0, {});
    if (methodSuffix !== false) {
      content = pd['xml' + methodSuffix](content);
    }
    file.contents = new Buffer(content);
    this.push(file);
    cb();
  });
};