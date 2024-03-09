import * as PokemonActions from './pokemon.actions';
import { initialState, pokemonReducer, State } from './pokemon.reducer';
import { IPokemonDetail } from '../pokemon.model';

describe('PokemonReducer', () => {
  it('should handle loadPokemonList action', () => {
    const action = PokemonActions.loadPoekomnList();
    const state = pokemonReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  // it('should handle loadPoekomnListSuccess action', () => {
  //   const pokemonsDetail: IPokemonDetail[] = [{ id: 1, name: 'bulbasaur' }];
  //   const pokemonGrid = { count: 1, next: '' };
  //   const action = PokemonActions.loadPoekomnListSuccess({ pokemonsDetail, pokemonGrid });
  //   const state = pokemonReducer(initialState, action);

  //   expect(state.pokemonData).toEqual(pokemonsDetail);
  //   expect(state.loading).toBe(false);
  //   expect(state.pokemonDataCount).toBe(pokemonGrid.count);
  //   expect(state.nextPageUrl).toBe(pokemonGrid.next);
  // });

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

  // it('should handle getPokemonDetailsSuccess action', () => {
  //   const pokemonsDetails: IPokemonDetail = { id: 1, name: 'pikachu' };
  //   const action = PokemonActions.getPokemonDetailsSuccess({ pokemonsDetails });
  //   const state = pokemonReducer(initialState, action);

  //   expect(state.pokemonData).toEqual([pokemonsDetails]);
  //   expect(state.activePokemon).toEqual(pokemonsDetails);
  // });

  // it('should handle getPokemonEvolutionSuccess action', () => {
  //   const pokemonId = 1;
  //   const pokemonEvolution = { chain: { species: { url: 'https://example.com' }, evolves_to: [] } };
  //   const action = PokemonActions.getPokemonEvolutionSuccess({ pokemonId, pokemonEvolution });
  //   const state = pokemonReducer(initialState, action);

  //   expect(state.pokemonData[0].evolutions).toBeDefined();
  //   expect(state.activePokemon?.evolutions).toBeDefined();
  // });

  // it('should handle setPokemonAsActive action', () => {
  //   const pokemon: IPokemonDetail = { id: 1, name: 'bulbasaur' };
  //   const action = PokemonActions.setPokemonAsActive({ pokemon });
  //   const state = pokemonReducer(initialState, action);

  //   expect(state.activePokemon).toEqual(pokemon);
  // });

  it('should return the initial state for an unknown action', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    const state = pokemonReducer(initialState, unknownAction as any);

    expect(state).toBe(initialState);
  });
});
