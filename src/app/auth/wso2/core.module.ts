import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { AuthConfig, OAuthModule, OAuthModuleConfig, OAuthStorage, ValidationHandler } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';

import { AuthGuardWithForcedLogin } from './auth-guard-with-forced-login.service';
import { AuthGuard } from './auth-guard.service';
import { authModuleConfigFactory } from './auth-module-config-factory';
import { AuthService } from './auth.service';
import { ConfigService } from './config.service';

// We need a factory since localStorage is not available at AOT build time
export function storageFactory() : OAuthStorage {
  return localStorage
}

export function authConfigFactory(configService: ConfigService): AuthConfig {
  return configService.authConfig;
}

@NgModule({
  imports: [
    HttpClientModule,
    OAuthModule.forRoot(),
  ],
  providers: [
    AuthService,
    AuthGuard,
    AuthGuardWithForcedLogin,
  ],
})
export class CoreWso2Module {
  static forRoot(): ModuleWithProviders<CoreWso2Module> {
    return {
      ngModule: CoreWso2Module,
      providers: [
        { provide: AuthConfig, useFactory: authConfigFactory, deps: [ConfigService] },
        { provide: OAuthModuleConfig, useFactory: authModuleConfigFactory, deps: [ConfigService] },
        { provide: ValidationHandler, useClass: JwksValidationHandler },
        { provide: OAuthStorage, useFactory: storageFactory },
      ]
    };
  }

  constructor (@Optional() @SkipSelf() parentModule: CoreWso2Module) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
