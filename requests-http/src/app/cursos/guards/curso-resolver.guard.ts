import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CursosService } from '../cursos.service';
import { of } from 'rxjs';

export const cursoResolverGuard: ResolveFn<any> = (route, state) => {

  const service = inject(CursosService)

  if (route.params && route.params['id']){
    return service.loadById(route.params['id'])
  }
  return of({
    id: null,
    nome: null
  })
};
