'use strict';

export default /*@ngInject*/ class MessageEditorController {

    constructor () {
        this.el = null;
    }

    $onInit () {
        this.noteCopy = this.note;
    }

    $postLink () {
        this.el = document.querySelector('input[name="note"]');
        this.el.focus();
    }

    $onChanges (changeObj) {
        const newNote = (changeObj && changeObj.note) ? changeObj.note : null;
        if (newNote && newNote.currentValue !== newNote.previousValue) {
            console.log('new note: ', newNote.currentValue);
            this.note = newNote.currentValue;
            this.focusAndSelect();
        }
    }

    handleKeypress ($event) {
        if ($event.keyCode === 13) {
            $event.preventDefault();
            this.save();
        }
    }

    focusAndSelect () {
        if (this.el) {
            this.el.focus();
            this.el.select();
        }
    }

    save () {
        this.onSave({note: this.note})
            .then(() => {this.note = this.noteCopy;})
            .finally(() => {this.focusAndSelect();});
    }

}