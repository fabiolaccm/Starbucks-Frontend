import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './security/auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { OrderComponent } from './orders/order/order.component';
import { OrderItemsComponent } from './orders/order-items/order-items.component';
import { ConfirmationDialogComponent } from './orders/confirmation-dialog/confirmation-dialog.component';
import { OrdersComponent } from './orders/orders/orders.component';
import { AdminComponent } from './menus/admin/admin.component';
import { SupervisorComponent } from './menus/supervisor/supervisor.component';
import { StockComponent } from './orders/stock/stock.component';
import { StockItemComponent } from './orders/stock-item/stock-item.component';
import { UserComponent } from './users/user/user.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    OrderComponent,
    OrderItemsComponent,
    ConfirmationDialogComponent,
    OrdersComponent,
    AdminComponent,
    SupervisorComponent,
    StockComponent,
    StockItemComponent,
    UserComponent,
    UserDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
