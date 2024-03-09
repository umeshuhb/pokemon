import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
     
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../shared/models/common.model';
import { ApiConstants } from '../shared/constants/api.urls';
import { IPokemonDetail, IPokemonEvolutionResponse, IPokemonGrid } from '../pokemon/pokemon.model';
  
@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  constructor(private httpClient: HttpClient) { }

  public getDetail(name: string): Observable<any> {
    const url = `${ApiConstants.FETCH_POKEMON_GRID()}/${name}`;
    return this.httpClient.get<IPokemonDetail>(url);
  }

  public getPokemonsList(url?:string) {
    return this.httpClient
    .get<IPokemonGrid>(
      url ? url : ApiConstants.FETCH_POKEMON_GRID(),
      {
        params: {},
      }
    )
    .pipe(map((response) => response))
  }

  public fetchPokemonInfo(pokemonURL:string){
   return this.httpClient
    .get<IPokemonDetail>(
      pokemonURL,
      {
        params: {},
      }
    ).pipe(map((pokemons) => pokemons))
  }

  public getEvolution(id: number) {
    return this.httpClient.get<IPokemonEvolutionResponse>(ApiConstants.FETCH_POKEMON_EVOLUTION_CHAIN(id));
  }

  public getSpecies(name: string) {
    return this.httpClient.get<any>(ApiConstants.FETCH_POKEMON_SPECIES(name));
  }
  
}