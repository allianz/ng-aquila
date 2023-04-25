---
title: Dynamic Tables
category: components
b2c: true
expert: true
stable: done
---

The **dynamic table** is a component to show data in an organized way in a simple table. This component implements the table using Angular CDK, specifically `cdk-table` that is an unopinionated, customizable data-table with a fully-templated API, dynamic columns, and an accessible DOM structure. When the viewport is smaller than the table, a horizontal scroll will appear on top of the table.

Please note that **supported data types** are string and numeric. Using markup, images or other components in dynamic tables is not currently possible.

### Ways for implementation

User can choose between two options when implementing a dynamic table.

#### With column definitions

User can pass an array of column definitions, including the ordering, display name and the type of data ('numeric' will align right) as `NxDynamicTablColumnDefinition[]`. The key param should match the property name of the data.

<!-- example(dynamic-table) -->

#### Passing data only

User can omit column definitions. The name of columns will fall back to the property name of the data and the table will show all data.

<!-- example(dynamic-table-data) -->

#### No data provided

Without data provided. Users can add a customized message when they do not provide any data.

<!-- example(dynamic-table-without-data) -->

### Table Event Example

<!-- example(dynamic-table-event) -->

### Table Column Options

<!-- example(dynamic-table-column-options) -->
