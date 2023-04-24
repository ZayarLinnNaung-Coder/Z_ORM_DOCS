import { Component } from '@angular/core';
import {ContentfulService} from "../../service/contentful.service";
import {Docs} from "./model/Docs";
import {documentToHtmlString} from "@contentful/rich-text-html-renderer";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {

  data: {key: string, values: Docs[] }[] = [];
  content: string = '';

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
