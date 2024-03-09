import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IPokemonDetail } from '../../pokemon.model';
import { Store } from '@ngrx/store';
import { getPokemonDetails, getPokemonSpecies } from '../../store/pokemon.actions';
import { selectActivePokemon } from '../../store/pokemon.selectors';

@Component({
    selector: 'app-pokemon-detail',
    templateUrl: './pokemon-detail.component.html',
    styleUrls: ['./pokemon-detail.component.scss']
  })
  export class PokemonDetailComponent implements OnInit, OnDestroy {

   public pokemon:IPokemonDetail | null = null;
   private pokemonName!:string;

   public subscription = new Subscription();
  
    constructor(
      private route: ActivatedRoute,
      private store: Store
      ) { }
  
    ngOnInit(): void {

      /*1. 1will be executed on change of active pokemon from subscription and will trigger call for fetching
      pokemonEvolution -- active pokeomn will be set from below route change code effects (2) */
      this.subscription.add(
        this.store.select(selectActivePokemon).subscribe( activePokemon => {
        this.pokemon = activePokemon;
        if(activePokemon && activePokemon.name === this.pokemonName){
           this.getPokemonEvolution();
          }
      } ));

      /* 2. will be executed on route change and take pokemon name from route and will trigger call for fetching
      pokemonDetails */
      this.subscription.add(this.route.params.subscribe(params => {
        this.pokemonName = params['name'];
        if(this.pokemonName && this.pokemonName !== ''){
          this.store.dispatch(getPokemonDetails({pokemonName: params['name']}));
        }
      }));
      
    }
  
    getPokemonEvolution() {
      if (this.pokemon && (!this.pokemon.evolutions || !this.pokemon.evolutions.length)) {
        if(this.pokemon) { 
          this.pokemon = {...this.pokemon, evolutions: []};
          this.store.dispatch(getPokemonSpecies({pokemonName: this.pokemon.name}));         
        }
      }
    }

    ngOnDestroy(): void {
      //on destroy remove subscriptions to remove unwanted event subscription
      this.subscription.unsubscribe();
    }
  
  }