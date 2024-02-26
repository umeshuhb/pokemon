import { NgModule} from '@angular/core';

import { CommonModule } from '@angular/common';
import { TabsComponent } from './components/tabs/tabs.component';
import { TabComponent } from './components/tabs/tab-item/tab.component';

@NgModule({
  declarations: [
    TabsComponent, TabComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [TabsComponent, TabComponent]
})
export class SharedModule { }
