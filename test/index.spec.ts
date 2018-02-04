import { expect } from "chai";
import "mocha";
import { AnyAction, createStore, Store } from "redux";
import "rxjs/add/observable/of";
import { Observable } from "rxjs/Observable";
import { getValue$ } from "../lib";

class Tree {
  public tree?: Tree;
  public value?: number;
}
interface ICustomStore<TState, TPayload> extends Store<TState> {
  update: (payload: TPayload) => void;
}

function setup<TState, TPayload>(
  initialState: TState,
  reducerUpdate: (state: TState, payload: TPayload) => TState
): ICustomStore<TState, TPayload> {
  var store: ICustomStore<TState, TPayload> = createStore(
    (state: TState, action: AnyAction) => {
      state = state || initialState;
      switch (action.type) {
        case "UPDATE":
          return reducerUpdate(state, action.payload);
        default:
          return state;
      }
    }
  ) as ICustomStore<TState, TPayload>;
  store.update = (payload: TPayload) => {
    store.dispatch({ type: "UPDATE", payload: payload });
  };
  return store;
}

describe("getValue$ function", () => {
  it("should update", () => {
    const store: ICustomStore<Tree, number> = setup(
      { value: 1 },
      (_, payload) => {
        return { value: payload };
      }
    );
    let expected: number = 0;
    const store$: Observable<Tree> = getValue$(store);
    store$.subscribe(tree => {
      expected++;
      expect(tree.value).to.be.equal(expected);
      console.log("res", tree);
    });
    store.update(2);
    expect(expected).to.be.equal(2);
  });
});
