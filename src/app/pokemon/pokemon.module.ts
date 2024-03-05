import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonRoutingModule } from './pokemon-routing.module';  
import { PokemonGridComponent } from './components/pokemon-grid/pokemon.component';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { PokemonEvolutionComponent } from './components/pokemon-evolution/pokemon-evolution.component';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { PokemonEffects } from './store/pokemon.effects';
import * as fromPokemonReducer from './store/pokemon.reducer';
import { EffectsModule } from '@ngrx/effects';


@NgModule({
  declarations: [PokemonGridComponent, PokemonDetailComponent, PokemonEvolutionComponent],
  imports: [
    CommonModule,
    PokemonRoutingModule,
    SharedModule,
    StoreModule.forFeature( fromPokemonReducer.pokemonFeatureKey,
      fromPokemonReducer.pokemonReducer),
      EffectsModule.forFeature([PokemonEffects])
  ]
})
export class PokemonModule { }