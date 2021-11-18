import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Article } from 'src/app/core/model/article';
import { ArticleService } from 'src/app/core/service/article.service';

@Component({
  selector: 'app-article-ext',
  templateUrl: './article-ext.component.html',
  styleUrls: ['./article-ext.component.css']
})
export class ArticleExtComponent implements OnInit {
  articleAlias: string = "";
  article!: Article;

  constructor(
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.articleAlias = this.activatedRoute.snapshot.params.alias;
        this.getData();
      }
    });
  }

  ngOnInit() {
    this.articleAlias = this.activatedRoute.snapshot.params.alias;
    this.getData();
  }

  getData() {
    this.articleService.getByAlias(this.articleAlias)
      .subscribe((resp: any) => {
        this.article = JSON.parse(resp["data"])
      }, error => {

      })
  }
}
