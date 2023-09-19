import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './security/auth/auth.component';
import { OrderComponent } from './orders/order/order.component';
import { OrdersComponent } from './orders/orders/orders.component';
import { SupervisorComponent } from './menus/supervisor/supervisor.component';
import { AdminComponent } from './menus/admin/admin.component';
import { StockComponent } from './orders/stock/stock.component';
import { UserComponent } from './users/user/user.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component: AuthComponent},
  {path:'orders', component: OrdersComponent},
  {path:'users', component: UserComponent},
  {path:'order', children:[
    {path:'', component:OrderComponent},
    {path:'edit/:id', component:OrderComponent}
  ]},
  {path:'supervisor', component: SupervisorComponent},
  {path:'supervisor/stock', component: StockComponent},
  {path:'admin', component: AdminComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
