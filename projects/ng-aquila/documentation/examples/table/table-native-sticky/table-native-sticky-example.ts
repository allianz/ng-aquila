import { Component } from '@angular/core';

/**
 * @title Native table with sticky header and sticky first column
 */
@Component({
  selector: 'table-native-sticky-example',
  templateUrl: './table-native-sticky-example.html',
  styleUrls: ['./table-native-sticky-example.css'],
})
export class TableNativeStickyExampleComponent {
  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  rows = [
    {
      product: 'Car Insurance',
      values: [12, 18, 9, 24, 31, 22, 14, 27, 19, 33, 28, 21],
    },
    {
      product: 'Health Insurance',
      values: [42, 38, 51, 47, 39, 55, 61, 44, 49, 52, 58, 63],
    },
    {
      product: 'Liability Insurance',
      values: [7, 11, 5, 14, 9, 16, 12, 8, 13, 10, 15, 18],
    },
    {
      product: 'Pension Plan',
      values: [25, 29, 22, 34, 41, 38, 30, 27, 36, 44, 39, 47],
    },
    {
      product: 'Home Insurance',
      values: [19, 23, 17, 28, 32, 26, 21, 30, 24, 35, 31, 29],
    },
    {
      product: 'Travel Insurance',
      values: [3, 8, 14, 22, 35, 48, 52, 49, 31, 17, 9, 6],
    },
    {
      product: 'Life Insurance',
      values: [56, 52, 61, 58, 64, 70, 67, 59, 63, 72, 68, 75],
    },
    {
      product: 'Legal Protection',
      values: [4, 6, 9, 7, 11, 8, 13, 10, 12, 9, 15, 14],
    },
    {
      product: 'Pet Insurance',
      values: [2, 5, 7, 6, 9, 12, 14, 11, 8, 7, 5, 4],
    },
    {
      product: 'Accident Insurance',
      values: [21, 26, 18, 31, 28, 24, 33, 29, 22, 36, 30, 27],
    },
  ];
}
