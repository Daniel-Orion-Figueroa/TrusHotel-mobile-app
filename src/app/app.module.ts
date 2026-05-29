import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
<<<<<<< HEAD
import { HttpClientModule } from '@angular/common/http';
=======
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
<<<<<<< HEAD
>>>>>>> 44e8b65064764c6a6a1c71d36a84e48cd8c60fcd
=======
>>>>>>> 481124ae13b2f8a22152d2caef26f10e9fc17528
>>>>>>> 506e5932c7f1d087a62514d54b1ab6d0f6488a00

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
<<<<<<< HEAD
>>>>>>> 44e8b65064764c6a6a1c71d36a84e48cd8c60fcd
=======
>>>>>>> 481124ae13b2f8a22152d2caef26f10e9fc17528
>>>>>>> 506e5932c7f1d087a62514d54b1ab6d0f6488a00
  bootstrap: [AppComponent],
})
export class AppModule {}
