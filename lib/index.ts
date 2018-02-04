// import { get as getValue } from "object-path";
import { Store, Unsubscribe } from "redux";
import { Observable } from "rxjs/Observable";
export function getValue$<TState>(
  store: Store<TState>,
  // objectPath: ObjectPathGlobal.IPath = ""
): Observable<TState> {
  // let value: TValue = getValue<TState, TValue>(store.getState(), objectPath);
  return new Observable(subscriber => {
    subscriber.next(store.getState());
    const unsubscribe: Unsubscribe = store.subscribe(() => {
      subscriber.next(store.getState());
    });
    return unsubscribe;
  });
}
