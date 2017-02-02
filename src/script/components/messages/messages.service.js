'use strict';

import Message from './message.class';

export default /*@ngInject*/ class MessagesService {

    constructor ($q) {
        this.$q = $q;
        this.messages = [];
    }

    save (message) {
        console.log('saving');
        message = angular.copy((message instanceof Message) ? message : new Message(message));
        console.log('Message: ', message);
        if (message.id) {
            return this.update(message);
        } else {
            return this.add(message);
        }
    }

    add (message) {
        console.log('add it', message);
        message.id = message.id || this.messages.length + 1;
        return message.validate(this.$q)
            .then(() => {
                this.messages.push(message);
                console.log('message added');
                return message;
            });
    }

    update (message) {
        console.log('update it', message);
        let found = this.messages.find((el) => el.id === message.id);
        if (found) {
            let copy = angular.copy(found);
            found.dateTime = new Date();
            return message.validate(this.$q)
                .then(() => {
                    console.log('message updated');
                    return found;
                })
                .catch(() => {found = copy;});
        } else {
            return this.$q.reject(`Message not found with id ${message.id}`);
        }
    }

    remove (message) {
        let index = this.messages.findIndex((el) => el.id === message.id);
        if (index > -1) {
            this.messages.splice(index, 1);
            return this.$q.resolve();
        } else {
            return this.$q.reject(`Message not found with id ${message.id}`);
        }
    }

}