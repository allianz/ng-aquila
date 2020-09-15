import { Component } from '@angular/core';

/**
 * @title Tag Keyword Example
 */
@Component({
  selector: 'nx-taglist-keyword-example',
  templateUrl: './taglist-keyword-example.html'
})
export class TagListKeywordExampleComponent {

  public tags: string[] = ['Apples', 'Oranges', 'Bananas', 'Strawberries', 'Melons', 'Lemons'];
}
