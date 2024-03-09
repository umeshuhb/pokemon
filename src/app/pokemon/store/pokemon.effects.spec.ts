import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonEffects } from './pokemon.effects';
import * as PoekomnActions from './pokemon.actions';
import { cold, hot } from 'jasmine-marbles';
import {
  IPokemonGrid,
  IPokemonDetail,
  IPokemonNameUrl
} from '../pokemon.model';
import { evolutionDetail, mockPokemonDetailObj, mockPokemonGridObj } from './mockData';

describe('PokemonEffects', () => {
  let actions$: Observable<any>;
  let effects: PokemonEffects;
  let pokemonService: jasmine.SpyObj<PokemonService>;
  let store: jasmine.SpyObj<Store>;

  beforeEach(() => {
    const pokemonServiceSpy = jasmine.createSpyObj('PokemonService', [
      'getPokemonsList',
      'fetchPokemonInfo',
      'getDetail',
      'getSpecies',
      'getEvolution'
    ]);

    const storeSpy = jasmine.createSpyObj('Store', ['select', 'dispatch']);    

    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        PokemonEffects,
        provideMockActions(() => actions$),
        { provide: PokemonService, useValue: pokemonServiceSpy },
        { provide: Store, useValue: storeSpy }
      ]
    });

    effects = TestBed.inject(PokemonEffects);
    pokemonService = TestBed.inject(PokemonService) as jasmine.SpyObj<PokemonService>;
    store = TestBed.inject(Store) as jasmine.SpyObj<Store>;
  });


  it('should dispatch loadPoekomnListSuccess action on successful loadPokemonList$', () => {
    const mockAction = PoekomnActions.loadPoekomnList();
    const mockPokemonGrid: IPokemonGrid = mockPokemonGridObj;
    const mockPokemonsDetail: IPokemonDetail[] = [mockPokemonDetailObj];

    actions$ = hot('-a', { a: mockAction });
    store.select.and.returnValue(of('mock-next-url')); // Mock the select method

    const response = cold('-b|', { b: mockPokemonGrid });
    const expected = cold('--c', {
      c: PoekomnActions.loadPoekomnListSuccess({
        pokemonsDetail: mockPokemonsDetail,
        pokemonGrid: mockPokemonGrid
      })
    });

    pokemonService.getPokemonsList.and.returnValue(response);
    pokemonService.fetchPokemonInfo.and.returnValue(of(mockPokemonsDetail[0]));

    expect(effects.loadPokemonList$).toBeObservable(expected);
  });

  it('should dispatch loadPoekomnListFailure action on error in loadPokemonList$', () => {
    const mockAction = PoekomnActions.loadPoekomnList();
    const error = 'Failed to load pokemons';

    actions$ = hot('-a', { a: mockAction });
    store.select.and.returnValue(of('mock-next-url')); // Mock the select method

    const response = cold('-#|', {}, error);
    const expected = cold('--c', {
      c: PoekomnActions.loadPoekomnListFailure({ error })
    });

    pokemonService.getPokemonsList.and.returnValue(response);

    expect(effects.loadPokemonList$).toBeObservable(expected);
  });
  
  it('should dispatch getPokemonEvolution action on loadPokemonSpecies$', () => {
    const pokemonName = 'squirtle';
    const action = PoekomnActions.getPokemonSpecies({ pokemonName });
    const pokemonDetails = { evolution_chain: { url: 'https://example.com/evolution-chain/1/' }, id: 1 };
    const completion = PoekomnActions.getPokemonEvolution({ pokemonId: 1, evolutionChainId: 1 });

    actions$ = hot('-a', { a: action });
    const response = cold('-a|', { a: pokemonDetails });
    const expected = cold('--b', { b: completion });
    pokemonService.getSpecies.and.returnValue(response);

    expect(effects.loadPokemonSpecies$).toBeObservable(expected);
  });

  it('should dispatch getPokemonDetailsFailure action on loadPokemonSpecies$ error', () => {
    const pokemonName = 'bulbasaur';
    const action = PoekomnActions.getPokemonSpecies({ pokemonName });
    const completion = PoekomnActions.getPokemonDetailsFailure({ error: 'Failed to load pokemon details' });

    actions$ = hot('-a', { a: action });
    const response = cold('-#|', {}, 'Error');
    const expected = cold('--b', { b: completion });
    pokemonService.getSpecies.and.returnValue(response);

    expect(effects.loadPokemonSpecies$).toBeObservable(expected);
  });

  it('should dispatch getPokemonEvolutionFailure action on loadPokemonEvolutions$ error', () => {
    const pokemonId = 1;
    const evolutionChainId = 1;
    const action = PoekomnActions.getPokemonEvolution({ pokemonId, evolutionChainId });
    const completion = PoekomnActions.getPokemonEvolutionFailure({ error: 'Failed to load pokemon evolution' });

    actions$ = hot('-a', { a: action });
    const response = cold('-#|', {}, 'Error');
    const expected = cold('--b', { b: completion });
    pokemonService.getEvolution.and.returnValue(response);

    expect(effects.loadPokemonEvolutions$).toBeObservable(expected);
  });


  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
