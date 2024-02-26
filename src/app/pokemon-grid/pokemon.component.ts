import { Component, OnDestroy, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { IPokemonDetail, IPokemonGrid, IPokemonNameUrl } from './pokemon.model';
import { Subscription } from 'rxjs';
    
@Component({
  selector: 'app-pokemon-grid',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonGridComponent implements OnInit, OnDestroy {
     
  loading!: boolean;
  subscription = new Subscription();

  constructor(
    public pokemonService: PokemonService
   ) { }
    
  get pokemons(): any[] {
    return this.pokemonService.pokemons;
  }

  ngOnInit(): void {
    this.fetchMoreData();
  }

  fetchMoreData(): void {
    this.loading = true;
    this.subscription.add(this.pokemonService.getNext().subscribe(({pokemonGrid, pokemonsDetail}) => {
      this.pokemonService.next = pokemonGrid.next;
      this.loading = false;
      this.pokemonService.pokemons.push(...pokemonsDetail);
    }));
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
    
}