import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { HomeComponent } from './containers/client/home/home.component';
import { CategoryComponent } from './containers/client/category/category.component';
import { ProductDetailComponent } from './containers/client/product-detail/product-detail.component';
import { SearchComponent } from './containers/client/search/search.component';
import { CartComponent } from './containers/client/cart/cart.component';
import { ArticleComponent } from './containers/client/article/article.component';
import { OrderSuccessfulComponent } from './containers/client/order-successful/order-successful.component';
import { PageNotFoundComponent } from './containers/client/page-not-found/page-not-found.component';
import { LoginComponent } from './containers/client/login/login.component';
import { LogoutComponent } from './containers/client/logout/logout.component';
import { ProfileComponent } from './containers/client/profile/profile.component';
import { ForgotPasswordComponent } from './containers/client/forgot-password/forgot-password.component';
import { SignUpComponent } from './containers/client/sign-up/sign-up.component';
import { MasterLayoutComponent } from './containers/client/layout/master-layout.component';
import { ProductTemplateComponent } from './components/product-template/product-template.component';
import { ArticleTemplateComponent } from './components/article-template/article-template.component';
import { ArticleCategoryComponent } from './containers/client/article-category/article-category.component';
import { ArticleTemplateHorizontalComponent } from './components/article-template-horizontal/article-template-horizontal.component';
import { DENgZorroAntdModule } from './ng-zorro-antd.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HostImageClientPipe } from './core/pipe/host-image-client.pipe';
import { OrderTemplateComponent } from './components/order-template/order-template.component';
import { AuthGuardService } from './containers/client/auth/auth-guard.service';
import { ErrorInterceptor } from './containers/client/auth/error.interceptor';
import { JwtInterceptor } from './containers/client/auth/jwt.interceptor';
import { ArticleExtComponent } from './containers/client/article-ext/article-ext.component';
import { SafePipe } from './core/pipe/safe.pipe';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoryComponent,
    ProductDetailComponent,
    SearchComponent,
    CartComponent,
    ArticleComponent,
    OrderSuccessfulComponent,
    PageNotFoundComponent,
    LoginComponent,
    LogoutComponent,
    ProfileComponent,
    ForgotPasswordComponent,
    SignUpComponent,
    MasterLayoutComponent,
    ProductTemplateComponent,
    ArticleTemplateComponent,
    ArticleCategoryComponent,
    ArticleTemplateHorizontalComponent,
    HostImageClientPipe,
    OrderTemplateComponent,
    ArticleExtComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DENgZorroAntdModule,
    IvyCarouselModule,
    SlickCarouselModule
  ],
  providers: [
    AuthGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
