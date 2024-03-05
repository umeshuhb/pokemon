import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PokemonModule } from './pokemon/pokemon.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    PokemonModule,
    StoreModule.forRoot([]),
    EffectsModule.forRoot([]),
    !environment.production ? [StoreDevtoolsModule.instrument()] : []
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule { }
