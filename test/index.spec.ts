import { expect } from "chai";
import "mocha";
import { AnyAction, createStore, Store } from "redux";
import "rxjs/add/observable/of";
import { Observable } from "rxjs/Observable";
import { getValue$ } from "../lib";
import { Subscription } from "rxjs/Subscription";

class Tree<TValue> {
  public tree?: Tree<TValue>;
  public value?: TValue;
}
interface ICustomStore<TState, TPayload> extends Store<TState> {
  update: (payload: TPayload) => void;
}

function setup<TState, TPayload>(
  initialState: TState,
  reducerUpdate: (state: TState, payload: TPayload) => TState
): ICustomStore<TState, TPayload> {
  var store: ICustomStore<
    TState,
    TPayload
  > = createStore((state: TState, action: AnyAction) => {
    state = state || initialState;
    switch (action.type) {
      case "UPDATE":
        return reducerUpdate(state, action.payload);
      default:
        return state;
    }
  }) as ICustomStore<TState, TPayload>;
  store.update = (payload: TPayload) => {
    store.dispatch({ type: "UPDATE", payload: payload });
  };
  return store;
}

describe("getValue$ function", () => {
  it("should update simple observer", () => {
    const store: ICustomStore<Tree<number>, number> = setup(
      { value: 1 },
      (_, payload) => {
        return { value: payload };
      }
    );
    let expected: number;
    const store$: Observable<Tree<number>> = getValue$(store);
    const storeSubscription: Subscription = store$.subscribe(tree => {
      expect(tree.value).to.be.equal(expected);
    });
    expected = 1;
    store.update(1);
    expected = 2;
    store.update(2);
    expect(expected).to.be.equal(2);
    storeSubscription.unsubscribe();
  });
  it("should update simple observer with path", () => {
    const store: ICustomStore<Tree<number>, number> = setup(
      { value: 1 },
      (_, payload) => {
        return { value: payload };
      }
    );
    let expected: number;
    const op: string[] = ["value"];
    const store$: Observable<number> = getValue$<Tree<number>, number>(
      store,
      op
    );
    const storeSubscription: Subscription = store$.subscribe(value => {
      expect(value).to.be.equal(expected);
    });
    expected = 1;
    store.update(1);
    expected = 2;
    store.update(2);
    expect(expected).to.be.equal(2);
    storeSubscription.unsubscribe();
  });
  it("should update observer with deep path", () => {
    const store: ICustomStore<Tree<number>, number> = setup(
      { value: 1, tree: { value: 2 } },
      (state, payload) => {
        return { ...state, tree: { ...state.tree, value: payload } };
      }
    );
    let expected: number;
    const op: string[] = ["tree", "value"];
    const store$: Observable<number> = getValue$<Tree<number>, number>(
      store,
      op
    );
    const storeSubscription: Subscription = store$.subscribe(value => {
      expect(value).to.be.equal(expected);
    });
    expected = 3;
    store.update(3);
    expected = 4;
    store.update(4);
    expect(expected).to.be.equal(4);
    storeSubscription.unsubscribe();
  });
  it("should update observer with any value", () => {
    const store: ICustomStore<Tree<any>, any> = setup(
      { value: null },
      (_, payload) => {
        return { value: payload };
      }
    );
    let expected: any;
    const op: string[] = ["value"];
    let pointer: number = 0;
    const store$: Observable<Tree<number>> = getValue$(store, op);
    const storeSubscription: Subscription = store$.subscribe(value => {
      expect(value).to.be.equal(expected);
    });
    expected = 1;
    store.update(1);
    expected = "a";
    store.update("a");
    expect(expected[pointer - 1]).to.be.equal("a");
    storeSubscription.unsubscribe();
  });
});
