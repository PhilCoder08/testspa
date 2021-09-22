import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

import { NgModule } from '@angular/core';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';


@NgModule({
  declarations: [AppComponent, HomeComponent, UnauthorizedComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'unauthorized', component: UnauthorizedComponent },
  ], { relativeLinkResolution: 'legacy' }),
  AuthModule.forRoot({
    config: {
      authority: 'https://login.microsoftonline.com/392924fc-17eb-4199-94fd-fbd9ee70077e/v2.0',
      authWellknownEndpointUrl: 'https://login.microsoftonline.com/392924fc-17eb-4199-94fd-fbd9ee70077e/v2.0/.well-known/openid-configuration',
      redirectUrl: window.location.origin,
      clientId: 'b40a4ddb-e143-4c3b-a48a-ae7a51cecfa8',
      scope: 'openid profile offline_access email api://f2777218-978d-4cd9-9b81-1a742e44bb04/access_as_user',
      responseType: 'code',
      silentRenew: true,
      useRefreshToken: true,
      ignoreNonceAfterRefresh: true,
      maxIdTokenIatOffsetAllowedInSeconds: 600,
      issValidationOff: false, // this needs to be true if using a common endpoint in Azure
      autoUserInfo: false,
      logLevel: LogLevel.Debug,
      customParamsAuthRequest: {
        prompt: 'select_account', // login, consent
      },
    },
  }),
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
