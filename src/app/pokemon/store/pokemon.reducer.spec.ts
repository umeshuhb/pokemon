import * as PokemonActions from './pokemon.actions';
import { initialState, pokemonReducer, State } from './pokemon.reducer';
import { IPokemonDetail } from '../pokemon.model';
import { mockPokemonDetailObj, mockPokemonGridObj } from './mockData';

describe('PokemonReducer', () => {
  it('should handle loadPokemonList action', () => {
    const action = PokemonActions.loadPoekomnList();
    const state = pokemonReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle loadPoekomnListSuccess action', () => {
    const pokemonsDetail: IPokemonDetail[] = [mockPokemonDetailObj];
    const pokemonGrid = mockPokemonGridObj;
    const action = PokemonActions.loadPoekomnListSuccess({ pokemonsDetail, pokemonGrid });
    const state = pokemonReducer(initialState, action);

    expect(state.pokemonData).toEqual(pokemonsDetail);
    expect(state.loading).toBe(false);
    expect(state.pokemonDataCount).toBe(pokemonGrid.count);
    expect(state.nextPageUrl).toBe(pokemonGrid.next);
  });

  it('should handle loadPoekomnListFailure action', () => {
    const error = 'Failed to load pokemons';
    const action = PokemonActions.loadPoekomnListFailure({ error });
    const state = pokemonReducer(initialState, action);

    expect(state.error).toBe(error);
    expect(state.loading).toBe(false);
  });

  it('should handle getPokemonDetails action', () => {
    const pokemonName = 'pikachu';
    const action = PokemonActions.getPokemonDetails({ pokemonName });
    const state = pokemonReducer(initialState, action);

    expect(state.activePokemon).toBeNull();
  });

  it('should handle getPokemonDetailsSuccess action', () => {
    const pokemonsDetails: IPokemonDetail = mockPokemonDetailObj;
    const action = PokemonActions.getPokemonDetailsSuccess({ pokemonsDetails });
    const state = pokemonReducer(initialState, action);

    expect(state.pokemonData).toEqual([pokemonsDetails]);
    expect(state.activePokemon).toEqual(pokemonsDetails);
  });

  it('should handle setPokemonAsActive action', () => {
    const pokemon: IPokemonDetail = mockPokemonDetailObj;
    const action = PokemonActions.setPokemonAsActive({ pokemon });
    const state = pokemonReducer(initialState, action);

    expect(state.activePokemon).toEqual(pokemon);
  });

  it('should return the initial state for an unknown action', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    const state = pokemonReducer(initialState, unknownAction as any);

    expect(state).toBe(initialState);
  });
});
