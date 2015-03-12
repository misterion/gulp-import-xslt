gulp-import-xslt
===============
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url] [![npm](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/gulp-import-xslt) [![Code Climate](https://codeclimate.com/github/misterion/gulp-import-xslt/badges/gpa.svg)](https://codeclimate.com/github/misterion/gulp-import-xslt) [![Test Coverage](https://codeclimate.com/github/misterion/gulp-import-xslt/badges/coverage.svg)](https://codeclimate.com/github/misterion/gulp-import-xslt) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/misterion/gulp-import-xslt/master/LICENSE)

Import several xslt files into a single file, one by one, rebasing urls and inlining import/include nodes

## Install

Install with [npm](https://npmjs.org/package/gulp-import-xslt).

```
npm install --save-dev gulp-import-xslt
```

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

This is the `Gulpfile.js`:

```js
var gulp = require('gulp');
var importXslt = require('gulp-import-xslt');

gulp.task('default', function () {
  gulp.src('templates/*.xsl')
    .pipe(importXslt())
    .pipe(gulp.dest('dist/'));
});
```

Now, run the command `gulp` to get the combined xslt file.

## License

Released under the [MIT](LICENSE) license.

