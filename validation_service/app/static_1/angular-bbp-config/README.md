angular-bbp-config
==================

bbpConfig module provides a 'bbpConfig' service
that will load static configuration element to your application.

All BBP Angular application should make the following call to retrieve
environment variable:

```
angular.module('MyApp', ['bbpConfig'])
.service('somestuff', ['bbpConfig', function(bbpConfig) {
    var aConstant = bbpConfig('my.static.configuration');
}]);
```

The way bbpConfig retrieve its value is then quite free. Although, a strong
requirement is that bbpConfig MUST retrieves any needed value
at Angular configuration time. This means when angular application is
bootstraping, bbpConfig can already retrieve any constant value.

angular-bbp-config is a simple implementation of this contract where the
service takes its data from the global variable window.bbpConfig.

Usage
=====

The application bootstrap must be delayed until those values are available
in window.bbpConfig object. If those values have to be loaded asynchronously,
a bootstrap script should be use instead of the 'ng-app' attribute.

Load the `angular-bbp-config.js` script in your index.html file:

```
<script src="components/angular-bbp-config/angular-bbp-config.js"></script>
```

Asynchronously load the config and bootstrap the application in my-app.js:

```
(function() {
    'use strict';

    // MyApp, the application to load
    angular.module('MyApp', ['bbpConfig'])
    .service('entityFactory', ['bbpConfig',
        function('bbpConfig') {
            var endpoint = bbpConfig('api.document.v1');
            //...//
        }
    ]);

    // Bootstrap Angular asynchronously
    angular.bootstrap().invoke(function ($http) {
        $http.get('./config.json').then(function(res) {
            window.bbpConfig = res.data;
            angular.element(document).ready(function() {
                angular.bootstrap(angular.element('html'), ['MyApp']);
            });
        });
    });
}());
```

Releases
========

2.0: use bbpConfig.get(key, [default]) instead of bbpConfig(key, [default])

Copyright
=========

Copyright (c) 2014 by EPFL/BBP. All Rights Reserved.
