---
title: Dynamic Tables
category: components
b2c: true
expert: true
stable: done
---

The **dynamic table** is a component to show data in an organized way in a simple table. This component implements the table using Angular CDK, specifically `cdk-table` that is an unopinionated, customizable data-table with a fully-templated API, dynamic columns, and an accessible DOM structure. When the viewport is smaller than the table, a horizontal scroll will appear on top of the table.

### Ways for implementation

User can choose between two options when implementing a dynamic table.

#### Passing data with column names

User can pass an array with the name of columns that he want to show, with order, custom name of columns and type of data ('numeric' or 'string') that it contain ( type numeric will align right ) . The structure of displayed columns array must be: `title: '-', key: '-', type: '-'`. The key param should match with the key of the data array.

<!-- example(dynamic-table) -->

#### Passing only data

User can use the dynamic table only passing the data. The name of columns will be the key and table will show all data.

<!-- example(dynamic-table-data) -->

#### No data provided

Without data provided. Users can add a customized message when they do not provide data to the DynamicTable.

<!-- example(dynamic-table-without-data) -->

### Table Event Example

<!-- example(dynamic-table-event) -->
