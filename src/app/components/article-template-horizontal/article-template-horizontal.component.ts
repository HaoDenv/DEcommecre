import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/core/model/article';

@Component({
  selector: 'app-article-template-horizontal',
  templateUrl: './article-template-horizontal.component.html',
  styleUrls: ['./article-template-horizontal.component.css']
})
export class ArticleTemplateHorizontalComponent implements OnInit {
  @Input() article!: Article;

  constructor() { }

  ngOnInit() {
  }

}
