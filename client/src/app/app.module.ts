import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material/material.module";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
//Components
import { LoginComponent } from "./login/login.component";
import { AuthService } from "./services/auth.service";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthGuard } from "./services/auth.guard";
import { TokenInterceptorService } from "./services/token-interceptor.service";
import { CategoryComponent } from "./dashboard/catalog/category/category.component";
import { ProductComponent } from "./dashboard/catalog/product/product.component";
import { SupplierComponent } from "./dashboard/catalog/supplier/supplier.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CategoryComponent,
    ProductComponent,
    SupplierComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
