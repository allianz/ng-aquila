import { Component } from '@angular/core';

/**
 * @title Tag Keyword Example
 */
@Component({
  selector: 'taglist-keyword-example',
  templateUrl: './taglist-keyword-example.html',
  styleUrls: ['./taglist-keyword-example.css']
})
export class TaglistKeywordExampleComponent {

  public tags: string[] = ['Apples', 'Oranges', 'Bananas', 'Strawberries', 'Melons', 'Lemons'];
}
