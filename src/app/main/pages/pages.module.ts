import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { AuthenticationModule } from './authentication/authentication.module';
import { ProfileComponent } from './profile/profile.component';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { Routes } from '@angular/router';

const routes: Routes = [
  
];

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    CoreCommonModule,
    ContentHeaderModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    AuthenticationModule,
    Ng2FlatpickrModule,
    CardSnippetModule,
  ],

  providers: []
})
export class PagesModule {}
