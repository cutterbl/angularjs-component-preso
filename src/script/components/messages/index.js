'use strict';

import {messagesComponent} from './messages.component';
import MessagesService from './messages.service';

module.exports = angular.module('app-scripts.components.messages', [
    require('./editor').name
])
    .component('messages', messagesComponent)
    .service('messagesService', MessagesService);