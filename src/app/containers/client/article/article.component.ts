import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Article } from 'src/app/core/model/article';
import { Menu } from 'src/app/core/model/menu';
import { ArticleService } from 'src/app/core/service/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  menu!: Menu;
  articleAlias: string = "";
  article!: Article;

  constructor(
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.router.events.forEach((event) => {
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
        this.getArticleRelated();
      }, error => {

      })
  }

  getArticleRelated() {
    if (this.article != null) {
      this.articleService.getByMenu(this.article.Menu.Alias, 10)
        .subscribe((resp: any) => {
          this.menu = JSON.parse(resp["data"])
        }, error => { })
    }
  }
}
