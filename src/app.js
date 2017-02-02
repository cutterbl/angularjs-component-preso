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
    ])
    .config(
        /*@ngInject*/
        function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state({
                    name: 'home',
                    url: '/',
                    template: '<messages class="panel"></messages>'
                });
        }
    );