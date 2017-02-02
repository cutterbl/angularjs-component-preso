'use strict';

import {messageList} from './list.component';

module.exports = angular.module('app-scripts.components.messages.list', [])
    .component('messageList', messageList);