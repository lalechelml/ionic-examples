import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'page/example',
    loadChildren: () => import('./page/example/example.module').then( m => m.ExamplePageModule)
  },
  {
    path: 'page/math',
    loadChildren: () => import('./page/math/math.module').then( m => m.MathPageModule)
  },
  {
    path: 'language/insert',
    loadChildren: () => import('./page/language/insert/insert.module').then( m => m.InsertPageModule)
  },
  {
    path: 'language/getall',
    loadChildren: () => import('./page/language/get-all/get-all.module').then( m => m.GetAllPageModule)
  },
  {
    path: 'edit',
    loadChildren: () => import('./page/language/edit/edit.module').then( m => m.EditPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
