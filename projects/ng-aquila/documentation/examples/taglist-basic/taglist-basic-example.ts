import { Component } from '@angular/core';

/**
 * @title Tag Basic Example
 */
@Component({
  selector: 'nx-taglist-basic-example',
  templateUrl: './taglist-basic-example.html'
})
export class TagListBasicExampleComponent {

  public tags: string[] = ['Apples', 'Oranges', 'Bananas', 'Strawberries', 'Melons', 'Lemons'];
}
