import { Injectable } from '@angular/core';
import {createClient} from "contentful";
import {CONFIG} from "../constant/Config";
import {from, Observable, of} from "rxjs";
import {documentToHtmlString} from "@contentful/rich-text-html-renderer";

@Injectable({
  providedIn: 'root'
})
export class ContentfulService {

  private client = createClient({
    space: CONFIG.space,
    accessToken: CONFIG.accessToken
  })

  private filterQuery = {
    content_type: CONFIG.contentTypeIds.zOrmDocs,
    order: 'sys.createdAt'
  };

  getDocs(): Observable<any>{
    return from(this.client.getEntries(this.filterQuery).then(res => {
      return res.items
    }));
  }

  getFirstContent(): Observable<string>{
    return from(this.client.getEntry("69j5TbulpLNkFaV4TonpCf").then(entry => {
      // @ts-ignore
      return documentToHtmlString(entry.fields.content);
    }))
  }

}
