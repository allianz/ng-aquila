import { Component } from '@angular/core';
import { SPACE, ENTER } from '@angular/cdk/keycodes';

/**
* @title Popover Trigger Example
*/
@Component({
  selector: 'nx-popover-trigger-example',
  templateUrl: './popover-trigger-example.html',
  styleUrls: ['./popover-trigger-example.css']
})
export class PopoverTriggerExampleComponent {
  popoverManualOpenFlag = false;
  handleKeydown(event) {
    switch (event.keyCode) {
      case SPACE:
      case ENTER:
        this.popoverManualOpenFlag = !this.popoverManualOpenFlag;
        break;
      default:
        return;
    }
  }
}
