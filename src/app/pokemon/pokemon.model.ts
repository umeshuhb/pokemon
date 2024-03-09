type Tree<T> = {
    [key: string]: T | Tree<T> | undefined | any
}

export interface IPokemonGrid{
    count: number;
    next: string; //url
    previous: string | null; //url
    results: IPokemonNameUrl[],
}

export interface IPokemonNameUrl{
    name: string;
    url: string;
}

export interface IPokemonDetail{
    id: number;
    abilities: any[];
    base_experience: number;
    cries:{
        latest: string;
        legacy: string;
    };
    forms: IPokemonNameUrl[];
    game_indices: IPokemonGameIndice[];
    height: number;
    held_items: IPokemonHeldItem[];
    is_default: boolean;
    location_area_encounters: string;
    moves: IPokemonMove[];
    name: string;
    order: number;
    past_abilities: any[];
    past_types: IPokemonType[];
    species: IPokemonNameUrl;
    sprites: Tree<IPokemonSprite>;
    stats:IPokemonStat[];
    types: IPokemonType[];
    weight: number;
    evolutions: Array<{id: number; name:string;}>;
}

export interface IPokemonHeldItem
{
    rarity: number,
    version: IPokemonNameUrl
}

export interface IPokemonSprite{
    //need to define yet
}

export interface IPokemonMove{
    move: IPokemonNameUrl;
    version_group_details: IPokemonVersionGroupDetails[];
}

export interface IPokemonBaseState{
    effort: number;
    stat: IPokemonNameUrl;
}

export interface IPokemonStat extends IPokemonBaseState{
    base_stat: number;
}

export interface IPokemonType{
    slot: number;
    type: IPokemonNameUrl
}

export interface IPokemonVersionGroupDetails{
    level_learned_at: number;
    move_learn_method: IPokemonNameUrl;
    version_group: IPokemonNameUrl; 
}

export interface IPokemonGameIndice{
    game_index: number;
    version: IPokemonNameUrl;
}

export interface IPokemonAbilities {
    ability: IPokemonNameUrl;
    is_hidden: boolean;
    slot: number;
}

interface EvolutionDetails {
    gender: string |null;
    held_item: string | null;
    item: {
        name: string;
        url: string;
    } | null;
    known_move: string | null;
    known_move_type: string | null;
    location: string | null;
    min_affection: string | null;
    min_beauty: string | null;
    min_happiness: string | null;
    min_level: number | null;
    needs_overworld_rain: boolean;
    party_species: string | null;
    party_type: string | null;
    relative_physical_stats: string | null;
    time_of_day: string;
    trade_species: string | null;
    trigger: {
        name: string;
        url: string;
    };
    turn_upside_down: boolean;
}

interface EvolutionChain {
    evolution_details: EvolutionDetails[];
    evolves_to: EvolutionChain[];
    is_baby: boolean;
    species: {
        name: string;
        url: string;
    };
}

export interface IPokemonEvolutionResponse {
    baby_trigger_item: string | null;
    chain: EvolutionChain;
    id: number;
}