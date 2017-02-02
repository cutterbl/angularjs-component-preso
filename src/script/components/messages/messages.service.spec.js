'use strict';

import MessagesService from './messages.service';
import Message from './message.class';

describe ('MessagesService', function () {
    let svc;

    beforeEach (function () {
        bard.inject(this, '$rootScope', '$q');
        svc = new MessagesService($q);
    });

    describe ('the constructor', function () {
        it ('will set some properties', function () {
            expect(angular.isArray(svc.messages)).toBeTruthy();
        });
    });

    describe ('saving messages', function () {
        it ('will handle the decision to add a message', function () {
            let message = {note: 'foo'};
            spyOn(svc, 'add');
            svc.save(message);
            expect(svc.add).toHaveBeenCalled();
        });

        it ('will handle the decision to update a message', function () {
            let message = {id: 42, note: 'foo'};
            spyOn(svc, 'update');
            svc.save(message);
            expect(svc.update).toHaveBeenCalled();
        });

        it ('will add a message to the list', function () {
           let startCount = svc.messages.length;
           let message = new Message({note: 'foo'});
           let deferred = $q.defer();
           spyOn(message, 'validate').and.returnValue(deferred.promise);
           svc.add(message);
           expect(message.validate).toHaveBeenCalled();
           deferred.resolve();
           $rootScope.$digest();
           expect(message.id).toEqual(startCount + 1);
           expect(svc.messages.length).toEqual(message.id);
        });

        it ('will update a message to the list', function () {
            let message = new Message({id: 7, note: 'foo', dateTime: new Date()});
            let start = message.note;
            svc.add(message);
            $rootScope.$digest();
            message.note = 'bar';
            let deferred = $q.defer();
            spyOn(message, 'validate').and.returnValue(deferred.promise);
            svc.update(message);
            expect(message.validate).toHaveBeenCalled();
            deferred.resolve();
            $rootScope.$digest();
            expect(message.note).not.toEqual(start);
        });
    });

    describe ('removal method', function () {
        it ('can remove a message from the list', function () {
            let message = new Message({id: 42, note: 'foo'});
            svc.add(message);
            $rootScope.$digest();
            let startCount = svc.messages.length;
            spyOn($q, 'resolve')
            svc.remove(message);
            expect(svc.messages.length).toEqual(startCount - 1);
        });
    });
});