import { AddNewsCategoriesComponent } from './main/news_categories/add/add-news-categories/add-news-categories.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TreeviewModule } from 'ngx-treeview';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FakeDbService } from '@fake-db/fake-db.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import 'hammerjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';
import { ContextMenuModule } from '@ctrl/ngx-rightclick';

import { CoreModule } from '@core/core.module';
import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule, CoreThemeCustomizerModule } from '@core/components';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from "@ng-select/ng-select";
import { NgApexchartsModule } from 'ng-apexcharts';
import { SelectModule } from 'ng2-select';

import { NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TreeTableModule } from 'primeng/treetable';
import { coreConfig } from 'app/app-config';
import { AuthGuard } from 'app/auth/helpers/auth.guards';
import { fakeBackendProvider } from 'app/auth/helpers'; // used to create fake backend
import { JwtInterceptor, ErrorInterceptor } from 'app/auth/helpers';
import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { HttpUtilService } from './shares/services/http-util.service';
import { TokenStorage } from './shares/services/token-storage.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AccountAddComponent } from './main/account/add/account-add/account-add.component';
import { AccountEditComponent } from './main/account/edit/account-edit/account-edit.component';
import { AccountListComponent } from './main/account/list/account-list/account-list.component';
import { ImageCropperModule } from './main/image-cropper/image-cropper.module';
import { SafeUrlPipe } from './shares/pipes/safe-url';
import { AuthPrivilegeListComponent } from './main/administration/auth-privilege/auth-privilege-list/auth-privilege-list.component';
import { AuthRoleListComponent } from './main/administration/auth-role/auth-role-list/auth-role-list.component';
import { AuthRoleAddComponent } from './main/administration/auth-role/auth-role-add/auth-role-add.component';
import { CoreWso2Module } from './auth/wso2/core.module';
import { AuthRoleDetailComponent } from './main/administration/auth-role/auth-role-detail/auth-role-detail.component';
import { ProfileComponent } from './main/pages/profile/profile.component';
import { JwPaginationModule } from 'jw-angular-pagination';
import { AddNewsComponent } from './main/news/add-news/add-news.component';
import { DemoNgZorroAntdModule } from 'app/module-ant.module';
import { HotnewsConfigComponent } from './main/news/hotnews-config/hotnews-config.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { CKEditorModule } from 'ngx-ckeditor';
import { DocOfficalDispatchComponent } from './main/doc-offical-dispatch/list-doc-offical-dispatch/doc-offical-dispatch.component';
import { MenuComponent } from './main/menu/menu.component';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { TagsConfigComponent } from './main/news/tags-config/tags-config.component';
import { UploadImgComponent } from './main/news/upload-img/upload-img.component';
import { ImageListComponent } from './main/news/image-list/image-list.component';
import { NbCardModule, NbIconModule, NbThemeModule, NbTreeGridModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ButtonModule } from 'primeng/button';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { MenuAddComponent } from './main/menu/menu-add/menu-add.component';
import { AddDocOfficalDispatchComponent } from './main/doc-offical-dispatch/add-doc-offical-dispatch/add-doc-offical-dispatch.component';
import { ListNewsCategoriesComponent } from './main/news_categories/list/list-news-categories/list-news-categories.component';
import { EditDocOfficalDispatchComponent } from './main/doc-offical-dispatch/edit-doc-offical-dispatch/edit-doc-offical-dispatch.component';
import { RelatedNewsComponent } from './main/news/related-news/related-news.component';
import { RelatedDocumentComponent } from './main/news/related-document/related-document.component';
import { RelatedPromotionComponent } from './main/news/related-promotion/related-promotion.component';
import { RelatedNotificationComponent } from './main/news/related-notification/related-notification.component';
import { UploadDocOfficalDispatchComponent } from './main/doc-offical-dispatch/upload-doc-offical-dispatch/upload-doc-offical-dispatch.component';
import { CustomCardComponent } from './main/news/custom-card/custom-card.component';
registerLocaleData(en);

