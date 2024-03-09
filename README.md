# PokemonApp
This project was generated with Angular CLI version 15.0.3.

# Folder structure
<pre>
├───app
│   ├───pokemon
│   │   ├───components
│   │   │   ├───pokemon-detail
│   │   │   ├───pokemon-evolution
│   │   │   └───pokemon-grid
│   │   └───store
│   ├───services
│   └───shared
│       ├───components
│       │   └───tabs
│       │       └───tab-item
│       ├───constants
│       └───models
├───assets
├───environments
└───locale
</pre>
## In above project structure - 
1. App will contain App.component, App.modules, App.routing files
2. Inside Pokemom folder - 2.1. Pokemone module file, Pokemon routing module file, and interface file are kept at outer level
  2.2 - Components folder - all the components respective to their functinalities are divide in further folders
  2.3 - Store containing the ngRx dependant files like Effects, Store, Selector, Actions file 
3. Services - is containing pokemon.service file defining all the Http calls
4. Shared - is containg all the shared components required in the project, constant file directory and interface for general purpose
5. Assets - conatins .svg file used in project 
6. Environments - is containg environment files
7. locale contains .xlf files for supported locale files for i18n
    


## Development server
Run ng serve for a dev server. Navigate to http://localhost:4200/. The application will automatically reload if you change any of the source files.

## Code scaffolding
Run ng generate component component-name to generate a new component. You can also use `ng generate` directive|pipe|service|class|guard|interface|enum|module.

## Run development server with specific language
ng serve --configuration fr

ng serve --configuration hi 

## Run Test case

`ng test --code-coverage`

## Build
Run `ng build` to build the project. The build artifacts will be stored in the dist/ directory.

## Further help
To get more help on the Angular CLI use ng help or go check out the Angular CLI Overview and Command Reference page.

## Developer API
You can find all the information necessary to complete the exercise
consulting the following website: https://pokeapi.co/
