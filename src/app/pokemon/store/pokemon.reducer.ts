import { createReducer, on } from '@ngrx/store';
import * as PokemonActions from './pokemon.actions';
import { IPokemonDetail } from '../pokemon.model';
import { uniqBy, orderBy } from "lodash";

export const pokemonFeatureKey = 'pokemon';

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

    on(PokemonActions.setPokemonAsActive,
      (state, { pokemon }) => ({ ...state, activePokemon: pokemon })
   ),
);
