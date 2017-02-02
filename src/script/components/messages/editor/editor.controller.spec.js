'use strict';

import MessageEditorController from './editor.controller';

describe ('MessageEditorController', function () {
    let ctrl;

    beforeEach (function () {
        bard.inject(this, '$rootScope', '$q');
        ctrl = new MessageEditorController();
        ctrl.note = '';
        ctrl.onSave = jasmine.createSpy();
        $rootScope.$digest();
    });

    describe ('controller instance', function () {
        it ('the constructor will have set some properties', function () {
            expect(ctrl.el).toBeNull();
        });
    });

    describe ('component methods', function () {
        it ('should handle the $postLink', function () {
            let el = {
                focus: jasmine.createSpy(),
                select: jasmine.createSpy()
            };
            spyOn(document, 'querySelector').and.returnValue(el);
            ctrl.$postLink();
            $rootScope.$digest();
            expect(ctrl.el).toEqual(el);
            expect(el.focus).toHaveBeenCalled();
        });

        it ('should handle the $onInit', function () {
            expect(ctrl.noteCopy).not.toBeDefined();
            ctrl.$onInit();
            $rootScope.$digest();
            expect(ctrl.noteCopy).toEqual(ctrl.note);
        });

        it ('should handle changes from the parent controller with $onChanges', function () {
            let changes = {
                note: {
                    currentValue: 'foo',
                    previousValue: '',
                    isFirstChange: jasmine.createSpy()
                }
            };
            spyOn(ctrl, 'focusAndSelect');
            ctrl.$onChanges(changes);
            $rootScope.$digest();
            expect(ctrl.note).toEqual(changes.note.currentValue);
            expect(ctrl.focusAndSelect).toHaveBeenCalled();
        });
    });

    describe ('has some component instance specific methods', function () {
        beforeEach (function () {
            ctrl.el = {
                focus: jasmine.createSpy(),
                select: jasmine.createSpy()
            };
            ctrl.note = 'foo';
            ctrl.noteCopy = '';
            $rootScope.$digest();
        });

        it ('can focus and select on the element reference', function () {
            ctrl.focusAndSelect();
            $rootScope.$digest();
            expect(ctrl.el.focus).toHaveBeenCalled();
            expect(ctrl.el.select).toHaveBeenCalled();
        });

        it ('can handle enter on the element', function () {
            let $event = {
                preventDefault: jasmine.createSpy(),
                keyCode: 13
            };
            spyOn(ctrl, 'save');
            ctrl.handleKeypress($event);
            $rootScope.$digest();
            expect($event.preventDefault).toHaveBeenCalled();
            expect(ctrl.save).toHaveBeenCalled();
        });
    });

    describe ('handles saving', function () {
        it ('will save a new message', function () {
            let deferred = $q.defer();
            ctrl.onSave.and.returnValue(deferred.promise);
            spyOn(ctrl, 'focusAndSelect');
            ctrl.save();
            expect(ctrl.onSave).toHaveBeenCalledWith({note: ctrl.note});
            deferred.resolve();
            $rootScope.$digest();
            expect(ctrl.note).toEqual(ctrl.noteCopy);
            expect(ctrl.focusAndSelect).toHaveBeenCalled();
        });
    });
});