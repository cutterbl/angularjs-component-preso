'use strict';

import MessagesController from './messages.controller';

describe ('MessagesController', function () {
    let messagesService,
        ctrl;

    beforeEach (function () {
        bard.inject(this, '$rootScope', '$q');
        messagesService = jasmine.createSpyObj('messagesService', ['save', 'remove']);
        messagesService.messages = [];
        ctrl = new MessagesController($q, messagesService);
    });

    describe ('has a constructor', function () {
        it ('should apply some properties to the controller', function () {
            expect(ctrl.note).toBeDefined();
            expect(ctrl.messages).toEqual(messagesService.messages);
        });
    });

    describe ('the component methods', function () {
        it ('should call $doInit on component initialization', function () {
            spyOn(ctrl, 'loadMessage');
            ctrl.$doInit();
            expect(ctrl.loadMessage).toHaveBeenCalled();
        });
    });

    describe ('has methods for working with errors', function () {
        it ('should clear all errors', function () {
            ctrl.errors = ['error 1', 'error2'];
            $rootScope.$digest();
            ctrl.clearErrors();
            $rootScope.$digest();
            expect(ctrl.errors).toBeNull();
        });

        it ('should transform errors into an array', function () {
            expect(ctrl.errors).toBeNull();
            ctrl.transformErrors('new error');
            $rootScope.$digest();
            expect(angular.isArray(ctrl.errors)).toBeTruthy();
        });
    });

    describe ('has methods for working with messages', function () {
        it ('has facility for loading a blank message', function () {
            expect(ctrl.currentMessage).toEqual({});
            spyOn(ctrl, 'clearErrors');
            ctrl.loadMessage();
            $rootScope.$digest();
            expect(ctrl.currentMessage).toEqual(ctrl.blankMessage);
            expect(ctrl.note).toEqual(ctrl.blankMessage.note);
            expect(ctrl.clearErrors).toHaveBeenCalled();
        });

        it ('has facility for loading messages', function () {
            expect(ctrl.currentMessage).toEqual({});
            spyOn(ctrl, 'clearErrors');
            let message = {id: 7, note: 'some note', dateTime: new Date()};
            ctrl.loadMessage({message: message});
            $rootScope.$digest();
            expect(ctrl.currentMessage).toEqual(message);
            expect(ctrl.note).toEqual(message.note);
            expect(ctrl.clearErrors).toHaveBeenCalled();
        });

        it ('has facility for saving a message', function () {
            ctrl.loadMessage();
            $rootScope.$digest();
            let note = 'foo';
            const deferred = $q.defer();
            messagesService.save.and.returnValue(deferred.promise);
            ctrl.saveMessage(note);
            expect(messagesService.save).toHaveBeenCalled();
            spyOn(ctrl, 'loadMessage');
            deferred.resolve({note: note});
            $rootScope.$digest();
            expect(ctrl.loadMessage).toHaveBeenCalled();
        });

        it ('has facility for catching errors when saving a message', function () {
            ctrl.loadMessage();
            $rootScope.$digest();
            let note = 'foo';
            const deferred = $q.defer();
            messagesService.save.and.returnValue(deferred.promise);
            ctrl.saveMessage(note);
            expect(messagesService.save).toHaveBeenCalled();
            spyOn(ctrl, 'transformErrors');
            deferred.reject('some error');
            $rootScope.$digest();
            expect(ctrl.transformErrors).toHaveBeenCalled();
        });

        it ('can remove a message', function () {
            const deferred = $q.defer();
            messagesService.remove.and.returnValue(deferred.promise);
            ctrl.loadMessage();
            $rootScope.$digest();
            let message = {note: 'bar'};
            ctrl.removeMessage(message);
            expect(messagesService.remove).toHaveBeenCalledWith(message);
            spyOn(ctrl, 'clearErrors');
            deferred.resolve();
            $rootScope.$digest();
            expect(ctrl.clearErrors).toHaveBeenCalled();
        });

        it ('can remove a message and load a blank if they were the same', function () {
            const deferred = $q.defer();
            messagesService.remove.and.returnValue(deferred.promise);
            let message = {note: 'bar'};
            ctrl.loadMessage({message: message});
            $rootScope.$digest();
            ctrl.removeMessage(message);
            expect(messagesService.remove).toHaveBeenCalledWith(message);
            spyOn(ctrl, 'loadMessage');
            deferred.resolve();
            $rootScope.$digest();
            expect(ctrl.loadMessage).toHaveBeenCalled();
        });

        it ('can catch an error when removing a message', function () {
            const deferred = $q.defer();
            messagesService.remove.and.returnValue(deferred.promise);
            ctrl.loadMessage();
            $rootScope.$digest();
            let message = {note: 'bar'};
            ctrl.removeMessage(message);
            expect(messagesService.remove).toHaveBeenCalledWith(message);
            spyOn(ctrl, 'loadMessage');
            spyOn(ctrl, 'transformErrors');
            deferred.reject('foo');
            $rootScope.$digest();
            expect(ctrl.loadMessage).toHaveBeenCalled();
            expect(ctrl.transformErrors).toHaveBeenCalledWith('foo');
        });
    });
});