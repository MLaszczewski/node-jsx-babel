var fs    = require('fs');
var babel = require('babel-core');
/* 
    HACK - we are require preset and send it as object instead of jast name to avoid path problem
    https://phabricator.babeljs.io/T6692
*/
//var preset_react  = require('babel-preset-react');

var installed = false;

function install(options) {
  if (installed) {
    return;
  }

  options = options || {};

  require.extensions[options.extension || '.jsx'] = function(module, filename) {

    var src = fs.readFileSync(filename, {encoding: 'utf8'});
    if (typeof options.additionalTransform == 'function') {
      try {
        src = options.additionalTransform(src, filename);
      } catch (e) {
        throw Error('Error additional transforming ' + filename + ' ' + e.toString());
      }
    }
    try {
      src = babel.transform(src, {
        filename: filename,
        ast : false,
        presets : options.presets || [],
        plugins : [
          [
            "transform-react-jsx", {
              "pragma": options.pragma || "React.createElement" // default pragma is React.createElement
            }
          ]
        ]
      }).code;
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
