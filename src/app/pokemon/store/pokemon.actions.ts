import { createAction, props } from '@ngrx/store';
import { IPokemonDetail, IPokemonEvolutionResponse, IPokemonGrid } from '../pokemon.model';

/* Get Pokemon List Actions */
export const loadPoekomnList = createAction('[Poekomn] Load Poekomn list');

export const loadPoekomnListSuccess = createAction('[Poekomn] Load Poekomn list Success', 
    props<{pokemonsDetail: IPokemonDetail[]; pokemonGrid: IPokemonGrid }>());

export const loadPoekomnListFailure = createAction('[Poekomn] Load Poekomn list Failure', 
    props<{ error: string }>());

/* Get Pokemon Detail Actions */
export const getPokemonDetails = createAction('[Poekomn] Load Poekomn deatails', 
    props<{ pokemonName: string; }>());

export const getPokemonDetailsSuccess = createAction('[Poekomn] Load Poekemon deatails Success', 
    props<{pokemonsDetails: IPokemonDetail; }>());

export const getPokemonDetailsFailure = createAction('[Poekomn] Load Poekemon deatails Failure', 
    props<{ error: string }>());

/* Set Pokemon as Active Action */
export const setPokemonAsActive = createAction('[Poekomn] set Poekomn as selected', 
    props<{ pokemon: IPokemonDetail; }>());

/* Get Pokemon Species Actions */
export const getPokemonSpecies = createAction('[Poekomn] Get Poekomn Species', 
    props<{ pokemonName: string; }>());

export const getPokemonSpeciesSuccess = createAction('[Poekomn] Get Poekomn Species Success', 
    props<{pokemonsDetails: IPokemonDetail; }>());

export const getPokemonSpeciesFailure = createAction('[Poekomn] Get Poekomn Species Failure', 
    props<{ error: string }>());

/* Get Pokemon Evolution Actions */
export const getPokemonEvolution = createAction('[Poekomn] Get Poekomn Evolution', 
    props<{ pokemonId:number; evolutionChainId: number; }>());

export const getPokemonEvolutionSuccess = createAction('[Poekomn] Get Poekomn Evolution Success', 
    props<{pokemonId : number; pokemonEvolution: IPokemonEvolutionResponse; }>());

export const getPokemonEvolutionFailure = createAction('[Poekomn] Get Poekomn Evolution Failure', 
    props<{ error: string }>());  
