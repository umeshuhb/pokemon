import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { PokemonService } from '../../../services/pokemon.service';
import { IPokemonDetail } from '../../pokemon.model';
import { Store } from '@ngrx/store';
import { getPokemonDetails } from '../../store/pokemon.actions';
import { selectActivePokemon } from '../../store/pokemon.selectors';

@Component({
    selector: 'app-pokemon-detail',
    templateUrl: './pokemon-detail.component.html',
    styleUrls: ['./pokemon-detail.component.scss']
  })
  export class PokemonDetailComponent implements OnInit, OnDestroy {

    pokemon:IPokemonDetail | null = null;
    pokemonName!:string;

    subscription = new Subscription();
  
    constructor(
      private route: ActivatedRoute,
      private pokemonService: PokemonService,
      private store: Store
      ) { }
  
    ngOnInit(): void {

      this.subscription.add(
        this.store.select(selectActivePokemon).subscribe( activePokemon => {
        this.pokemon = activePokemon;
        if(activePokemon && activePokemon.name === this.pokemonName){
           this.getPokemonEvolution();
          }
      } ));

      this.subscription.add(this.route.params.subscribe(params => {
        this.pokemonName = params['name'];
        this.store.dispatch(getPokemonDetails({pokemonName: params['name']}));
      }));
      
    }
  
    getPokemonEvolution() {
      if (!this.pokemon?.evolutions || !this.pokemon.evolutions.length) {
        if(this.pokemon) { 
          this.pokemon = {...this.pokemon, evolutions: []};
          this.pokemonService.getSpecies(this.pokemon.name).subscribe(response => {
          const id = this.getId(response.evolution_chain.url);
          this.subscription.add(this.pokemonService.getEvolution(id).subscribe(response => this.getEvolvechains(response.chain)));
        });
      }
      }
    }
  
    getEvolvechains(chain: any) {
      if(this.pokemon){
        this.pokemon.evolutions.push({
          id: this.getId(chain.species.url),
          name: chain.species.name
        });
    
        if (chain.evolves_to.length) {
          this.getEvolvechains(chain.evolves_to[0]);
        }
      }
    }
  
    getId(url: string): number {
      const splitUrl = url.split('/')
      return +splitUrl[splitUrl.length - 2];
    }

    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }
  
  }