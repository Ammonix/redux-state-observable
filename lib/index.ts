import { get as getValue } from "object-path";
import { Store, Unsubscribe } from "redux";
import { Observable } from "rxjs/Observable";
export function getValue$<TState, TValue = TState>(
  store: Store<TState>,
  objectPath: ObjectPathGlobal.IPath = ""
): Observable<TValue> {
  let value: TValue = getValue<TState, TValue>(store.getState(), objectPath);
  return new Observable(observer => {
    observer.next(value);
    const unsubscribe: Unsubscribe = store.subscribe(() => {
      value = getValue<TState, TValue>(store.getState(), objectPath);
      observer.next(value);
    });
    return unsubscribe;
  });
}
