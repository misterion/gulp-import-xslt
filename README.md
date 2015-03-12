gulp-import-xslt
===============
[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Code Climate][code-climate-image]][code-climate-url]
[![Test Coverage][coverage-image]][coverage-url]

Import several xslt files into a single file, one by one, rebasing urls and inlining import/include nodes

## Install

Install with [npm](https://npmjs.org/package/gulp-import-xslt).

```
npm install --save-dev gulp-import-xslt
```

## Usage

`Gulpfile.js`:
```js
var gulp = require('gulp');
var importXslt = require('gulp-import-xslt');

gulp.task('default', function () {
  gulp.src('templates/*.xsl')
    .pipe(importXslt())
    .pipe(gulp.dest('dist/'));
});
```

## Options

- `prettyMethod` ('minify'/'prettify') to pretty-print or minify text in XSLT. It based on node-js [pretty-data](https://github.com/vkiryukhin/pretty-data) plugin.

## Examples

In case this is `templates/sample.xsl`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:import href="page.xsl" />
	<xsl:template match="/">
		My sample
	</xsl>
</xsl:stylesheet>
```

And this is `templates/page.xsl`:

```xml
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template name="page">
	   Hello world!
	</xsl:template>
</xsl:stylesheet>
```

And result is:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template name="page">
       Hello world!
	</xsl:template>
	<xsl:template match="/">
    	My sample
    </xsl>
</xsl:stylesheet>
```

Now, run the command `gulp` to get the combined xslt file.

## License

Released under the [MIT](LICENSE) license.

[npm-image]: https://img.shields.io/npm/v/gulp-import-xslt.svg?style=flat-square
[npm-url]: https://npmjs.org/package/gulp-import-xslt
[travis-image]: https://img.shields.io/travis/misterion/gulp-import-xslt.svg?style=flat-square
[travis-url]: https://travis-ci.org/misterion/gulp-import-xslt
[code-climate-image]: https://codeclimate.com/github/misterion/gulp-import-xslt/badges/gpa.svg
[code-climate-url]: https://codeclimate.com/github/misterion/gulp-import-xslt
[coverage-image]: https://codeclimate.com/github/misterion/gulp-import-xslt/badges/coverage.svg
[coverage-url]: https://codeclimate.com/github/misterion/gulp-import-xslt