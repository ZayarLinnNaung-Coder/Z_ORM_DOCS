import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ContentfulService} from "../../../service/contentful.service";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, OnChanges{
  @Input() content: string = '';

  constructor(private contentfulService: ContentfulService) {
  }

  ngOnInit(): void {
    this.contentfulService.getFirstContent().subscribe((content: string) => {
      this.content = content.replace("code>", "pre>");
      console.log(this.content)
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.content = changes['content'].currentValue.replace("code>", "pre>");
  }


}
