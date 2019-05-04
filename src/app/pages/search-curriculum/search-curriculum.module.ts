import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SearchCurriculumPage } from './search-curriculum.page';

const routes: Routes = [
  { path: '', component: SearchCurriculumPage },
  { path: 'results', loadChildren: './results/results.module#ResultsPageModule' },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SearchCurriculumPage]
})
export class SearchCurriculumPageModule {}
