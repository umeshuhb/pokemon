import { Component, Input } from '@angular/core';

@Component({
  selector: 'tab',
  templateUrl: './tab.component.html',
  styles: [
    `.pane{
      padding: 1em;
    }
  `
  ],
  
})
export class TabComponent {
  @Input('tabTitle') title?: string;
  @Input() active = false;
}
