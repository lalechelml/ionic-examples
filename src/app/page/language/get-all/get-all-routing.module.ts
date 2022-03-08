import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetAllPage } from './get-all.page';

const routes: Routes = [
  {
    path: '',
    component: GetAllPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetAllPageRoutingModule {}
