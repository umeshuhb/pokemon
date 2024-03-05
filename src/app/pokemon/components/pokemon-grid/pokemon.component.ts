import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PokemonService } from 'src/app/services/pokemon.service';
import { loadPoekomnList } from '../../store/pokemon.actions';
import { selectPokemonlistData, selectPokemonlistDataLoading } from '../../store/pokemon.selectors';
import { Subscription } from 'rxjs';
    
@Component({
  selector: 'app-pokemon-grid',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonGridComponent implements OnInit {
     
  loading!: boolean;
  selectPokemonlistData$ = this.store.select(selectPokemonlistData);
  subscription = new Subscription();

  constructor(
    public pokemonService: PokemonService,
    private store: Store
   ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.store.select(selectPokemonlistDataLoading).subscribe( flag => this.loading = flag));
    this.fetchMoreData();
  }

  fetchMoreData(): void {
    this.store.dispatch(loadPoekomnList());
  }

  ngOnDestroy(): void {
    // Unsubscribe from the store when the component is destroyed
      this.subscription.unsubscribe();    
  }
}