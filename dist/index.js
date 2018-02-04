"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var object_path_1 = require("object-path");
var Observable_1 = require("rxjs/Observable");
function getValue$(store, objectPath) {
    if (objectPath === void 0) { objectPath = ""; }
    var value = object_path_1.get(store.getState(), objectPath);
    return new Observable_1.Observable(function (observer) {
        observer.next(value);
        var unsubscribe = store.subscribe(function () {
            observer.next(value);
        });
        return unsubscribe;
    });
}
exports.getValue$ = getValue$;
