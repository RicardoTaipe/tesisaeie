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
import { UserComponent } from './dashboard/users/user/user.component';
import { SaleComponent } from './dashboard/sales/sale/sale.component';
import { ListSaleComponent } from './dashboard/sales/list-sale/list-sale.component';
import { SemesterComponent } from './dashboard/services/semester/semester.component';
import { AporteComponent } from './dashboard/services/aporte/aporte.component';
import { StudentComponent } from './dashboard/services/student/student.component';
import { SearchStudentComponent } from './dashboard/services/search-student/search-student.component';
import { LockerComponent } from './dashboard/services/locker/locker.component';
import { AlquilarComponent } from './dashboard/services/alquilar/alquilar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CategoryComponent,
    ProductComponent,
    SupplierComponent,
    UserComponent,
    SaleComponent,
    ListSaleComponent,
    SemesterComponent,
    AporteComponent,
    StudentComponent,
    SearchStudentComponent,
    LockerComponent,
    AlquilarComponent
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
  bootstrap: [AppComponent],
  entryComponents:[SearchStudentComponent]
})
export class AppModule {}
