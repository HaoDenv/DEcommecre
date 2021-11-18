import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Product } from 'src/app/core/model/product';
import { ProductService } from 'src/app/core/service/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  products: Product[] = [];
  nzLoading: boolean = false;

  filter = {
    keySearch: "",
    orderBy: "highlight",
    price: "all",
    take: 20
  }

  constructor(
    private productService: ProductService,
    private viewportScroller: ViewportScroller,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.filter.keySearch = this.activatedRoute.snapshot.params.alias;
        this.filter.take = 20;
        this.getData();
      }
    });
  }

  ngOnInit() {
    this.filter.keySearch = this.activatedRoute.snapshot.params.alias;
    this.getData();
  }

  getData() {
    this.productService.search(this.filter.keySearch, this.filter.orderBy, this.filter.price, this.filter.take)
      .subscribe((resp: any) => {
        this.products = JSON.parse(resp["data"])
      }, error => {

      })
  }

  showMore() {
    let currentLocation: [number, number] = this.viewportScroller.getScrollPosition();
    this.filter.take += 20;
    this.nzLoading = true;
    this.productService.search(this.filter.keySearch, this.filter.orderBy, this.filter.price, this.filter.take)
      .pipe(
        finalize(() => {
          this.nzLoading = false;
        })
      )
      .subscribe((resp: any) => {
        this.products = JSON.parse(resp["data"])
        setTimeout(() => {
          this.viewportScroller.scrollToPosition(currentLocation)
        }, 10);
      }, error => {

      })
  }
}
