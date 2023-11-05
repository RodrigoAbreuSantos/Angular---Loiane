import { CanActivateChildFn } from '@angular/router';

export const canActivateChildGuard: CanActivateChildFn = (childRoute, state) => {

  if (childRoute.queryParams['account'] === 'admin' && childRoute.queryParams['password'] === 1234) return true
  console.log(childRoute)
  console.log(state)
  return true;
};
