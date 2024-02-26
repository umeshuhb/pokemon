import { Component, Input} from '@angular/core';

@Component({
    selector: 'app-pokemon-evolution',
    templateUrl: './pokemon-evolution.component.html',
    styleUrls: ['./pokemon-evolution.component.scss']
  })
  export class PokemonEvolutionComponent {

    @Input() evolutions!:any;
    @Input() name!:string;
    
  }