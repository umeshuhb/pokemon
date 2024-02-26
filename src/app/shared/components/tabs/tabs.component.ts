import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  ViewContainerRef
} from '@angular/core';

import { TabComponent } from './tab-item/tab.component';

@Component({
  selector: 'tabs-component',
  templateUrl:'./tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements AfterContentInit {
  
  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;
  
  ngAfterContentInit() {
    let activeTabs = this.tabs.filter((tab)=>tab.active);
    
    // if there is no active tab set, active the first
    if(activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }
  
  selectTab(tab: TabComponent){
    // deactivate all tabs
    this.tabs.toArray().forEach(tab => tab.active = false);
    // activate the tab the user has clicked on.
    tab.active = true;
  }
}
