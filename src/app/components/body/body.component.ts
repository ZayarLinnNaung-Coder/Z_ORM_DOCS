import {Component, Input, OnInit} from '@angular/core';
import {ContentfulService} from "../../service/contentful.service";
import {Docs} from "./model/Docs";
import {documentToHtmlString} from "@contentful/rich-text-html-renderer";
import {Observable} from "rxjs";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit{

  @Input() events!: Observable<void>;

  data: {key: string, values: Docs[] }[] = [];
  content: string = '';

  ngOnInit(): void {
    let sideBarMenu = document.querySelector(".menu-section");
    this.events.subscribe(() => {
      // @ts-ignore
      sideBarMenu.classList.toggle('active');
      // @ts-ignore
      console.log(sideBarMenu.classList);
    })
  }

  constructor(private contentfulService: ContentfulService) {
    contentfulService.getDocs().subscribe(response => {
      response.forEach((res: any) => {
        const y: Docs = res.fields;
        this.addValueToKeyArray(y.category, y);
      })
    })
  }

  addValueToKeyArray(key: string, value: Docs) {
    const existingPair: any = this.data.find((pair: any) => pair.key === key);

    if (existingPair) {
      existingPair.values.push(value);
    } else {
      const newPair: any = {
        key: key,
        values: [value]
      };

      this.data.push(newPair);
    }
  }

  onContentEmit(content: any) {
    this.content = documentToHtmlString(content);
  }
}
