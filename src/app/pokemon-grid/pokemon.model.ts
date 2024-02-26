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
    held_items:[];
    is_default: boolean;
    location_area_encounters: string;
    moves: IPokemonMove[];
    name: string;
    order: number;
    past_abilities: [];
    past_types:[];
    species: IPokemonNameUrl;
    sprites: Tree<IPokemonSprite>;
    stats:IPokemonStat[];
    types: IPokemonType[];
    weight: number;
    evolutions: Array<{id: number; name:string;}>;
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
