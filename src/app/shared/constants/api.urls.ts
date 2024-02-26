import { environment } from "src/environments/environment";

export const ApiConstants = {
    FETCH_POKEMON_GRID:() =>
    `${environment.API_URL}/v2/pokemon`,

    FETCH_POKEMON_ITEM:(id:number) =>
    `${environment.API_URL}/v2/pokemon/${id}`,

    FETCH_POKEMON_EVOLUTION_CHAIN:(id:number) =>
    `${environment.API_URL}/v2/evolution-chain/${id}`,

    FETCH_POKEMON_SPECIES:(name:string) =>
    `${environment.API_URL}/v2/pokemon-species/${name}`
};