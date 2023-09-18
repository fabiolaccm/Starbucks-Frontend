import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './orders/order/order.component';
import { OrderItemsComponent } from './orders/order-items/order-items.component';
import { OrderService } from './shared/order.service';
import { ToastrModule } from 'ngx-toastr';
import { RolesComponent } from './orders/roles/roles.component';
import { UserComponent } from './orders/user/user.component';
import { UserDetailComponent } from './orders/user-detail/user-detail.component';
import { AuthComponent } from './security/auth/auth.component';
import { JwtInterceptor } from './interceptors/jwt-interceptor';
import { SupervisorMenuComponent } from './orders/supervisor-menu/supervisor-menu.component';
import { StockComponent } from './orders/stock/stock.component';
import { StockItemComponent } from './orders/stock-item/stock-item.component';
import { AdminMenuComponent } from './orders/admin-menu/admin-menu.component';
import { ConfirmationDialogComponent } from './orders/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    OrderComponent,
    OrderItemsComponent,
    RolesComponent,
    UserComponent,
    UserDetailComponent,
    AuthComponent,
    SupervisorMenuComponent,
    StockComponent,
    StockItemComponent,
    AdminMenuComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  entryComponents:[OrderItemsComponent, UserDetailComponent, StockItemComponent, ConfirmationDialogComponent],
  providers: [
    OrderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
