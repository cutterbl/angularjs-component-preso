'use strict';

export default /*@ngInject*/ class MessagesController {

    constructor ($q, messagesService) {
        this.$q = $q;
        this.messagesService = messagesService;
        this.errors = null;
        this.messages = messagesService.messages;
        this.blankMessage = {note:''};
        this.currentMessage = {};
        this.note = '';
    }

    $doInit () {
        this.loadMessage();
    }

    clearErrors () {
        this.errors = null;
    }

    transformErrors (err) {
        this.errors = (angular.isArray(err)) ? err : [err];
    }

    loadMessage ({message=null} = {}) {
        if (!message) {
            this.currentMessage = angular.copy(this.blankMessage);
        } else {
            this.currentMessage = message;
        }
        this.note = this.currentMessage.note;
        this.clearErrors();
    }

    saveMessage (note) {
        this.note = this.currentMessage.note = note;
        console.log('saving message: ', this.currentMessage, this.note);
        return this.messagesService.save(this.currentMessage)
            .then((result) => {
                console.log('saved: ', result);
                this.loadMessage();
                console.log('note: ', this.note);
            })
            .catch((err) => this.transformErrors(err));
    }

    removeMessage (message) {
        console.log('removing message: ', message, this.currentMessage);
        let flipIt = angular.equals(message, this.currentMessage);
        let copy = angular.copy(this.currentMessage);
        return this.messagesService.remove(message)
            .then(() => {
                if (flipIt) {
                    this.loadMessage();
                } else {
                    this.clearErrors();
                }
            })
            .catch((err) => {
                this.loadMessage(copy);
                this.transformErrors(err);
            });
    }
}