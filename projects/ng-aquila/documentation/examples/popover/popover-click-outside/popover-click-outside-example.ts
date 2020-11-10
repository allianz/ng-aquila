import { Component } from '@angular/core';

/**
* @title Closing on document click
*/
@Component({
  templateUrl: './popover-click-outside-example.html',
  styleUrls: ['./popover-click-outside-example.css']
})
export class PopoverClickOutsideExampleComponent {

  closeOnDocClick = true;
  popoverManualOpenFlag = false;

  closeOnClickOutside() {
    this.closeOnDocClick = !this.closeOnDocClick;
  }
}
