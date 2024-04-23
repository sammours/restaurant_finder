import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'finder',
        children: [
          {
            path: '',
            loadChildren: '../finder/finder.module#FinderPageModule'
          }
        ]
      },
      {
        path: 'favourite',
        children: [
          {
            path: '',
            loadChildren: '../favourite/favourite.module#FavouritePageModule'
          }
        ]
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            loadChildren: '../settings/settings.module#SettingsPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/finder',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/finder',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
