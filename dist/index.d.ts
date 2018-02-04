import { Store } from "redux";
import { Observable } from "rxjs/Observable";
export declare function getValue$<TState>(store: Store<TState>): Observable<TState>;
