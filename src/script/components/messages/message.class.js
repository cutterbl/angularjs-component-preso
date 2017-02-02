'use strict';

export default class Message {

    constructor ({id = 0, note = '', date = new Date()} = {}) {
        Object.assign(this, {id: id, note: note, dateTime: date});
    }

    validate ($q) {
        const deferred = $q.defer();
        const errArr = [];
        if (!this.id) {
            errArr.push('Invalid message index.');
        }
        if (!this.note.length) {
            errArr.push('Your message must have a value');
        }
        if (errArr.length) {
            deferred.reject(errArr);
        } else {
            deferred.resolve();
        }
        return deferred.promise;
    }

}