const appRoutes: Routes = [

  { path: 'auth-role-list', component: AuthRoleListComponent },
  { path: 'auth-role-add', component: AuthRoleAddComponent },
  { path: 'auth-role-detail', component: AuthRoleDetailComponent },
  { path: 'auth-privilege-list', component: AuthPrivilegeListComponent },

  {
    path: 'dashboard',
    loadChildren: () => import('./main/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'apps',
    loadChildren: () => import('./main/apps/apps.module').then(m => m.AppsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'pages',
    loadChildren: () => import('./main/pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: 'ui',
    loadChildren: () => import('./main/ui/ui.module').then(m => m.UIModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'forms',
    loadChildren: () => import('./main/forms/forms.module').then(m => m.FormsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'tables',
    loadChildren: () => import('./main/tables/tables.module').then(m => m.TablesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'charts-and-maps',
    loadChildren: () => import('./main/charts-and-maps/charts-and-maps.module').then(m => m.ChartsAndMapsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'components',
    loadChildren: () => import('./main/components/components.module').then(m => m.ComponentsModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/dashboard/analytics',
    pathMatch: 'full'
  },
  {
    path: 'configuration/account',
    component: AccountListComponent
  },
  {
    path: 'configuration/account-add',
    component: AccountAddComponent
  },
  {
    path: 'configuration/account-edit',
    component: AccountEditComponent
  },
  {
    path: 'menu-management',
    component: MenuComponent
  },
  {
    path: 'pages/profile', component: ProfileComponent
  },
  {
    path: 'add-news',
    component: AddNewsComponent
  },
  {
    path: 'doc', component: DocOfficalDispatchComponent
  },
  {
    path: 'add-doc', component: AddDocOfficalDispatchComponent
  },
  {
    path: 'news-categories',
    component: ListNewsCategoriesComponent
  },
  {
    path: 'edit-doc', component: EditDocOfficalDispatchComponent
  },
  {
    path: 'upload-doc', component: UploadDocOfficalDispatchComponent
  },
];

@NgModule({
  declarations: [
    SafeUrlPipe,
    AppComponent,
    AccountAddComponent,
    AccountEditComponent,
    AccountListComponent,
    AuthPrivilegeListComponent,
    AuthRoleListComponent,
    AuthRoleAddComponent,
    AuthRoleDetailComponent,
    AddNewsComponent,
    HotnewsConfigComponent,
    TagsConfigComponent,
    UploadImgComponent,
    ImageListComponent,
    DocOfficalDispatchComponent,
    MenuComponent,
    MenuAddComponent,
    AddDocOfficalDispatchComponent,
    ListNewsCategoriesComponent,
    AddNewsCategoriesComponent,
    EditDocOfficalDispatchComponent,
    UploadDocOfficalDispatchComponent,
    RelatedNewsComponent,
    RelatedDocumentComponent,
    RelatedPromotionComponent,
    RelatedNotificationComponent,
    UploadDocOfficalDispatchComponent,
    CustomCardComponent
  ],
  imports: [
    TreeviewModule.forRoot(),
    CoreWso2Module.forRoot(),
    NgbDatepickerModule, NgbTimepickerModule,
    ImageCropperModule,
    NbTreeGridModule,
    NbEvaIconsModule,
    NbThemeModule.forRoot(),
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    NbCardModule,
    TreeTableModule,
    JwPaginationModule,
    NbIconModule,
    DemoNgZorroAntdModule,
    NzDatePickerModule,
    HttpClientInMemoryWebApiModule.forRoot(FakeDbService, {
      delay: 0,
      passThruUnknownUrl: true
    }),
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'enabled', // Add options right here
      relativeLinkResolution: 'legacy'
    }),
    NgbModule,

    ToastrModule.forRoot(),
    TranslateModule.forRoot(),
    ContextMenuModule,
    CoreModule.forRoot(coreConfig),
    CoreCommonModule,
    CoreSidebarModule,
    CoreThemeCustomizerModule,
    CardSnippetModule,
    LayoutModule,
    ButtonModule,
    ContentHeaderModule,
    NgxDatatableModule,
    NgMultiSelectDropDownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgApexchartsModule,
    NgSelectModule,
    CKEditorModule,
    DemoNgZorroAntdModule,
    NzToolTipModule
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: NZ_I18N, useValue: en_US }, { provide: NZ_ICONS, useValue: icons },
    HttpUtilService,
    TokenStorage,
    { provide: NZ_I18N, useValue: en_US }, { provide: NZ_ICONS, useValue: icons },

    // ! IMPORTANT: Provider used to create fake backend, comment while using real API
    fakeBackendProvider,
  ],
  entryComponents: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }