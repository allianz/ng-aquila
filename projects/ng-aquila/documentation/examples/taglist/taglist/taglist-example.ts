import { Component } from '@angular/core';

/**
 * @title Tag Example
 */
@Component({
  selector: 'nx-taglist-example',
  templateUrl: './taglist-example.html'
})
export class TaglistExampleComponent {

  public tags: string[] = ['Apples', 'Oranges', 'Bananas', 'Strawberries', 'Melons', 'Lemons'];
}
