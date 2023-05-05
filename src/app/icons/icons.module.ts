import { NgModule } from '@angular/core';
import { Menu } from 'angular-feather/icons';
import {FeatherModule} from "angular-feather";

// Select some icons (use an object, not an array)
const icons = {
  Menu
};

@NgModule({
  declarations: [],
  imports: [
    FeatherModule.pick(icons)
  ],
  exports: [FeatherModule]
})
export class IconsModule { }
