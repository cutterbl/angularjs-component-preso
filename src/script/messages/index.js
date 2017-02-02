'use strict';

import MessagesController from './messagesController';
import MessagesService from './messagesService';

module.exports = angular.module('app-scripts.messages', [])
    .controller('MessagesController', MessagesController)
    .service('messagesService', MessagesService)
    .config([
        '$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state({
                    name: 'home',
                    url: '/',
                    controller: MessagesController,
                    controllerAs: '$ctrl',
                    templateUrl: 'script/messages/messages.html'
                });
        }
    ]);