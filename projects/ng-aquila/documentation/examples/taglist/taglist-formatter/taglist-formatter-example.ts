import { Component } from '@angular/core';

/**
 * @title Tag Formatter Example
 */
@Component({
  selector: 'nx-taglist-formatter-example',
  templateUrl: './taglist-formatter-example.html'
})
export class TaglistFormatterExampleComponent {

  public tags: string[] = ['Apples', 'Oranges', 'Bananas', 'Strawberries', 'Melons', 'Lemons'];

  myFormatter(value: string): string {
    return 'my ' + value;
  }
}
