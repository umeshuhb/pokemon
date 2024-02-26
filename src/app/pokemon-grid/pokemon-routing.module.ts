import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonGridComponent } from './pokemon.component';
import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';
  
const routes: Routes = [
  { path: '', redirectTo: 'pokemon', pathMatch: 'full'},
  { path: 'pokemon', component: PokemonGridComponent },
  { path: 'detail/:name', component: PokemonDetailComponent }
];
  
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokemonRoutingModule { }