import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './orders/order/order.component';
import { UserComponent } from './orders/user/user.component';
import { AuthComponent } from './security/auth/auth.component';
import { RoleGuard } from './role-guard.guard';
import { SupervisorMenuComponent } from './orders/supervisor-menu/supervisor-menu.component';
import { StockComponent } from './orders/stock/stock.component';
import { AdminMenuComponent } from './orders/admin-menu/admin-menu.component';


const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'users', component:UserComponent, canActivate: [RoleGuard], data: { requiredRole: 'Administrador' }},
  {path:'orders', component:OrdersComponent},
  {path:'login', component: AuthComponent},
  {path:'supervisor', component: SupervisorMenuComponent},
  {path:'admin', component: AdminMenuComponent},
  {path:'supervisor/stock', component: StockComponent},
  {path:'order', canActivate: [RoleGuard], data: { requiredRole: 'Usuario' }, children:[
    {path:'', component:OrderComponent},
    {path:'edit/:id', component:OrderComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
