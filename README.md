# redux-state-observable

[![Build Status](https://travis-ci.org/Ammonix/redux-state-observable.svg?branch=master)](https://travis-ci.org/Ammonix/redux-state-observable)
[![Coverage Status](https://coveralls.io/repos/github/Ammonix/redux-state-observable/badge.svg?branch=master)](https://coveralls.io/github/Ammonix/redux-state-observable?branch=master)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![npm](https://img.shields.io/npm/l/express.svg)](https://opensource.org/licenses/MIT)
[![david](https://david-dm.org/ammonix/react-redux-observable.svg)](https://david-dm.org)

[![NPM](https://nodei.co/npm/redux-state-observable.png)](https://nodei.co/npm/redux-state-observable/)

A tiny node module which returns the path to a [redux](https://www.npmjs.com/package/redux) state property as an [rxjs/observable](https://www.npmjs.com/package/rxjs) using [object-path](https://www.npmjs.com/package/object-path).

## Installation and Usage

### Install via npm and use with typescript

```bash
npm i redux-state-observable
```

To import and use the function:

```typescript
import { getValue$ } from "redux-state-observables";
const objectPath: string[] = ["object", "property"];
const name$: Observable<TState> = getValue$<TState, TValue>(store, objectPath); // TState represents the state type of the redux store (the type of the root object) while TValue represents the type of the value you want to subscribe to
const nameSubscription: Subscription = name$.subscribe(value =>
  console.log(value)
);
nameSubscription.unsubscribe();
```

### API

The following is the typescript function definiton:

```typescript
getValue$<TState, TValue = TState>( // Note that TValue is a optional paramter
  store: Store<TState>,
  objectPath: ObjectPathGlobal.IPath = "" // Note that the objectPath is an optional parameter.
): Observable<TValue>
```
