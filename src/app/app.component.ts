import { Component } from '@angular/core';
import {Subject} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'z_orm_docs';

  clickSideMenuSubject: Subject<void> = new Subject<void>();

  onClickSideMenu($event: void) {
    this.clickSideMenuSubject.next();
  }
}
