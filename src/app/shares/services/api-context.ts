export abstract class ApiContext {
  public readonly BASE_URL = 'http://localhost:3232/';
  // public readonly BASE_URL = 'http://10.3.14.87:8888/';
  // public readonly BASE_URL = 'http://10.252.12.224:3232/';
  public readonly COMMON_URL = 'common';

  public readonly api = {
    auth: 'auth',
    user: 'user',
    userType: 'userTypes',
    rule: 'rule',
    customercare: 'customercare',
    wwf: 'wwf',
  };
}