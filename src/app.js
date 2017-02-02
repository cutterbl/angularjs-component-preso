'use strict';

angular.module('testApp', [
        'ui.router',
        'ui.bootstrap',
        require('./script').name
    ])
    .run([
        '$rootScope', '$state', '$stateParams',
        function ($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ]);
// *** 'Home' state is defined in /script/messages