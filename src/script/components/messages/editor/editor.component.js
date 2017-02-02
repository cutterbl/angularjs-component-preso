'use strict';

import MessageEditorController from './editor.controller';

export const messageEditor = {
    bindings: {
        note: '<',
        onSave: '&'
    },
    controller: MessageEditorController,
    templateUrl: 'script/components/messages/editor/editor.html'
};