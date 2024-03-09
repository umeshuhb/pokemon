import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { PokemonGridComponent } from './pokemon.component';
import { loadPoekomnList } from '../../store/pokemon.actions';
import { selectPokemonlistData, selectPokemonlistDataLoading } from '../../store/pokemon.selectors';
import { PokemonService } from '../../../services/pokemon.service';
import { IPokemonDetail } from '../../pokemon.model';

describe('PokemonGridComponent', () => {
  let component: PokemonGridComponent;
  let fixture: ComponentFixture<PokemonGridComponent>;
  let mockStore: jasmine.SpyObj<Store>;
  let mockPokemonService: jasmine.SpyObj<PokemonService>;

  const mockPokemonList: IPokemonDetail[] = [
    // Mock your Pokemon data here
  ];

  beforeEach(() => {
    mockStore = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    mockPokemonService = jasmine.createSpyObj('PokemonService', ['fetchMoreData']);

    TestBed.configureTestingModule({
      declarations: [PokemonGridComponent],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: PokemonService, useValue: mockPokemonService },
      ],
    });

    fixture = TestBed.createComponent(PokemonGridComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch more data when calling fetchMoreData', () => {
    component.fetchMoreData();

    expect(mockStore.dispatch).toHaveBeenCalledWith(loadPoekomnList());
  });

  it('should unsubscribe from subscriptions when destroyed', () => {
    spyOn(component.subscription, 'unsubscribe');
    component.ngOnDestroy();

    expect(component.subscription.unsubscribe).toHaveBeenCalled();
  });
});
