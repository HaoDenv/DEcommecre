import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/core/model/article';

@Component({
  selector: 'app-article-template',
  templateUrl: './article-template.component.html',
  styleUrls: ['./article-template.component.css']
})
export class ArticleTemplateComponent implements OnInit {
  @Input() article!: Article;

  constructor() { }

  ngOnInit() {
  }

}
