"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var object_path_1 = require("object-path");
var Observable_1 = require("rxjs/Observable");
/**
 * Creates an rxjs/Observable from redux store state property using object-path.
 *
 * @export
 * @template TState
 * @template TValue
 * @param {Store<TState>} store The redux store which gets subscribed to.
 * @param {ObjectPathGlobal.IPath} [objectPath=[]] Optional parameter which determines the path to the property that the observable emits, default is root.
 * @returns {Observable<TValue>} The observable which emits the property each time the redux store subscription listener gets called.
 */
function getValue$(store, objectPath) {
    if (objectPath === void 0) { objectPath = []; }
    return new Observable_1.Observable(function (subscriber) {
        var unsubscribe = store.subscribe(function () {
            var value = object_path_1.get(store.getState(), objectPath);
            subscriber.next(value);
        });
        return unsubscribe;
    });
}
exports.getValue$ = getValue$;
//# sourceMappingURL=index.js.map