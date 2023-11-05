import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//COMPONENTES
import { HomeComponent } from './shared/pages/home/home.component';
import { AccountComponent } from './shared/pages/account/account.component';

//GUARDS
import { canActiveGuard } from './shared/guards/can-active.guard';
import { canDeactivateGuard } from './shared/guards/can-deactivate.guard';
import { canLoadGuard } from './shared/guards/can-load.guard';
import { canActivateChildGuard } from './shared/guards/can-activate-child.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [canActiveGuard],
    canDeactivate: [canDeactivateGuard]
  },
  {
    path: '',
    loadChildren: () => import('./core/core.module').then((m) => m.CoreModule),
    canMatch: [canLoadGuard],
    canActivateChild: [canActivateChildGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
