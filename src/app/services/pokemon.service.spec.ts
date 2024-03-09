import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PokemonService } from './pokemon.service';
import { ApiConstants } from '../shared/constants/api.urls';
import { mockEvolutionDetail, mockPokemonDetailObj, mockPokemonSpecie } from '../pokemon/store/mockData';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonService]
    });

    service = TestBed.inject(PokemonService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch Pokemon detail', () => {
    const pokemonName = 'ivysaur';
    const mockResponse = mockPokemonDetailObj;

    service.getDetail(pokemonName).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${ApiConstants.FETCH_POKEMON_GRID()}/${pokemonName}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch Pokemon info', () => {
    const pokemonURL = 'https://example.com/api/pokemon/1';
    const mockResponse = mockPokemonDetailObj;

    service.fetchPokemonInfo(pokemonURL).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(pokemonURL);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch Pokemon evolution', () => {
    const pokemonId = 1;
    const mockResponse = mockEvolutionDetail;

    service.getEvolution(pokemonId).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(ApiConstants.FETCH_POKEMON_EVOLUTION_CHAIN(pokemonId));
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch Pokemon species', () => {
    const pokemonName = 'ivysaur';
    const mockResponse =  mockPokemonSpecie;

    service.getSpecies(pokemonName).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(ApiConstants.FETCH_POKEMON_SPECIES(pokemonName));
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
