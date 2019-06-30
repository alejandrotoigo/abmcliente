import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AbmPersonaComponent } from './abm-persona/abm-persona.component';


const routes: Routes = [
  {
    path: '', component: AbmPersonaComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
