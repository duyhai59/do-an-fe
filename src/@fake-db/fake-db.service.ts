import { InMemoryDbService } from 'angular-in-memory-web-api';

import { accountSettingsFakeData } from '@fake-db/account-settings.data';
// import { CardAnalyticsData } from '@fake-db/card-analytics.data';
// import { CardStatisticsData } from '@fake-db/card-statistics.data';
import { DashboardFakeData } from '@fake-db/dashboard.data';
import { DatatableFakeData } from '@fake-db/datatables';
// import { FAQFakeData } from '@fake-db/faq.data';
// import { KBFakeData } from '@fake-db/knowledge-base.data';
// import { NotificationsFakeData } from '@fake-db/notifications.data';
// import { PricingFakeData } from '@fake-db/pricing.data';
// import { ProfileFakeData } from '@fake-db/profile.data';
// import { SearchFakeData } from '@fake-db/search.data';
import { UsersFakeData } from '@fake-db/users.data';

export class FakeDbService implements InMemoryDbService {
  createDb(): any {
    return {
      // Data-table
      'datatable-rows': DatatableFakeData.rows,

      // Account Settings
      'account-settings-data': accountSettingsFakeData.data,

      // // Knowledge Base
      // 'knowledge-base-data': KBFakeData.data,

      // // Faq
      // 'faq-data': FAQFakeData.data,

      // // Pricing
      // 'pricing-data': PricingFakeData.data,

      // // Profile
      // 'profile-data': ProfileFakeData.data,

      // // Card Statistics
      // 'card-statistics-data': CardStatisticsData.data,

      // // Card Analytics
      // 'card-analytics-data': CardAnalyticsData.data,

      // Users
      'users-data': UsersFakeData.users,

      // // Search
      // 'search-data': SearchFakeData.search,

      // // Notifications
      // 'notifications-data': NotificationsFakeData.data,

      // Dashboard
      'dashboard-data': DashboardFakeData.data
    };
  }
}
