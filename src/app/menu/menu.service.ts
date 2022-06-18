import { Injectable } from '@angular/core';
import { HttpUtilService } from '../shares/services/http-util.service';
import { CoreMenu } from "@core/types";

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(
    private httpUtilService: HttpUtilService,
  ) { }

  private readonly API_URL = this.httpUtilService.api.auth;
  public backEndError = 'Có lỗi xảy ra, vui lòng thử lại sau!'

  // menu: CoreMenu[] = [
  //   // Dashboard
  //   {
  //     id: "dashboard",
  //     title: "Dashboard",
  //     translate: "Dashboard",
  //     type: "collapsible",
  //     // role: ['Admin'], //? To hide collapsible based on user role
  //     icon: "home",
  //     badge: {
  //       title: "2",
  //       translate: "MENU.DASHBOARD.BADGE",
  //       classes: "badge-light-warning badge-pill",
  //     },
  //     children: [
  //       {
  //         id: "analytics",
  //         title: "Analytics",
  //         translate: "Analytics",
  //         type: "item",
  //         icon: "circle",
  //         url: "dashboard/analytics",
  //       },
  //     ],
  //   },

  //   {
  //     id: "Management Report",
  //     title: "Management Report",
  //     translate: "Management Report",
  //     type: "collapsible",
  //     icon: "file-text",
  //     children: [
  //       {
  //         id: "Budget",
  //         title: "Budget",
  //         translate: "Budget",
  //         type: "item",
  //         icon: "home",
  //         url: "/budget-report",
  //       },
  //       {
  //         id: "Forecast",
  //         title: "Forecast",
  //         translate: "Forecast",
  //         type: "item",
  //         icon: "home",
  //         url: "/forecast-report",
  //       },
  //       {
  //         id: "Actual",
  //         title: "Actual",
  //         translate: "Actual",
  //         type: "item",
  //         icon: "home",
  //         url: "/actual-report",
  //       },
  //       {
  //         id: "Region Report",
  //         title: "Region Report",
  //         translate: "Region Report",
  //         type: "item",
  //         icon: "home",
  //         url: "/region-eport",
  //       },
  //     ]
  //   },
  //   {
  //     id: "kpi-report",
  //     title: "KPIs Reports",
  //     translate: "KPIs Reports",
  //     type: "collapsible",
  //     icon: "file-text",
  //     children: [
  //       {
  //         id: "country-kpi",
  //         title: "Country",
  //         translate: "Country",
  //         type: "item",
  //         icon: "home",
  //         url: "/country-kpi",
  //       },
  //       {
  //         id: "region-kpi",
  //         title: "Region",
  //         translate: "Region",
  //         type: "item",
  //         icon: "home",
  //         url: "/region-kpi",
  //       },
  //     ]
  //   },
  //   // Others
  //   {
  //     id: "resource",
  //     type: "section",
  //     title: "Resource vs Growth",
  //     translate: "Resource vs Growth",
  //     icon: "bar-chart-2",
  //     children: [
  //     ]
  //   },
  //   {
  //     id: "exchange",
  //     title: "Currency & Exchange rate",
  //     translate: "Currency & Exchange rate",
  //     type: "collapsible",
  //     icon: "bar-chart",
  //     badge: {
  //       title: "2",
  //       translate: "MENU.DASHBOARD.BADGE",
  //       classes: "badge-light-warning badge-pill",
  //     },
  //     children: [
  //       {
  //         id: "currency",
  //         title: "Currency",
  //         translate: "Currency",
  //         type: "item",
  //         icon: "home",
  //         url: "/currency-list",
  //       },

  //       {
  //         id: "exchange-rate",
  //         title: "Exchange-Rate",
  //         translate: "Exchange-Rate",
  //         type: "item",
  //         icon: "home",
  //         url: "/exchange-rate-list",
  //       },
  //     ]
  //   },
  //   {
  //     id: "admin",
  //     type: "section",
  //     title: "Administration",
  //     translate: "Administration",
  //     icon: "key",
  //     children: [
  //       {
  //         id: "user",
  //         title: "User management",
  //         translate: "User management",
  //         type: "collapsible",
  //         icon: "file-text",
  //       },
  //       {
  //         id: "role",
  //         title: "Role management",
  //         translate: "Role management",
  //         type: "collapsible",
  //         icon: "file-text",
  //       },
  //       {
  //         id: "config",
  //         title: "Configuration system",
  //         translate: "Configuration system",
  //         type: "item",
  //         icon: "file-text",
  //         url: "config-system-list",
  //       },
  //       {
  //         id: "catalogy",
  //         title: "Catalogy system",
  //         translate: "Catalogy system",
  //         type: "collapsible",
  //         icon: "file-text",
  //         children: [
  //           {
  //             id: "country",
  //             title: "Country",
  //             translate: "Country",
  //             type: "item",
  //             icon: "home",
  //             url: "/country-list",
  //           },
  //           {
  //             id: "countryGroup",
  //             title: "Country group",
  //             translate: "Country group",
  //             type: "item",
  //             icon: "home",
  //             url: "/country-group-list",
  //           },
  //           {
  //             id: "region",
  //             title: "Region",
  //             translate: "Region",
  //             type: "item",
  //             icon: "home",
  //             url: "/region-list",
  //           },
  //         ]
  //       },
  //       {
  //         id: "syslog",
  //         title: "System logs",
  //         translate: "System logs",
  //         type: "collapsible",
  //         icon: "file-text",
  //       },

  //     ],
  //   },
  // ]

  menuTest: CoreMenu[] = [
  ];

  // Function return List<MenuDTO>
  async getListMenuPublished(roleId: number) {
    return this.httpUtilService.callAPI(
      this.API_URL + '/webapi/menu/get-menu?roleId=' + roleId, { method: 'GET' }).toPromise()
  }

  async getListMenuPublished1(loginId: any) {
    return this.httpUtilService.callAPI(
      this.API_URL + '/webapi/menu/get-menu1?loginId=' + loginId, { method: 'GET' }).toPromise()
  }

  // Function return List<Menu>
  async getAllMenuPublished() {
    return this.httpUtilService.callAPI(
      this.API_URL + '/webapi/menu/get-all-menu', { method: 'GET' }).toPromise()
  }

}
