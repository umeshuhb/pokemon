import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
     
import {  EMPTY, Observable, forkJoin } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ApiResponse } from '../shared/models/common.model';
import { IPokemonDetail, IPokemonGrid, IPokemonNameUrl } from '../pokemon-grid/pokemon.model';
import { ApiConstants } from '../shared/constants/api.urls';
import { DEFAULT_PAGE_SIZE } from '../shared/constants/app.const';
  
@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  constructor(private httpClient: HttpClient) { }

  private _pokemons: IPokemonDetail[] = [];
  private _next: string = '';

  get pokemons(): IPokemonDetail[] {
    return this._pokemons;
  }
  
  set pokemons(pokemons: IPokemonDetail[]) {
    this._pokemons = pokemons;
  }

  get next(): string {
    return this._next;
  }

  set next(next: string) {
    this._next = next;
  }

  getNext(): Observable<any> {
    const url = this.next === '' ? `${ApiConstants.FETCH_POKEMON_GRID()}?limit=${DEFAULT_PAGE_SIZE}` : this.next;
    return this.getPokemonsList(url);
  }

  getDetail(name: string): Observable<any> {
    const url = `${ApiConstants.FETCH_POKEMON_GRID()}/${name}`;
    return this.httpClient.get<any>(url);
  }

  getPokemonsList(url?:string): Observable<any> {
    return this.httpClient
    .get<ApiResponse<IPokemonGrid>>(
      url ? url : ApiConstants.FETCH_POKEMON_GRID(),
      {
        params: {},
      }
    )
    .pipe(
      mergeMap((pokemonGrid:any)=> { 
        const results = pokemonGrid.results;
        return forkJoin(results.map(
          (pokemon:IPokemonNameUrl) => this.fetchPokemonInfo(pokemon.url)
        ))
        .pipe(map( (pokemonsDetail) => { return { pokemonsDetail, pokemonGrid}}))
      })
    ).pipe(catchError(err => {
      console.log(err);
      return EMPTY;
    }))
    .pipe(map((pokemons) => pokemons))
  }

  fetchPokemonInfo(pokemonURL:string): Observable<IPokemonDetail>{
   return this.httpClient
    .get<IPokemonDetail>(
      pokemonURL,
      {
        params: {},
      }
    )
  }

  getEvolution(id: number): Observable<any> {
    return this.httpClient.get<any>(ApiConstants.FETCH_POKEMON_EVOLUTION_CHAIN(id));
  }

  getSpecies(name: string): Observable<any> {
    return this.httpClient.get<any>(ApiConstants.FETCH_POKEMON_SPECIES(name));
  }
  
}