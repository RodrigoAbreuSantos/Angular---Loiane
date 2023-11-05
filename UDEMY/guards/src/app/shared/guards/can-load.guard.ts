import { CanMatchFn } from '@angular/router';

export const canLoadGuard: CanMatchFn = (route, segments) => {

  if (segments[1]?.path === 'leads') return true
  console.log(route)
  console.log(segments)
  alert('Modulo não foi carregado')
  return false;
};
