import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthGuard } from "./services/auth.guard";
import { CategoryComponent } from "./dashboard/catalog/category/category.component";
import { ProductComponent } from "./dashboard/catalog/product/product.component";
import { SupplierComponent } from "./dashboard/catalog/supplier/supplier.component";
import { UserComponent } from "./dashboard/users/user/user.component";

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
          { path: "users", component: UserComponent }
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
