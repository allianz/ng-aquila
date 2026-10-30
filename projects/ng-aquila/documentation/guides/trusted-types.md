---
title: Trusted Types
---

# Trusted Types

[Trusted Types](https://developer.mozilla.org/en-US/docs/Web/API/Trusted_Types_API) is a browser security feature that blocks assigning plain strings to DOM sinks like `innerHTML`, which helps prevent DOM-based cross-site scripting (XSS). You turn it on with a Content Security Policy (CSP).

Aquila supports Trusted Types. Wherever the library has to write HTML to the DOM, it does so through its own Trusted Types policy named `ng-aquila`.

## Configuring your CSP

Allow the `ng-aquila` policy next to the policies of Angular and the Angular CDK:

```
Content-Security-Policy: trusted-types angular angular#components ng-aquila; require-trusted-types-for 'script';
```

| Policy               | Registered by    | Needed for                                                                    |
| -------------------- | ---------------- | ----------------------------------------------------------------------------- |
| `angular`            | `@angular/core`  | Angular itself, e.g. sanitized `[innerHTML]` bindings                         |
| `angular#components` | `@angular/cdk`   | CDK and Angular Material features that write HTML                             |
| `ng-aquila`          | Aquila           | Parsing SVG icons registered in `NxIconRegistry` (built-in and custom icons)  |

### `angular#unsafe-bypass`

Angular needs the `angular#unsafe-bypass` policy whenever a value created with a `DomSanitizer` bypass method such as `bypassSecurityTrustHtml` or `bypassSecurityTrustResourceUrl` is used in a template binding. This applies to:

- **`nx-video`**, which builds the YouTube embed URL with `bypassSecurityTrustResourceUrl` and binds it to the iframe `src`. See the [video documentation](./documentation/video/overview).
- Your own bindings that use a bypass method.

Without the policy, the browser logs `Creating a TrustedTypePolicy named 'angular#unsafe-bypass' violates the following Content Security policy directive` when the video starts. The video still plays, because an iframe `src` is not a Trusted Types sink. To avoid the error, add the policy to your CSP:

```
Content-Security-Policy: trusted-types angular angular#components angular#unsafe-bypass ng-aquila; require-trusted-types-for 'script';
```

Only add it if you need it: it allows every bypassed value in your application, not just the ones from Aquila. See the [Angular security guide](https://angular.dev/best-practices/security#enforcing-trusted-types) for details.

If `ng-aquila` is missing from the CSP, the browser refuses to create the policy and logs an error, and icons fail to render with `This document requires 'TrustedHTML' assignment`.

## What the policy trusts

The `ng-aquila` policy only wraps markup the library has already decided to trust:

- **Icon literals** (`addSvgIconLiteral`) must be marked as trusted with `bypassSecurityTrustHtml` and are parsed as-is, so only register markup you control.
- **Icons loaded by URL** (`addSvgIcon`) are parsed as-is, the same way the Angular Material icon registry handles them. The URL itself has to be marked as a trusted resource URL, so only register URLs that serve SVGs you control.