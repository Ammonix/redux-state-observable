/// <reference types="object-path" />
import { Store } from "redux";
import { Observable } from "rxjs/Observable";
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
export declare function getValue$<TState, TValue = TState>(store: Store<TState>, objectPath?: ObjectPathGlobal.IPath): Observable<TValue>;
