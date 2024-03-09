import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { BehaviorSubject, of } from 'rxjs';
import { IPokemonDetail } from '../../pokemon.model';
import { PokemonDetailComponent } from './pokemon-detail.component';
import { selectActivePokemon } from '../../store/pokemon.selectors';
import { getPokemonDetails, getPokemonSpecies } from '../../store/pokemon.actions';
import { mockPokemonDetailObj } from '../../store/mockData';
import '@angular/localize/init';

describe('PokemonDetailComponent', () => {
  let component: PokemonDetailComponent;
  let fixture: ComponentFixture<PokemonDetailComponent>;
  let mockStore: jasmine.SpyObj<Store>;
  let mockActivatedRoute: { params: BehaviorSubject<{ name: string }> };

  const mockPokemon: IPokemonDetail = mockPokemonDetailObj;

  beforeEach(() => {
    mockStore = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    mockActivatedRoute = { params: new BehaviorSubject({ name: 'ivysaur' }) };

    TestBed.configureTestingModule({
      declarations: [PokemonDetailComponent],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
      imports: [StoreModule.forRoot({})],
    });

    fixture = TestBed.createComponent(PokemonDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch getPokemonSpecies action when getPokemonEvolution is called', () => {
    component.pokemon = { ...mockPokemon, evolutions: [] };

    component.getPokemonEvolution();

    expect(mockStore.dispatch).toHaveBeenCalledWith(getPokemonSpecies({ pokemonName: 'ivysaur' }));
  });

  it('should not dispatch getPokemonSpecies action when evolutions are present', () => {
    component.pokemon = { ...mockPokemon, evolutions: [{ id: 2, name: 'ivysaur' }] };

    component.getPokemonEvolution();

    expect(mockStore.dispatch).not.toHaveBeenCalledWith(getPokemonSpecies({ pokemonName: 'ivysaur' }));
  });

  it('should not dispatch getPokemonSpecies action when pokemon is null', () => {
    component.pokemon = null;

    component.getPokemonEvolution();

    expect(mockStore.dispatch).not.toHaveBeenCalledWith(getPokemonSpecies({ pokemonName: 'ivysaur' }));
  });

  it('should unsubscribe on ngOnDestroy', () => {
    spyOn(component.subscription, 'unsubscribe');

    component.ngOnDestroy();

    expect(component.subscription.unsubscribe).toHaveBeenCalled();
  });
});
