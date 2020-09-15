import { Component, OnInit, OnDestroy } from '@angular/core';
import { ComponentService } from '../../service/component.service';

@Component({
  selector: 'nxv-documentation',
  templateUrl: 'documentation-page.component.html',
  styleUrls: ['./documentation-page.component.scss']
})

export class NxvDocumentationComponent implements OnInit, OnDestroy {

  constructor(
    public componentService: ComponentService
  ) { }

  ngOnInit() { }

  ngOnDestroy() {
    this.componentService.current.next();
  }
}
