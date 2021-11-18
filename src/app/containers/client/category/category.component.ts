import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Menu } from 'src/app/core/model/menu';
import { ProductService } from 'src/app/core/service/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  menu!: Menu;
  nzLoading: boolean = false;

  filter = {
    menuAlias: "",
    orderBy: "highlight",
    price: "all",
    take: 20
  }

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private viewportScroller: ViewportScroller,
    private router: Router
  ) {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.filter.menuAlias = this.activatedRoute.snapshot.params.alias;
        this.filter.take = 20;
        this.getData();
      }
    });
  }

  ngOnInit() {
    this.filter.menuAlias = this.activatedRoute.snapshot.params.alias;
    this.getData();
  }

  getData() {
    this.productService.getByMenu(this.filter.menuAlias, this.filter.orderBy, this.filter.price, this.filter.take)
      .subscribe((resp: any) => {
        this.menu = JSON.parse(resp["data"])
      }, error => {

      })
  }

  showMore() {
    let currentLocation: [number, number] = this.viewportScroller.getScrollPosition();
    this.filter.take += 20;
    this.nzLoading = true;
    this.productService.getByMenu(this.filter.menuAlias, this.filter.orderBy, this.filter.price, this.filter.take)
      .pipe(
        finalize(() => {
          this.nzLoading = false;
        })
      )
      .subscribe((resp: any) => {
        this.menu = JSON.parse(resp["data"])
        setTimeout(() => {
          this.viewportScroller.scrollToPosition(currentLocation)
        }, 10);
      }, error => {

      })
  }
}
