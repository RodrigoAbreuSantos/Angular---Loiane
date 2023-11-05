import { CanDeactivateFn } from '@angular/router';

//Componentes
import { AccountComponent } from '../pages/account/account.component';

export const canDeactivateGuard: CanDeactivateFn<AccountComponent> = (component, currentRoute, currentState, nextState) => {

  console.log(currentRoute)
  console.log(currentState)
  console.log(nextState)
  return component.exit()
};
