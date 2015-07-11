var fs    = require('fs');
var babel = require('babel-core');

var installed = false;

function install(options) {
  if (installed) {
    return;
  }

  options = options || {};

  require.extensions[options.extension || '.js'] = function(module, filename) {

    var src = fs.readFileSync(filename, {encoding: 'utf8'});
    if (typeof options.additionalTransform == 'function') {
      try {
        src = options.additionalTransform(src, filename);
      } catch (e) {
        throw Error('Error additional transforming ' + filename + ' ' + e.toString());
      }
    }
    try {
      src = babel.transform(src, { filename: filename, ast : false }).code;
    } catch (e) {
      throw Error('Error transforming ' + filename + ' to JS: ' + e.toString());
    }
    module._compile(src, filename);
  };

  installed = true;
}

module.exports = {
  install: install
};
