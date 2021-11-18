import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-master-layout',
  templateUrl: './master-layout.component.html',
  styleUrls: ['./master-layout.component.css']
})
export class MasterLayoutComponent implements OnInit {
  isCollapsed: boolean = false;
  constructor(
    private ngZone: NgZone,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout() {
    this.navigate("/admin/dang-xuat")
  }

  navigate(path: string): void {
    this.ngZone.run(() => this.router.navigateByUrl(path)).then();
  }
}
