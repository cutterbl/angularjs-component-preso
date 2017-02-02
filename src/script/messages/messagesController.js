'use strict';

export default /*@ngInject*/ class MessagesController {

    constructor ($q, messagesService) {
        this.$q = $q;
        this.messagesService = messagesService;
        this.errors = null;
        this.messages = messagesService.messages;
        this.blankMessage = {note:''};
        this.loadBlank = () => angular.copy(this.blankMessage);
        this.currentMessage = this.loadBlank();
    }

    loadMessage (message) {
        this.currentMessage = angular.copy(message);
    }

    clearErrors () {
        this.errors = null;
    }

    saveMessage () {
        console.log('saving message: ', this.currentMessage);
        return this.messagesService.save(this.currentMessage)
            .then((result) => {
                console.log('saved: ', result);
                this.clearErrors();
                Object.assign(this.currentMessage, this.loadBlank());
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