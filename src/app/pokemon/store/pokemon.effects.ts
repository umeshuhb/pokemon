import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, forkJoin, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as PoekomnActions from './pokemon.actions';
import { PokemonService } from 'src/app/services/pokemon.service';
import { IPokemonDetail, IPokemonGrid, IPokemonNameUrl } from '../pokemon.model';
import { selectNextUrlForFetchPokemonlist, selectPokemonlistData } from './pokemon.selectors';

@Injectable()
export class PokemonEffects {
    constructor(private actions$: Actions, private store: Store, private pokemonService: PokemonService) { }

    loadPokemonList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PoekomnActions.loadPoekomnList),
            concatLatestFrom(() => [this.store.select(selectNextUrlForFetchPokemonlist)]),
            switchMap(([payload, nextPageUrl]) =>
                 /* Here we're calling the API which fetches the pokemon list page wise, merging with internal API calls */
                this.pokemonService.getPokemonsList(nextPageUrl).pipe(
                    mergeMap((apiResponse: IPokemonGrid) => {
                        
                        const pokemonGrid: IPokemonGrid = apiResponse;
                        const results: IPokemonNameUrl[] = pokemonGrid.results;
                         /* Here we're collecting and setting in array all the urls for gethering pokemon details from above pomeon list response 
                        and then calling via forkJoin operator, so that it will trigger once all the APIs get responds successfully 
                        */
                        return forkJoin(results.map(
                            (pokemon: IPokemonNameUrl) => this.pokemonService.fetchPokemonInfo(pokemon.url)
                        ))
                        .pipe(map((pokemonsDetail: any) => ({ pokemonsDetail, pokemonGrid })))
                    }),
                    map((result: { pokemonsDetail: IPokemonDetail[]; pokemonGrid: IPokemonGrid }) =>
                        PoekomnActions.loadPoekomnListSuccess(result)),
                    catchError((error) => of(PoekomnActions.loadPoekomnListFailure({ error: 'Failed to load pokemons' })))
                )
            )
        )
    );

    loadPokemonDetails$ = createEffect(() => this.actions$.pipe(
        ofType(PoekomnActions.getPokemonDetails),
        concatLatestFrom(()=> [this.store.select(selectPokemonlistData)]),
        switchMap(([payload, pokemonData]) => { 
            const pokemon = pokemonData.find(pokemon => pokemon.name === payload.pokemonName);
            if(pokemon){
                  /* if pokemon already exists in list then just mark it as selected pokemon, and no need to call it's details */ 
                return of(PoekomnActions.setPokemonAsActive({ pokemon }));
            }  else {
                 /* if pokemon is not present in list (for ex. user refreshes the page in the detail screen) then we have to call details for that particular pokemon and set in the list, also we are marking it as active 
                 from the reducer with the same `getPokemonDetailsSuccess` action */
                 return this.pokemonService.getDetail(payload.pokemonName)
                .pipe(
                    map(details => { return PoekomnActions.getPokemonDetailsSuccess({pokemonsDetails: details})}),
                    catchError((error) => of(PoekomnActions.getPokemonDetailsFailure({ error: 'Failed to load pokemon details' })))
                )
            }
            }
        )
      ));

      loadPokemonSpecies$ = createEffect(() => this.actions$.pipe(
        ofType(PoekomnActions.getPokemonSpecies),
        switchMap(({pokemonName}) => { 
            /* call API for get species of pokemon*/
            return this.pokemonService.getSpecies(pokemonName)
            .pipe(
               mergeMap((pokemonDetails) => {  
                const splitUrl = pokemonDetails.evolution_chain.url.split('/');
                const id = +splitUrl[splitUrl.length - 2];                     
                return [PoekomnActions.getPokemonEvolution({pokemonId: pokemonDetails.id, evolutionChainId: id})];                
            }),
                catchError((error) => of(PoekomnActions.getPokemonDetailsFailure(
                { error: 'Failed to load pokemon details' })))
            )
        }
        )
      ));


      loadPokemonEvolutions$ = createEffect(() => this.actions$.pipe(
        ofType(PoekomnActions.getPokemonEvolution),
        switchMap(({pokemonId, evolutionChainId}) => { 
            /* call API for get Evolution of pokemon*/
            return this.pokemonService.getEvolution(evolutionChainId)
            .pipe(
                map(details => { 
                return PoekomnActions.getPokemonEvolutionSuccess({pokemonId, pokemonEvolution: details});
            
            }),
            catchError((error) => of(PoekomnActions.getPokemonEvolutionFailure(
                { error: 'Failed to load pokemon evolution' })))
            )
        }
        )
      ));

}
