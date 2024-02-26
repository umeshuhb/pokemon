import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonRoutingModule } from './pokemon-routing.module';  
import { PokemonGridComponent } from './pokemon-grid/pokemon.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { PokemonEvolutionComponent } from './pokemon-evolution/pokemon-evolution.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [PokemonGridComponent, PokemonDetailComponent, PokemonEvolutionComponent],
  imports: [
    CommonModule,
    PokemonRoutingModule,
    SharedModule
  ]
})
export class PokemonModule { }