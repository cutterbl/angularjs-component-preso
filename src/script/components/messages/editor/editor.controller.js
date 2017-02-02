'use strict';

export default /*@ngInject*/ class MessageEditorController {

    constructor () {
        this.el = null;
    }

    $postLink () {
        this.el = document.querySelector('input[name="note"]');
        this.el.focus();
    }

    handleKeypress ($event) {
        if ($event.keyCode === 13) {
            $event.preventDefault();
            this.save();
        }
    }

    focusAndSelect () {
        this.el.focus();
        this.el.select();
    }

    $onInit () {
        this.noteCopy = this.note;
    }

    $onChanges (changeObj) {
        const newNote = (changeObj && changeObj.note) ? changeObj.note : null;
        if (newNote && newNote.currentValue !== newNote.previousValue) {
            console.log('new note: ', newNote.currentValue);
            this.note = newNote.currentValue;
            this.focusAndSelect();
        }
    }

    save () {
        this.onSave({note: this.note})
            .then(() => {this.note = this.noteCopy;})
            .finally(() => {this.focusAndSelect();});
    }

}