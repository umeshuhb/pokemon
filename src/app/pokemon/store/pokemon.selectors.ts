import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromPokemonReducer from './pokemon.reducer';

export const selectPokemonState = createFeatureSelector<fromPokemonReducer.State> ( 
  fromPokemonReducer.pokemonFeatureKey);

export const selectPokemonlistData = createSelector(
  selectPokemonState,
  (state) => state.pokemonData
);

export const selectPokemonlistDataLoading = createSelector(
  selectPokemonState,
  (state) => state.loading
);

export const selectNextUrlForFetchPokemonlist = createSelector(
  selectPokemonState,
  (state) => state.nextPageUrl
);

export const selectActivePokemon = createSelector(
  selectPokemonState,
  (state) => state.activePokemon
);
