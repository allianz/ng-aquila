import { Component, OnInit } from '@angular/core';

/**
* @title Action Example
*/
@Component({
  selector: 'nx-action-example',
  styleUrls: ['action-example.css'],
  templateUrl: './action-example.html'
})
export class ActionExampleComponent implements OnInit {
  actions = [
    {
      icon: 'file-text',
      label: 'All Files'
    },
    {
      icon: 'calendar',
      label: 'Calendar'
    },
    {
      icon: 'mail-o',
      label: 'Email'
    },
    {
      icon: 'user-business-o',
      label: 'My Profile'
    },
    {
      icon: 'file',
      label: 'Recent Downloads'
    }
  ];

  selectedAction;

  constructor() {}

  ngOnInit() {
    this.selectedAction = this.actions[1];
  }

  onSelect(action) {
    this.selectedAction = action;
  }
}
