import { createReducer, on } from '@ngrx/store';
import * as PokemonActions from './pokemon.actions';
import { IPokemonDetail } from '../pokemon.model';
import { uniqBy, orderBy } from "lodash";

export const pokemonFeatureKey = 'pokemon';

const getEvolvechains = (evolutions:{id: number; name: string}[], chain: any) => {
  evolutions.push({
    id: getId(chain.species.url),
    name: chain.species.name
  });

  if (chain.evolves_to.length) {
    getEvolvechains(evolutions, chain.evolves_to[0]);
  }
  return evolutions;
}

const getId = (url: string): number => {
  const splitUrl = url.split('/')
  return +splitUrl[splitUrl.length - 2];
}

export interface State {
  pokemonData: IPokemonDetail[];
  loading: boolean;
  error: string | null;
  nextPageUrl: string;
  pokemonDataCount: number | null;
  activePokemon: IPokemonDetail | null;
}

export const initialState: State = {
  pokemonData: [],
  loading: false,
  error: null,
  nextPageUrl: '',
  pokemonDataCount: null,
  activePokemon: null
};

export const pokemonReducer = createReducer(
  initialState,
  on(PokemonActions.loadPoekomnList, 
    (state) => ({ ...state, loading: true, error: null })),

  on(PokemonActions.loadPoekomnListSuccess, 
    (state, { pokemonsDetail, pokemonGrid}):State => 
    {
      const data = [...state.pokemonData, ...pokemonsDetail];
      const sortedAndUnique = uniqBy(orderBy(data, 'order'), 'id');
      return {
        ...state, 
        pokemonData: sortedAndUnique,
        loading: false,
        pokemonDataCount: pokemonGrid.count,
        nextPageUrl: pokemonGrid.next  
      }
  }),

  on(PokemonActions.loadPoekomnListFailure,
     (state, { error }) => ({ ...state, error, loading: false })
  ),

  on(PokemonActions.getPokemonDetails,
    (state, { pokemonName }) => ({ ...state, activePokemon : null })
 ),

  on(PokemonActions.getPokemonDetailsSuccess, 
      (state, { pokemonsDetails}):State => 
      {
        return {
          ...state, 
          pokemonData: [...state.pokemonData, pokemonsDetails], 
          activePokemon: pokemonsDetails
        //  loading: false,
        }
    }),

    on(PokemonActions.getPokemonEvolutionSuccess, 
      (state, {pokemonId, pokemonEvolution}):State => 
      {
       const evolution = getEvolvechains([], pokemonEvolution.chain);
       const pokemons = state.pokemonData.map( p => { 
        if(p.id === pokemonId) { p.evolutions = evolution;}
        return p;
      });
    
      return {
        ...state, 
        pokemonData: [...pokemons],           
        ...(state.activePokemon && {
          activePokemon: {...state.activePokemon, evolutions: [...evolution] } 
        })
      }
    }),    

    on(PokemonActions.setPokemonAsActive,
      (state, { pokemon }) => ({ ...state, activePokemon: pokemon })
   ),
);
