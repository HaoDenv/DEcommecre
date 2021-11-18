import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleCategoryComponent } from './containers/client/article-category/article-category.component';
import { ArticleComponent } from './containers/client/article/article.component';
import { CartComponent } from './containers/client/cart/cart.component';
import { CategoryComponent } from './containers/client/category/category.component';
import { ForgotPasswordComponent } from './containers/client/forgot-password/forgot-password.component';
import { HomeComponent } from './containers/client/home/home.component';
import { LoginComponent } from './containers/client/login/login.component';
import { LogoutComponent } from './containers/client/logout/logout.component';
import { OrderSuccessfulComponent } from './containers/client/order-successful/order-successful.component';
import { ProductDetailComponent } from './containers/client/product-detail/product-detail.component';
import { SignUpComponent } from './containers/client/sign-up/sign-up.component';
import { MasterLayoutComponent } from './containers/client/layout/master-layout.component';
import { ProfileComponent } from './containers/client/profile/profile.component';
import { AuthGuardService } from './containers/client/auth/auth-guard.service';
import { ArticleExtComponent } from './containers/client/article-ext/article-ext.component';
import { SearchComponent } from './containers/client/search/search.component';


const routes: Routes = [
  {
    path: "admin",
    loadChildren: () => import('./containers/admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: "",
    component: MasterLayoutComponent,
    children: [
      {
        path: "profile",
        canActivate: [AuthGuardService],
        component: ProfileComponent
      },
      {
        path: "dang-nhap",
        component: LoginComponent
      },
      {
        path: "dang-ky-tai-khoan",
        component: SignUpComponent
      },
      {
        path: "dang-xuat",
        component: LogoutComponent
      },
      {
        path: "quen-mat-khau",
        component: ForgotPasswordComponent
      },
      {
        path: "gio-hang",
        canActivate: [AuthGuardService],
        component: CartComponent
      },
      {
        path: "dat-hang-thanh-cong",
        canActivate: [AuthGuardService],
        component: OrderSuccessfulComponent
      },
      {
        path: "danh-muc-bai-viet/:alias",
        component: ArticleCategoryComponent
      },
      {
        path: "bai-viet/:alias",
        component: ArticleComponent
      },
      {
        path: "thong-tin/:alias",
        component: ArticleExtComponent
      },
      {
        path: "san-pham/:alias",
        component: ProductDetailComponent
      },
      {
        path: "tim-kiem/:alias",
        component: SearchComponent
      },
      {
        path: ":alias",
        component: CategoryComponent
      },
      {
        path: "",
        component: HomeComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
