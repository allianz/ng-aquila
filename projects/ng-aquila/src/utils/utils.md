---
title: Utilities
category: general
b2c: true
expert: true
stable: progress
noApi: true
---

### Type Guards

Typescript language features type narrowing inside code blocks if a certain condition is met.

However, in some cases, relying purely on typescript language features is not sufficient for appropriate type narrowing.

```ts
import { notNullable } from '@aposin/ng-aquila/utils';

const result1 = ['str', null].filter(s => s != null); // return type `(string | null)[]`

const result2 = ['str', null].filter(notNullable); // return type `string[]`
```

For this reason, we provide a set of commonly useful type guards that can be used in functions that accept such type guards, in addition to regular conditional statements.

<!-- example(utils-type-guards) -->

further reading: [www.typescriptlang.org/docs/handbook](https://www.typescriptlang.org/docs/handbook/advanced-types.html)
