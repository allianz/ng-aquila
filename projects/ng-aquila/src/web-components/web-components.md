---
title: Web Components & ShadowDOM
category: general
b2c: true
expert: true
stable: done
noApi: true
a1: true
---

## Overview

When using Angular components with **ViewEncapsulation.ShadowDom** or building **Web Components**, you may encounter issues with overlay-based components (such as popovers, dropdowns, tooltips, modals, and context menus). This guide explains common problems and provides solutions to ensure these components work correctly within Shadow DOM boundaries.

## Overlay Components and Style Encapsulation

**Problem**:

Overlay-based components (popovers, dropdowns, tooltips, modals) render outside Shadow DOM boundaries by default, causing missing styles, theme inconsistencies, and positioning issues.

The Angular CDK `OverlayContainer` service creates a single global container (`<div class="cdk-overlay-container">`) appended to `document.body`. When your component uses Shadow DOM, overlays created inside it are still rendered in this global container, breaking the Shadow DOM encapsulation.

**Solution**: Dynamic Shadow Root Reference

Create a custom `OverlayContainer` that renders overlays inside your Shadow DOM root instead of the document body.

Here's a working example demonstrating this solution with a modal component:

<!-- example(web-components-modal-shadow-dom) -->

