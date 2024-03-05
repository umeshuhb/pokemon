import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonGridComponent } from './components/pokemon-grid/pokemon.component';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { PokemonListResolver } from '../services/data.resolver';
  
const routes: Routes = [
  { path: '', redirectTo: 'pokemon', pathMatch: 'full'},
  { path: 'pokemon', component: PokemonGridComponent },
  { path: 'detail/:name', component: PokemonDetailComponent,  resolve: { listData: PokemonListResolver  },
   }
];
  
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokemonRoutingModule { }