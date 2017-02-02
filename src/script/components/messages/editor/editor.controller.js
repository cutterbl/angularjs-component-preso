'use strict';

export default /*@ngInject*/ class MessageEditorController {

    constructor () {}

    $onInit () {
        this.noteCopy = this.note;
    }

    $onChanges (changeObj) {
        const newNote = (changeObj && changeObj.note) ? changeObj.note : null;
        if (newNote && newNote.currentValue !== newNote.previousValue) {
            console.log('new note: ', newNote.currentValue);
            this.note = newNote.currentValue;
        }
    }

    save () {
        this.onSave({note: this.note})
            .then(() => {this.note = this.noteCopy;});
    }

}