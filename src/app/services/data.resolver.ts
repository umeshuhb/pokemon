import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectPokemonlistData } from '../pokemon/store/pokemon.selectors';

export const PokemonListResolver: ResolveFn<any> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    store = inject( Store )
  ): Observable<any> => store.select(selectPokemonlistData).pipe(
    map((data) => {
      return data;
    })
  );