import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
<<<<<<< HEAD
import { HttpClientModule } from '@angular/common/http';
=======
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
>>>>>>> 44e8b65064764c6a6a1c71d36a84e48cd8c60fcd

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

@NgModule({
  declarations: [AppComponent],
<<<<<<< HEAD
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
=======
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
>>>>>>> 44e8b65064764c6a6a1c71d36a84e48cd8c60fcd
  bootstrap: [AppComponent],
})
export class AppModule {}
