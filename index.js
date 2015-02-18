/* jshint node: true */
'use strict';

/*

'<script>'
'  function handleOpenURL(url) {'
'    setTimeout(function() {'
'      var path = url.slice('occamsapp://'.length),'
'          newUrl = 'index.html#/' + path;'
'      window.location.replace(newUrl);'
'    }, 0);'
'  }'
'</script>'

 */

module.exports = {
  name: 'op-firebase-auth',

  /**
   * Inject the URL Scheme handleOpenURL script in the index header
   */
  contentFor: function(type, config) {

    if (type === 'head') {
      var content;

      content = [
        '<script>',
        '  function handleOpenURL(url) {',
        '    setTimeout(function() {',
        '      var path = url.slice(\'' + config.firebaseLogin.URLSchemeDomain + '://\'.length),',
        '          newUrl = \'index.html#/\' + path;',
        '      window.location.replace(newUrl);',
        '    }, 0);',
        '  }',
        '</script>',
      ];

      return content.join('\n');
    }

    return '';
  },
  included: function included(app) {
    this._super.included(app);

    this.app.import({
      development: app.bowerDirectory + '/firebase/firebase-debug.js',
      production: app.bowerDirectory + '/firebase/firebase.js'
    });

    this.app.import({
      development: app.bowerDirectory + '/emberfire/dist/emberfire.js',
      production: app.bowerDirectory + '/emberfire/dist/emberfire.min.js'
    });
  }
};
