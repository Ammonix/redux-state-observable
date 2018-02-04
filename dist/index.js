"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
function getValue$(store) {
    // let value: TValue = getValue<TState, TValue>(store.getState(), objectPath);
    return new Observable_1.Observable(function (observer) {
        observer.next(store.getState());
        var unsubscribe = store.subscribe(function () {
            observer.next(store.getState());
        });
        return unsubscribe;
    });
}
exports.getValue$ = getValue$;
