'use strict';

import Message from './message.class';

describe ('Message', function () {
    let msg;

    beforeEach (function () {
        bard.inject(this, '$rootScope', '$q');
    });

    describe ('will create a message object', function () {
        it ('has a default set of properties', function () {
            msg = new Message();
            expect(msg.id).toEqual(0);
            expect(msg.validate).toBeDefined();
        });

        it ('can apply properties to the message', function () {
            let message = {id: 42, note: 'foo'};
            msg = new Message(message);
            expect(msg.id).toEqual(message.id);
            expect(msg.note).toEqual(message.note);
            expect(msg.dateTime).toBeDefined();
        });
    });

    describe ('can validate a message', function () {
        it ('will validate a valid message', function () {
            let message = {id: 42, note: 'foo'};
            msg = new Message(message);
            let deferred = $q.defer();
            spyOn($q, 'defer').and.returnValue(deferred);
            spyOn(deferred, 'resolve');
            msg.validate($q);
            $rootScope.$digest();
            expect(deferred.resolve).toHaveBeenCalled();
        });

        it ('will not validate an invalid message', function () {
            let message = {id: 0, note: 'foo'};
            msg = new Message(message);
            let deferred = $q.defer();
            spyOn($q, 'defer').and.returnValue(deferred);
            spyOn(deferred, 'reject');
            msg.validate($q);
            $rootScope.$digest();
            expect(deferred.reject).toHaveBeenCalled();
        });
    });
});