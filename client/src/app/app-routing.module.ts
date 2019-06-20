import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthGuard } from "./services/auth.guard";
import { CategoryComponent } from "./dashboard/catalog/category/category.component";
import { ProductComponent } from "./dashboard/catalog/product/product.component";
import { SupplierComponent } from "./dashboard/catalog/supplier/supplier.component";
import { UserComponent } from "./dashboard/users/user/user.component";
import { SaleComponent } from "./dashboard/sales/sale/sale.component";
import { ListSaleComponent } from "./dashboard/sales/list-sale/list-sale.component";
import { SemesterComponent } from "./dashboard/services/semester/semester.component";
import { AporteComponent } from "./dashboard/services/aporte/aporte.component";
import { StudentComponent } from "./dashboard/services/student/student.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        canActivateChild: [AuthGuard],
        children: [
          { path: "category", component: CategoryComponent },
          { path: "product", component: ProductComponent },
          { path: "supplier", component: SupplierComponent },
          { path: "users", component: UserComponent },
          { path: "sale", component: SaleComponent },
          { path: "sales", component: ListSaleComponent },
          { path: "semester", component: SemesterComponent },
          { path: "aporte", component: AporteComponent },
          { path: "student", component: StudentComponent }
        ]
      }
    ]
  },
  { path: "**", redirectTo: "/login", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
