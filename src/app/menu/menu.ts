import { CoreMenu } from "@core/types";

//? DOC: http://localhost:7777/demo/vuexy-angular-admin-dashboard-template/documentation/guide/development/navigation-menus.html#interface

export const menu: CoreMenu[] = [

  // {
  //   id: 'forms-table',
  //   type: 'section',
  //   title: 'Forms & Tables',
  //   translate: 'MENU.FT.SECTION',
  //   icon: 'file-text',
  //   children: [
  //     {
  //       id: 'form-elements',
  //       title: 'Form Elements',
  //       translate: 'MENU.FT.ELEMENT.COLLAPSIBLE',
  //       type: 'collapsible',
  //       icon: 'copy',
  //       children: [
  //         {
  //           id: 'form-elements-input',
  //           title: 'Input',
  //           translate: 'MENU.FT.ELEMENT.INPUT',
  //           type: 'item',
  //           icon: 'circle',
  //           url: 'forms/form-elements/input'
  //         },
  //         {
  //           id: 'form-elements-inputgroups',
  //           title: 'Input Groups',
  //           translate: 'MENU.FT.ELEMENT.INPUTGROUPS',
  //           type: 'item',
  //           icon: 'circle',
  //           url: 'forms/form-elements/input-groups'
  //         },
  //         {
  //           id: 'form-elements-inputmask',
  //           title: 'Input Mask',
  //           translate: 'MENU.FT.ELEMENT.INPUTMASK',
  //           type: 'item',
  //           icon: 'circle',
  //           url: 'forms/form-elements/input-mask'
  //         },
  //         {
  //           id: 'form-elements-textarea',
  //           title: 'Textarea',
  //           translate: 'MENU.FT.ELEMENT.TEXTAREA',
  //           type: 'item',
  //           icon: 'circle',
  //           url: 'forms/form-elements/textarea'
  //         },
  //         {
  //           id: 'form-elements-checkbox',
  //           title: 'Checkbox',
  //           translate: 'MENU.FT.ELEMENT.CHECKBOX',
  //           type: 'item',
  //           icon: 'circle',
  //           url: 'forms/form-elements/checkbox'
  //         },
  //         {
  //           id: 'form-elements-radio',
  //           title: 'Radio',
  //           translate: 'MENU.FT.ELEMENT.RADIO',
  //           type: 'item',
  //           icon: 'circle',
  //           url: 'forms/form-elements/radio'
  //         },
  //         {
  //           id: 'form-elements-switch',
  //           title: 'Switch',
  //           translate: 'MENU.FT.ELEMENT.SWITCH',
  //           type: 'item',
  //           icon: 'circle',
  //           url: 'forms/form-elements/switch'
  //         },
  //         {
  //           id: 'form-elements-select',
  //           title: 'Select',
  //           translate: 'MENU.FT.ELEMENT.SELECT',
  //           type: 'item',
  //           icon: 'circle',
  //           url: 'forms/form-elements/select'
  //         },
  //         {
  //           id: 'form-elements-numberInput',
  //           title: 'Number Input',
  //           translate: 'MENU.FT.ELEMENT.NUMBERINPUT',
  //           type: 'item',
  //           icon: 'circle',
  //           url: 'forms/form-elements/number-input'
  //         },
  //         {
  //           id: 'form-elements-file-uploader',
  //           title: 'File Uploader',
  //           translate: 'MENU.FT.ELEMENT.FILEUPLOADER',
  //           icon: 'circle',
  //           type: 'item',
  //           url: 'forms/form-elements/file-uploader'
  //         },
  //         {
  //           id: 'form-elements-quill-editor',
  //           title: 'Quill Editor',
  //           translate: 'MENU.FT.ELEMENT.QUILLEDITOR',
  //           icon: 'circle',
  //           type: 'item',
  //           url: 'forms/form-elements/quill-editor'
  //         },
  //         {
  //           id: 'form-elements-flatpicker',
  //           title: 'Flatpicker',
  //           translate: 'MENU.FT.ELEMENT.FLATPICKER',
  //           type: 'item',
  //           icon: 'circle',
  //           url: 'forms/form-elements/flatpickr'
  //         },
  //         {
  //           id: 'form-elements-date-time-icker',
  //           title: 'Date & Time Picker',
  //           translate: 'MENU.FT.ELEMENT.DATETIMEPICKER',
  //           type: 'item',
  //           icon: 'circle',
  //           url: 'forms/form-elements/date-time-picker'
  //         }
  //       ]
  //     },
  //     {
  //       id: 'form-layouts',
  //       title: 'Form Layouts',
  //       translate: 'MENU.FT.LAYOUTS',
  //       type: 'item',
  //       icon: 'box',
  //       url: 'forms/form-layout'
  //     },
  //     {
  //       id: 'form-wizard',
  //       title: 'Form Wizard',
  //       translate: 'MENU.FT.WIZARD',
  //       type: 'item',
  //       icon: 'package',
  //       url: 'forms/form-wizard'
  //     },
  //     {
  //       id: 'form-validation',
  //       title: 'Form Validations',
  //       translate: 'MENU.FT.VALIDATION',
  //       type: 'item',
  //       icon: 'check-circle',
  //       url: 'forms/form-validation'
  //     },
  //     {
  //       id: 'form-repeater',
  //       title: 'Form Repeater',
  //       translate: 'MENU.FT.REPEATER',
  //       type: 'item',
  //       icon: 'rotate-cw',
  //       url: 'forms/form-repeater'
  //     },
  //     {
  //       id: 'tables-table',
  //       title: 'Table',
  //       translate: 'MENU.FT.TABLE',
  //       type: 'item',
  //       icon: 'server',
  //       url: 'tables/table'
  //     },
  //     {
  //       id: 'tables-datatable',
  //       title: 'DataTables',
  //       translate: 'MENU.FT.DATATABLES',
  //       type: 'item',
  //       icon: 'grid',
  //       url: 'tables/datatables'
  //     }
  //   ]
  // },

  // {
  //   id: 'customer-info',
  //   type: 'section',
  //   title: 'Tra cứu Thông tin Khách hàng',
  //   translate: 'Tra cứu Thông tin Khách hàng',
  //   icon: 'bar-chart-2',
  //   children: [
  //     {
  //       id: 'customer-service-history',
  //       title: 'Tra cứu thông tin thuê bao',
  //       translate: 'Tra cứu thông tin thuê bao',
  //       icon: 'map',
  //       type: 'item',
  //       url: 'customer-info-subcribe'
  //     },
  //     {
  //       id: 'customer-service-history',
  //       title: 'Tra cứu lịch sử sử dụng dịch vụ số',
  //       translate: 'Tra cứu lịch sử sử dụng dịch vụ số',
  //       icon: 'map',
  //       type: 'item',
  //       url: 'customer-service-history'
  //     }

  //   ]

  // // Tích hợp dịch vụ số
  // {
  //   id: 'integration-service',
  //   type: 'section',
  //   title: 'Tích hợp dịch vụ số',
  //   translate: 'Tích hợp dịch vụ số',
  //   icon: 'settings',
  //   children: [
  //     {
  //       id: 'list-integration-service',
  //       title: 'Danh sách dịch vụ số tích hợp',
  //       translate: 'Danh sách dịch vụ số tích hợp',
  //       icon: 'briefcase',
  //       type: 'item',
  //       url: 'integration-service/user-list-integration-service'
  //     },
  //     {
  //       id: 'list-integration-service',
  //       title: 'Cấu hình dịch vụ số tích hợp',
  //       translate: 'Cấu hình dịch vụ số tích hợp',
  //       icon: 'settings',
  //       type: 'item',
  //       url: 'integration-service/list-integration-service'
  //     }
  //   ]
  // },

  // //Module thi truc tuyen
  // {
  //   id: 'test-online',
  //   type: 'section',
  //   title: 'Module thi trực tuyến',
  //   translate: 'Module thi trực tuyến',
  //   icon: 'bar-chart-2',
  //   children: [
  //     {
  //       id: 'question-category',
  //       title: 'Quản lý chuyên mục câu hỏi',
  //       translate: 'Quản lý chuyên mục câu hỏi',
  //       icon: 'layers',
  //       type: 'item',
  //       url: 'question-category-list'
  //     },
  //     {
  //       id: 'question-bank',
  //       title: 'Ngân hàng câu hỏi',
  //       translate: 'Ngân hàng câu hỏi',
  //       icon: 'layers',
  //       type: 'item',
  //       url: 'question-bank-list'
  //     },
  //     {
  //       id: 'question-exam',
  //       title: 'Quản lý đề thi',
  //       translate: 'Quản lý đề thi',
  //       icon: 'layers',
  //       type: 'item',
  //       url: 'question-exam-list'
  //     },
  //     {
  //       id: 'list-student',
  //       title: 'Quản lý học viên',
  //       translate: 'Quản lý học viên',
  //       icon: 'layers',
  //       type: 'item',
  //       url: 'list-student'
  //     }
  //   ]
  // },

  // },
  // {
  //   id: 'feedback',
  //   type: 'section',
  //   title: 'Feedback',
  //   translate: 'Feedback',
  //   icon: 'bar-chart-2',
  //   children: [
  //     {
  //       id: 'feedback-input',
  //       title: 'Nhập feedback',
  //       translate: 'Nhập feedback',
  //       icon: 'map',
  //       type: 'item',
  //       url: 'feedback/feedback-input'
  //     },
  //     {
  //       id: 'feedback-process',
  //       title: 'Feedback cần xử lý',
  //       translate: 'Feedback cần xử lý',
  //       icon: 'map',
  //       type: 'item',
  //       url: 'feedback-process'
  //     },
  //     {
  //       id: 'feedback-look-up',
  //       title: 'Tra cứu Feedback',
  //       translate: 'Tra cứu Feedback',
  //       icon: 'map',
  //       type: 'item',
  //       url: 'feedback-look-up'
  //     },
  //     {
  //       id: 'call-out-staff-list',
  //       title: 'Quản lý thông tin nhân viên gọi ra',
  //       translate: 'Quản lý thông tin nhân viên gọi ra',
  //       icon: 'map',
  //       type: 'item',
  //       url: 'call-out-staff-list'
  //     }
  //   ]
  // },

  // // Danh mục FB 
  // {
  //   id: 'list-category',
  //   type: 'section',
  //   title: 'Danh mục FeedBack',
  //   translate: 'Danh mục FeedBack',
  //   icon: 'bar-chart-2',
  //   children: [
  //     {
  //       id: 'group-fb-category',
  //       title: 'Danh mục nhóm phản ánh',
  //       translate: 'Danh mục nhóm phản ánh',
  //       icon: 'briefcase',
  //       type: 'item',
  //       url: 'list-category/group-fb-category'
  //     },
  //     {
  //       id: 'type-of-feedback',
  //       title: 'Danh mục loại phản ánh',
  //       translate: 'Danh mục loại phản ánh',
  //       icon: 'credit-card',
  //       type: 'item',
  //       url: 'list-category/type-of-feedback'
  //     },
  //     {
  //       id: 'template-for-type-of-fb',
  //       title: 'Danh mục template cho loại phản ánh',
  //       translate: 'Danh mục template cho loại phản ánh',
  //       icon: 'columns',
  //       type: 'item',
  //       url: 'list-category/template-for-type-of-fb'
  //     },
  //     {
  //       id: 'warning-category',
  //       title: 'Danh mục cảnh báo phản ánh',
  //       translate: 'Danh mục cảnh báo phản ánh',
  //       icon: 'columns',
  //       type: 'item',
  //       url: 'warning-category'
  //     },
  //     {
  //       id: 'http-cross',
  //       title: 'Danh mục hình thức phân phối chéo',
  //       translate: 'Danh mục hình thức phân phối chéo',
  //       icon: 'columns',
  //       type: 'item',
  //       url: 'http-cross'
  //     },
  //     {
  //       id: 'call-out-list',
  //       title: 'Danh mục hỗ trợ công tác gọi ra',
  //       translate: 'Danh mục hỗ trợ công tác gọi ra',
  //       icon: 'columns',
  //       type: 'item',
  //       url: 'call-out-list'
  //     },
  //     {
  //       id: 'red-alert',
  //       title: 'Báo đỏ',
  //       translate: 'Báo đỏ',
  //       icon: 'columns',
  //       type: 'item',
  //       url: 'red-alert'
  //     },
  //     {
  //       id: 'sms-reflect',
  //       title: 'Danh mục tin nhắn cho nhóm phản ánh',
  //       translate: 'Danh mục tin nhắn cho nhóm phản ánh',
  //       icon: 'columns',
  //       type: 'item',
  //       url: 'sms-reflect-list'
  //     },
  //     {
  //       id: 'default-sms',
  //       title: 'Danh mục tin nhắn mặc định',
  //       translate: 'Danh mục tin nhắn mặc định',
  //       icon: 'columns',
  //       type: 'item',
  //       url: 'default-sms-list'
  //     },
  //     {
  //       id: 'feebback-status',
  //       title: 'Danh mục trạng thái feedback',
  //       translate: 'Danh mục trạng thái feedback',
  //       icon: 'columns',
  //       type: 'item',
  //       url: 'fb-status-list'
  //     }
  //   ]
  // },
  // // Cấu hình đồng bộ dữ liệu từ hệ thống FBTT 
  // {
  //   id: 'configuration',
  //   type: 'section',
  //   title: 'Cấu hình',
  //   translate: 'Cấu hình',
  //   icon: 'bar-chart-2',
  //   children: [
  //     {
  //       id: 'sync-configuration',
  //       title: 'Cấu hình đồng bộ danh mục Feedback',
  //       translate: 'Cấu hình đồng bộ danh mục Feedback',
  //       icon: 'briefcase',
  //       type: 'item',
  //       url: 'configuration/sync-feedback-category'
  //     },
  //     {
  //       id: 'sync-feedback',
  //       title: 'Cấu hình Đồng bộ Feedback',
  //       translate: 'Cấu hình Đồng bộ Feedback',
  //       icon: 'briefcase',
  //       type: 'item',
  //       url: 'configuration/sync-feedback'
  //     }
  //   ]
  // },

  // //Module thi truc tuyen
  // {
  //   id: 'test-online',
  //   type: 'section',
  //   title: 'Module thi trực tuyến',
  //   translate: 'Module thi trực tuyến',
  //   icon: 'bar-chart-2',
  //   children: [
  //     {
  //       id: 'question-category',
  //       title: 'Quản lý chuyên mục câu hỏi',
  //       translate: 'Quản lý chuyên mục câu hỏi',
  //       icon: 'layers',
  //       type: 'item',
  //       url: 'question-category-list'
  //     },
  //     {
  //       id: 'question-bank',
  //       title: 'Ngân hàng câu hỏi',
  //       translate: 'Ngân hàng câu hỏi',
  //       icon: 'layers',
  //       type: 'item',
  //       url: 'question-bank-list'
  //     },
  //     {
  //       id: 'question-exam',
  //       title: 'Quản lý đề thi',
  //       translate: 'Quản lý đề thi',
  //       icon: 'layers',
  //       type: 'item',
  //       url: 'question-exam-list'
  //     },
  //     {
  //       id: 'list-student',
  //       title: 'Quản lý học viên',
  //       translate: 'Quản lý học viên',
  //       icon: 'layers',
  //       type: 'item',
  //       url: 'list-student'
  //     }
  //   ]
  // },


  // {
  //   id: 'report',
  //   type: 'section',
  //   title: 'Báo cáo',
  //   translate: 'Báo cáo',
  //   icon: 'bar-chart-2',
  //   children: [
  //     {
  //       id: 'feedback-report',
  //       title: 'Báo cáo Feedback ',
  //       translate: 'Báo cáo Feedback ',
  //       icon: 'layers',
  //       type: 'item',
  //       url: 'feedback-report'
  //     }
  //   ]
  // }
  // User Interface
  // {
  //   id: 'user-interface',
  //   type: 'section',
  //   title: 'User Interface',
  //   translate: 'MENU.UI.SECTION',
  //   icon: 'layers',
  //   children: [
  //     {
  //       id: 'typography',
  //       title: 'Typography',
  //       translate: 'MENU.UI.TYPOGRAPHY',
  //       type: 'item',
  //       icon: 'type',
  //       url: 'ui/content/typography'
  //     },
  //     {
  //       id: 'colors',
  //       title: 'Colors',
  //       translate: 'MENU.UI.COLORS',
  //       type: 'item',
  //       icon: 'droplet',
  //       url: 'ui/colors'
  //     },
  //     {
  //       id: 'feather',
  //       title: 'Feather',
  //       translate: 'MENU.UI.FEATHER',
  //       type: 'item',
  //       icon: 'eye',
  //       url: 'ui/icons/feather'
  //     },
  //     {
  //       id: 'cards',
  //       title: 'Cards',
  //       translate: 'MENU.UI.CARDS.COLLAPSIBLE',
  //       type: 'collapsible',
  //       icon: 'credit-card',
  //       badge: {
  //         title: 'New',
  //         translate: 'MENU.UI.CARDS.BADGE',
  //         classes: 'badge-light-success badge-pill'
  //       },
  //       children: [
  //         {
  //           id: 'card-basic',
  //           title: 'Basic',
  //           translate: 'MENU.UI.CARDS.BASIC',
  //           type: 'item',
  //           icon: 'circle',
  //           url: 'ui/card/card-basic'
  //         },
  //         {
  //           id: 'card-advance',
  //           title: 'Advance',
  //           translate: 'MENU.UI.CARDS.ADVANCE',
  //           type: 'item',
  //           icon: 'circle',
  //           url: 'ui/card/advance'
  //         },
  //         {
  //           id: 'card-statistics',
  //           title: 'Statistics',
  //           translate: 'MENU.UI.CARDS.STATISTICS',
  //           type: 'item',
  //           icon: 'circle',
  //           url: 'ui/card/statistics'
  //         },
  //         {
  //           id: 'Card-analytics',
  //           title: 'Analytics',
  //           translate: 'MENU.UI.CARDS.ANALYTICS',
  //           type: 'item',
  //           icon: 'circle',
  //           url: 'ui/card/analytics'
  //         },
  //         {
  //           id: 'card-actions',
  //           title: 'Actions',
  //           translate: 'MENU.UI.CARDS.ACTIONS',
  //           type: 'item',
  //           icon: 'circle',
  //           url: 'ui/card/actions'
  //         }
  //       ]
  //     },
  //     {
  //       id: 'components',
  //       title: 'Components',
  //       translate: 'MENU.UI.COMPONENTS.COLLAPSIBLE',
  //       type: 'collapsible',
  //       icon: 'archive',
  //       children: [
  //         {
  //           id: 'components-alerts',
  //           title: 'Alerts',
  //           translate: 'MENU.UI.COMPONENTS.ALERTS',
  //           type: 'item',
  //           icon: 'circle',
  //           url: 'components/alerts'
  //         },
  //         {
  //           id: 'components-avatar',
  //           title: 'Avatar',
  //           translate: 'MENU.UI.COMPONENTS.AVATAR',
  //           type: 'item',
  //           icon: 'circle',
  //           url: 'components/avatar'
  //         },
  //         {
  //           id: 'components-badges',
  //           title: 'Badges',
  //           translate: 'MENU.UI.COMPONENTS.BADGES',
  //           type: 'item',
  //           icon: 'circle',
  //           url: 'components/badges'
  //         },
  //         {
  //           id: 'components-breadcrumbs',
  //           title: 'Breadcrumbs',
  //           translate: 'MENU.UI.COMPONENTS.BREADCRUMBS',
  //           type: 'item',
  //           icon: 'circle',
  //           url: 'components/breadcrumbs'
  //         },
  //         {
  //           id: 'components-buttons',
  //           title: 'Buttons',
  //           translate: 'MENU.UI.COMPONENTS.BUTTONS',
  //           type: 'item',
  //           icon: 'circle',
  //           url: 'components/buttons'
  //         },
  //         {
  //           id: 'components-carousel',
  //           title: 'Carousel',
  //           translate: 'MENU.UI.COMPONENTS.CAROUSEL',
  //           type: 'item',
  //           icon: 'circle',
  //           url: 'components/carousel'
  //         },
  //         {
  //           id: 'components-collapse',
  //           title: 'Collapse',
  //           translate: 'MENU.UI.COMPONENTS.COLLAPSE',
  //           type: 'item',
  //           icon: 'circle',
  //           url: 'components/collapse'
  //         },
  //         {
  //           id: 'components-divider',
  //           title: 'Divider',
  //           translate: 'MENU.UI.COMPONENTS.DIVIDER',
  //           type: 'item',
  //           icon: 'circle',
  //           url: 'components/divider'
  //         },
  //         {
  //           id: 'components-drop-downs',
  //           title: 'Dropdowns',
  //           translate: 'MENU.UI.COMPONENTS.DROPDOWNS',
  //           type: 'item',
  //           icon: 'circle',
  //           url: 'components/dropdowns'
  //         },
  //         {
  //           id: 'components-list-group',
  //           title: 'List Group',
  //           translate: 'MENU.UI.COMPONENTS.GROUP',
  //           type: 'item',
  //           icon: 'circle',
  //           url: 'components/list-group'
  //         },
  //         {
  //           id: 'components-media-objects',
  //           title: 'Media Objects',
  //           translate: 'MENU.UI.COMPONENTS.OBJECTS',
  //           type: 'item',
  //           icon: 'circle',
  //           url: 'components/media-objects'
  //         },
  //         {
  //           id: 'components-modals',
  //           title: 'Modals',
  //           translate: 'MENU.UI.COMPONENTS.MODALS',
  //           type: 'item',
  //           icon: 'circle',
  //           url: 'components/modals'
  //         },
  //         {
  //           id: 'components-navs',
  //           title: 'Navs',
  //           translate: 'MENU.UI.COMPONENTS.COMPONENT',
  //           type: 'item',
  //           icon: 'circle',
  //           url: 'components/navs'
  //         },
  //         {
  //           id: 'components-pagination',
  //           title: 'Pagination',
  //           translate: 'MENU.UI.COMPONENTS.PAGINATION',
  //           type: 'item',
  //           icon: 'circle',
  //           url: 'components/pagination'
  //         },
  //         {
  //           id: 'components-pill-badges',
  //           title: 'Pill Badges',
  //           translate: 'MENU.UI.COMPONENTS.PBADGES',
  //           type: 'item',
  //           icon: 'circle',
  //           url: 'components/pill-badges'
  //         },
  //         {
  //           id: 'components-pills',
  //           title: 'Pills',
  //           translate: 'MENU.UI.COMPONENTS.PILLS',
  //           type: 'item',
  //           icon: 'circle',
  //           url: 'components/pills'
  //         },
  //         {
  //           id: 'components-popovers',
  //           title: 'Popovers',
  //           translate: 'MENU.UI.COMPONENTS.POPOVERS',
  //           type: 'item',
  //           icon: 'circle',
  //           url: 'components/popovers'
  //         },
  //         {
  //           id: 'components-progress',
  //           title: 'Progress',
  //           translate: 'MENU.UI.COMPONENTS.PROGRESS',
  //           type: 'item',
  //           icon: 'circle',
  //           url: 'components/progress'
  //         },
  //         {
  //           id: 'components-ratings',
  //           title: 'Ratings',
  //           translate: 'MENU.UI.COMPONENTS.RATINGS',
  //           type: 'item',
  //           icon: 'circle',
  //           url: 'components/ratings'
  //         },
  //         {
  //           id: 'components-spinner',
  //           title: 'Spinner',
  //           translate: 'MENU.UI.COMPONENTS.SPINNER',
  //           type: 'item',
  //           icon: 'circle',
  //           url: 'components/spinner'
  //         },
  //         {
  //           id: 'components-tabs',
  //           title: 'Tabs',
  //           translate: 'MENU.UI.COMPONENTS.TABS',
  //           type: 'item',
  //           icon: 'circle',
  //           url: 'components/tabs'
  //         },
  //         {
  //           id: 'components-timeline',
  //           title: 'Timeline',
  //           translate: 'MENU.UI.COMPONENTS.TIMELINE',
  //           type: 'item',
  //           icon: 'circle',
  //           url: 'components/timeline'
  //         },
  //         {
  //           id: 'components-toasts',
  //           title: 'Toasts',
  //           translate: 'MENU.UI.COMPONENTS.TOASTS',
  //           type: 'item',
  //           icon: 'circle',
  //           url: 'components/toasts'
  //         },
  //         {
  //           id: 'components-tooltips',
  //           title: 'Tooltips',
  //           translate: 'MENU.UI.COMPONENTS.TOOLTIPS',
  //           type: 'item',
  //           icon: 'circle',
  //           url: 'components/tooltips'
  //         }
  //       ]
  //     },
  //     {
  //       id: 'extensions',
  //       title: 'Extension',
  //       translate: 'MENU.UI.EX.COLLAPSIBLE',
  //       type: 'collapsible',
  //       icon: 'plus-circle',
  //       children: [
  //         {
  //           id: 'ex-sweet-alerts',
  //           title: 'Sweet Alerts',
  //           translate: 'MENU.UI.EX.SWEET_ALERTS',
  //           icon: 'circle',
  //           type: 'item',
  //           url: '/extensions/sweet-alerts'
  //         },
  //         {
  //           id: 'ex-blockui',
  //           title: 'BlockUI',
  //           translate: 'MENU.UI.EX.BLOCKUI',
  //           icon: 'circle',
  //           type: 'item',
  //           url: 'extensions/blockui'
  //         },
  //         {
  //           id: 'ex-toastr',
  //           title: 'Toastr',
  //           translate: 'MENU.UI.EX.TOASTER',
  //           icon: 'circle',
  //           type: 'item',
  //           url: 'extensions/toastr'
  //         },
  //         {
  //           id: 'ex-noui-slider',
  //           title: 'Slider',
  //           translate: 'MENU.UI.EX.SLIDER',
  //           icon: 'circle',
  //           type: 'item',
  //           url: '/extensions/noui-slider'
  //         },
  //         {
  //           id: 'ex-drag-drop',
  //           title: 'Drag & Drop',
  //           translate: 'MENU.UI.EX.DRAGDROP',
  //           icon: 'circle',
  //           type: 'item',
  //           url: 'extensions/drag-drop'
  //         },
  //         {
  //           id: 'ex-tour',
  //           title: 'Tour',
  //           translate: 'MENU.UI.EX.TOUR',
  //           icon: 'circle',
  //           type: 'item',
  //           url: 'extensions/tour'
  //         },
  //         {
  //           id: 'ex-clip-board',
  //           title: 'Clipboard',
  //           translate: 'MENU.UI.EX.CLIPBOARD',
  //           icon: 'circle',
  //           type: 'item',
  //           url: 'extensions/clipboard'
  //         },
  //         {
  //           id: 'ex-media-player',
  //           title: 'Media Player',
  //           translate: 'MENU.UI.EX.MEDIAPLAYER',
  //           icon: 'circle',
  //           type: 'item',
  //           url: 'extensions/media-player'
  //         },
  //         {
  //           id: 'ex-content-menu',
  //           title: 'Context Menu',
  //           translate: 'MENU.UI.EX.CONTEXTMENU',
  //           icon: 'circle',
  //           type: 'item',
  //           url: 'extensions/context-menu'
  //         },
  //         {
  //           id: 'ex-swiper',
  //           title: 'Swiper',
  //           translate: 'MENU.UI.EX.SWIPER',
  //           icon: 'circle',
  //           type: 'item',
  //           url: 'extensions/swiper'
  //         },
  //         {
  //           id: 'ex-tree-view',
  //           title: 'Tree View',
  //           translate: 'MENU.UI.EX.TREEVIEW',
  //           icon: 'circle',
  //           type: 'item',
  //           url: 'extensions/tree-view'
  //         },
  //         {
  //           id: 'i18n',
  //           title: 'I18n',
  //           translate: 'MENU.UI.EX.I18N',
  //           icon: 'circle',
  //           type: 'item',
  //           url: '/extensions/i18n'
  //         }
  //       ]
  //     },
  //     {
  //       id: 'page-layouts',
  //       title: 'Page Layouts',
  //       translate: 'MENU.UI.LAYOUTS.COLLAPSIBLE',
  //       type: 'collapsible',
  //       icon: 'layout',
  //       children: [
  //         {
  //           id: 'layout-collapsed-menu',
  //           title: 'Collapsed Menu',
  //           translate: 'MENU.UI.LAYOUTS.COLLAPSED_MENU',
  //           icon: 'circle',
  //           type: 'item',
  //           url: 'ui/page-layouts/collapsed-menu'
  //         },
  //         {
  //           id: 'layout-boxed',
  //           title: 'Boxed Layout',
  //           translate: 'MENU.UI.LAYOUTS.BOXED_LAYOUT',
  //           icon: 'circle',
  //           type: 'item',
  //           url: 'ui/page-layouts/boxed-layout'
  //         },
  //         {
  //           id: 'layout-without-menu',
  //           title: 'Without Menu',
  //           translate: 'MENU.UI.LAYOUTS.WITHOUT_MENU',
  //           icon: 'circle',
  //           type: 'item',
  //           url: 'ui/page-layouts/without-menu'
  //         },
  //         {
  //           id: 'layout-empty',
  //           title: 'Layout Empty',
  //           translate: 'MENU.UI.LAYOUTS.LAYOUT_EMPTY',
  //           icon: 'circle',
  //           type: 'item',
  //           url: 'ui/page-layouts/layout-empty'
  //         },
  //         {
  //           id: 'layout-blank',
  //           title: 'Layout Blank',
  //           translate: 'MENU.UI.LAYOUTS.LAYOUT_BLANK',
  //           icon: 'circle',
  //           type: 'item',
  //           url: 'ui/page-layouts/layout-blank'
  //         }
  //       ]
  //     }
  //   ]
  // },

  //Charts & Maps
  // {
  //   id: 'charts-maps',
  //   type: 'section',
  //   title: 'Charts & Maps',
  //   translate: 'Charts & Maps',
  //   icon: 'bar-chart-2',
  //   children: [
  //     {
  //       id: 'charts',
  //       title: 'Charts',
  //       translate: 'Charts',
  //       type: 'collapsible',
  //       icon: 'pie-chart',
  //       badge: {
  //         title: '2',
  //         translate: 'MENU.CM.CHARTS.BADGE',
  //         classes: 'badge-light-danger badge-pill'
  //       },
  //       children: [
  //         {
  //           id: 'apex',
  //           title: 'Apex',
  //           translate: 'Apex',
  //           type: 'item',
  //           icon: 'circle',
  //           url: 'charts-and-maps/apex'
  //         },
  //         {
  //           id: 'chartJs',
  //           title: 'ChartJS',
  //           translate: 'ChartJs',
  //           type: 'item',
  //           icon: 'circle',
  //           url: 'charts-and-maps/chartjs'
  //         }
  //       ]
  //     },
  //     {
  //       id: 'google-maps',
  //       title: 'Google Maps',
  //       translate: 'Google Maps',
  //       icon: 'map',
  //       type: 'item',
  //       url: 'charts-and-maps/google-maps'
  //     }
  //   ]
  // },
];
