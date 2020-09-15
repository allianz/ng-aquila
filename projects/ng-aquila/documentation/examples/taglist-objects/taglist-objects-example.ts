import { Component } from '@angular/core';

/**
 * @title Tag Objects Example
 */
@Component({
  selector: 'nx-taglist-objects-example',
  templateUrl: './taglist-objects-example.html'
})
export class TagListObjectsExampleComponent {

  public tags: any[] = [{ 'nxTaglistLabel': 'Apples' }, { 'nxTaglistLabel': 'Oranges' }, { 'nxTaglistLabel': 'asd' }];
}
