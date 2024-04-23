import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FavouritePage } from './favourite.page';
import { PreviewRestuarantPage } from './preview-restuarant/preview-restuarant.page';

const routes: Routes = [
  { path: '', component: FavouritePage },
  { path: 'preview/:id', component: PreviewRestuarantPage},
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FavouritePage, PreviewRestuarantPage],
  entryComponents: [
    PreviewRestuarantPage
  ],
})
export class FavouritePageModule {}
