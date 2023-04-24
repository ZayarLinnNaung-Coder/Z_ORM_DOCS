import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  AfterViewInit,
  AfterContentInit,
  AfterViewChecked
} from '@angular/core';
import {Docs} from "../model/Docs";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent{
  @Input() docsMapArray: {key: string, values: Docs[] }[] = [];
  @Output() content = new EventEmitter<string>();

  onClickMenuLink(docs: Docs, event: Event) {
    this.addActiveToTargetElement(event.target as HTMLElement);
    this.content.emit(docs.content);
  }

  private addActiveToTargetElement(targetElement: HTMLElement){
    // this.addActiveToTargetElement(document.querySelector('.menu-link') as HTMLElement);

    document.querySelectorAll('.menu-link').forEach(menuLinkElement => {
      menuLinkElement.classList.remove('active');
    })

    if(!targetElement.classList.contains('active')){
      targetElement.classList.add('active');
    }
  }
}
