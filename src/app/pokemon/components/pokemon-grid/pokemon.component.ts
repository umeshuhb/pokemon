import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PokemonService } from 'src/app/services/pokemon.service';
import { loadPoekomnList } from '../../store/pokemon.actions';
import { selectPokemonlistData, selectPokemonlistDataLoading } from '../../store/pokemon.selectors';
import { Subscription } from 'rxjs';
import { IPokemonDetail } from '../../pokemon.model';
    
@Component({
  selector: 'app-pokemon-grid',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonGridComponent implements OnInit {
     
  public loading!: boolean;
  public pokemons!: IPokemonDetail[];
  public subscription = new Subscription();

  constructor(
    public pokemonService: PokemonService,
    private store: Store
   ) { 
   }

  ngOnInit(): void {
    this.subscription.add(
      this.store.select(selectPokemonlistDataLoading).subscribe( flag => this.loading = flag));

    this.subscription.add(
      this.store.select(selectPokemonlistData).subscribe( data => {
        this.pokemons = data;
        if(!this.pokemons.length){
          this.fetchMoreData();
        }
      }));
  }

  fetchMoreData(): void {
    this.store.dispatch(loadPoekomnList());
  }

  ngOnDestroy(): void {
    // Unsubscribe from the store when the component is destroyed
      this.subscription.unsubscribe();    
  }
}