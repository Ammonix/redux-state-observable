"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var redux_1 = require("redux");
require("rxjs/add/observable/of");
var lib_1 = require("../lib");
var Tree = /** @class */ (function () {
    function Tree() {
    }
    return Tree;
}());
function setup(initialState, reducerUpdate) {
    var store = redux_1.createStore(function (state, action) {
        state = state || initialState;
        switch (action.type) {
            case "UPDATE":
                return reducerUpdate(state, action.payload);
            default:
                return state;
        }
    });
    store.update = function (payload) {
        store.dispatch({ type: "UPDATE", payload: payload });
    };
    return store;
}
describe("getValue$ function", function () {
    it("should update simple observer", function () {
        var store = setup({ value: 1 }, function (_, payload) {
            return { value: payload };
        });
        var expected = 0;
        var store$ = lib_1.getValue$(store);
        var storeSubscription = store$.subscribe(function (tree) {
            expected++;
            chai_1.expect(tree.value).to.be.equal(expected);
        });
        store.update(2);
        chai_1.expect(expected).to.be.equal(2);
        storeSubscription.unsubscribe();
    });
    it("should update simple observer with path", function () {
        var store = setup({ value: 1 }, function (_, payload) {
            return { value: payload };
        });
        var expected = 0;
        var op = ["value"];
        var store$ = lib_1.getValue$(store, op);
        var storeSubscription = store$.subscribe(function (value) {
            expected++;
            chai_1.expect(value).to.be.equal(expected);
        });
        store.update(2);
        chai_1.expect(expected).to.be.equal(2);
        storeSubscription.unsubscribe();
    });
    it("should update observer with deep path", function () {
        var store = setup({ value: 1, tree: { value: 2 } }, function (state, payload) {
            return __assign({}, state, { tree: __assign({}, state.tree, { value: payload }) });
        });
        var expected = 1;
        var op = ["tree", "value"];
        var store$ = lib_1.getValue$(store, op);
        var storeSubscription = store$.subscribe(function (value) {
            expected++;
            chai_1.expect(value).to.be.equal(expected);
        });
        store.update(3);
        store.update(4);
        chai_1.expect(expected).to.be.equal(4);
        storeSubscription.unsubscribe();
    });
    it("should update observer with any value", function () {
        var store = setup({ value: null }, function (_, payload) {
            return { value: payload };
        });
        var expected = [null, 1, "a"];
        var op = ["value"];
        var pointer = 0;
        var store$ = lib_1.getValue$(store, op);
        var storeSubscription = store$.subscribe(function (value) {
            chai_1.expect(value).to.be.equal(expected[pointer]);
            pointer++;
        });
        store.update(1);
        store.update("a");
        chai_1.expect(expected[pointer - 1]).to.be.equal("a");
        storeSubscription.unsubscribe();
    });
});
//# sourceMappingURL=index.spec.js.map