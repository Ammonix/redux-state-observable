/// <reference types="object-path" />
import { Store } from "redux";
import { Observable } from "rxjs/Observable";
export declare function getValue$<TState, TValue = TState>(store: Store<TState>, objectPath?: ObjectPathGlobal.IPath): Observable<TValue>;
