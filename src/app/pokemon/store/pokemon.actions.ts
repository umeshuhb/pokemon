import { createAction, props } from '@ngrx/store';
import { IPokemonDetail, IPokemonGrid } from '../pokemon.model';

export const loadPoekomnList = createAction('[Poekomn] Load Poekomn list');

export const loadPoekomnListSuccess = createAction('[Poekomn] Load Poekomn list Success', 
    props<{pokemonsDetail: IPokemonDetail[]; pokemonGrid: IPokemonGrid }>());

export const loadPoekomnListFailure = createAction('[Poekomn] Load Poekomn list Failure', 
    props<{ error: string }>());

export const getPokemonDetails = createAction('[Poekomn] Load Poekomn deatails', 
    props<{ pokemonName: string; }>());

export const getPokemonDetailsSuccess = createAction('[Poekomn] Load Poekemon deatails Success', 
    props<{pokemonsDetails: IPokemonDetail; }>());

export const getPokemonDetailsFailure = createAction('[Poekomn] Load Poekemon deatails Failure', 
props<{ error: string }>());


export const setPokemonAsActive = createAction('[Poekomn] set Poekomn as selected', 
    props<{ pokemon: IPokemonDetail; }>());
