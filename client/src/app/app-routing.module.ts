import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: "login", component: LoginComponent},
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
  { path: "**", redirectTo: "/login", pathMatch: "full" }
];

/*
const routes: Routes = [
  {
    {path: 'login'. component: LoginComponent},
    {path: 'dashboard', component:DashboardComponent,
    children:[

    ],
    }
    {path:'',redirectTo: '/login', pathMatch: 'full'},
    { path: '**', component: PageNotFoundComponent }
  }
];
 */

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
