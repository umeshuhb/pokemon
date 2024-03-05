import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
     
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../shared/models/common.model';
import { ApiConstants } from '../shared/constants/api.urls';
import { DEFAULT_PAGE_SIZE } from '../shared/constants/app.const';
import { IPokemonDetail, IPokemonGrid } from '../pokemon/pokemon.model';
  
@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  constructor(private httpClient: HttpClient) { }

  private _next: string = '';


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
    return this.httpClient.get<IPokemonDetail>(url);
  }

  getPokemonsList(url?:string) {
    return this.httpClient
    .get<IPokemonGrid>(
      url ? url : ApiConstants.FETCH_POKEMON_GRID(),
      {
        params: {},
      }
    )
    .pipe(map((response) => response))
  }

  fetchPokemonInfo(pokemonURL:string){
   return this.httpClient
    .get<ApiResponse<IPokemonDetail>>(
      pokemonURL,
      {
        params: {},
      }
    ).pipe(map((pokemons) => pokemons))
  }

  getEvolution(id: number): Observable<any> {
    return this.httpClient.get<any>(ApiConstants.FETCH_POKEMON_EVOLUTION_CHAIN(id));
  }

  getSpecies(name: string): Observable<any> {
    return this.httpClient.get<any>(ApiConstants.FETCH_POKEMON_SPECIES(name));
  }
  
}