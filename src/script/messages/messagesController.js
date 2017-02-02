'use strict';

export default /*@ngInject*/ class MessagesController {

    constructor ($q, messagesService) {
        this.$q = $q;
        this.messagesService = messagesService;
        this.errors = null;
        this.messages = messagesService.messages;
        this.blankMessage = {note:''};
        this.currentMessage = {};
        this.note = null;

        this.loadMessage();
    }

    loadMessage (message=null) {
        Object.assign(this.currentMessage, !message ? this.blankMessage : message);
        this.note = this.currentMessage.note;
        this.clearErrors();
    }

    clearErrors () {
        this.errors = null;
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
        console.log('removing message: ', message);
        return this.messagesService.remove(message)
            .then(() => {this.clearErrors();})
            .catch((err) => this.transformErrors(err));
    }

    transformErrors (err) {
        this.errors = (angular.isArray(err)) ? err : [err];
    }
}