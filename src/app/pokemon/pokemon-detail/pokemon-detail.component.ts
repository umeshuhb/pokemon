import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PokemonService } from '../../services/pokemon.service';
import { IPokemonDetail } from '../pokemon.model';

@Component({
    selector: 'app-pokemon-detail',
    templateUrl: './pokemon-detail.component.html',
    styleUrls: ['./pokemon-detail.component.scss']
  })
  export class PokemonDetailComponent implements OnInit, OnDestroy {

    pokemon:IPokemonDetail | null = null;

    subscriptions: Subscription[] = [];
  
    constructor(
      private route: ActivatedRoute,
      private pokemonService: PokemonService) { }
  
    set subscription(subscription: Subscription) {
      this.subscriptions.push(subscription);
    }
  
    ngOnInit(): void {

      this.subscription = this.route.params.subscribe(params => {
        if (this.pokemonService.pokemons.length) {
          this.pokemon = this.pokemonService.pokemons.find(i => i.name === params['name']) || null;
          if (this.pokemon) {
            this.getPokemonEvolution();
            return;
          }
        }
  
        this.subscription = this.pokemonService.getDetail(params['name']).subscribe(response => {
          this.pokemon = response;
          if(this.pokemon){
            this.getPokemonEvolution();
          }
        });
      });
    }
  
    getPokemonEvolution() {
      if (!this.pokemon?.evolutions || !this.pokemon.evolutions.length) {
        if(this.pokemon) { 
          this.pokemon.evolutions = [];
          this.subscription = this.pokemonService.getSpecies(this.pokemon.name).subscribe(response => {
          const id = this.getId(response.evolution_chain.url);
          this.subscription = this.pokemonService.getEvolution(id).subscribe(response => this.getEvolvechains(response.chain));
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
      this.subscriptions.forEach(subscription => subscription ? subscription.unsubscribe() : 0);
    }
  
  }