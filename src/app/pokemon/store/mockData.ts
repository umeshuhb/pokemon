export const mockPokemonGridObj = {
    count: 1,
    next: "https://www.google.com",
    previous: '',
    results: [{
        name: "ivysaur",
        url: "https://pokeapi.co/api/v2/pokemon-form/2/"
    }],
};

export const mockPokemonDetailObj = {
    name: "ivysaur",
    order: 2,
    abilities: [
        {
            "ability": {
                "name": "overgrow",
                "url": "https://pokeapi.co/api/v2/ability/65/"
            },
            "is_hidden": false,
            "slot": 1
        }       
    ],
    base_experience: 142,
    cries: {
        "latest": "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/2.ogg",
        "legacy": "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/legacy/2.ogg"
    },
    forms: [
        {
            "name": "ivysaur",
            "url": "https://pokeapi.co/api/v2/pokemon-form/2/"
        }
    ],
    game_indices: [
        {
            "game_index": 9,
            "version": {
                "name": "red",
                "url": "https://pokeapi.co/api/v2/version/1/"
            }
        },        {
            "game_index": 2,
            "version": {
                "name": "firered",
                "url": "https://pokeapi.co/api/v2/version/10/"
            }
        }     
    ],
    height: 10,
    held_items: [{
      "rarity": 5,
      "version": {
          "name": "ultra-moon",
          "url": "https://pokeapi.co/api/v2/version/30/"
      }
    }],
    id: 2,
    is_default: true,
    location_area_encounters: "https://pokeapi.co/api/v2/pokemon/2/encounters",
    moves:[
        {
            "move": {
                "name": "rage",
                "url": "https://pokeapi.co/api/v2/move/99/"
            },
            "version_group_details": [
                {
                    "level_learned_at": 0,
                    "move_learn_method": {
                        "name": "machine",
                        "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                    },
                    "version_group": {
                        "name": "red-blue",
                        "url": "https://pokeapi.co/api/v2/version-group/1/"
                    }
                },
                {
                    "level_learned_at": 0,
                    "move_learn_method": {
                        "name": "machine",
                        "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                    },
                    "version_group": {
                        "name": "yellow",
                        "url": "https://pokeapi.co/api/v2/version-group/2/"
                    }
                }
            ]
        }
    ],
   
    past_abilities: [],
    past_types: [],
    species: {
        "name": "ivysaur",
        "url": "https://pokeapi.co/api/v2/pokemon-species/2/"
    },
    sprites:{},
    stats: [
        {
            "base_stat": 60,
            "effort": 0,
            "stat": {
                "name": "hp",
                "url": "https://pokeapi.co/api/v2/stat/1/"
            }
        }
    ],
    types: [
        {
            "slot": 1,
            "type": {
                "name": "grass",
                "url": "https://pokeapi.co/api/v2/type/12/"
            }
        },
        {
            "slot": 2,
            "type": {
                "name": "poison",
                "url": "https://pokeapi.co/api/v2/type/4/"
            }
        }
    ],
    weight: 130,
    evolutions:[{ id: 2, name: "ivysaur"}]
  };

  export const mockEvolutionDetail  = {
    baby_trigger_item: null,
    chain: {
        "evolution_details": [],
        "evolves_to": [
            {
                "evolution_details": [
                    {
                        "gender": null,
                        "held_item": null,
                        "item": null,
                        "known_move": null,
                        "known_move_type": null,
                        "location": null,
                        "min_affection": null,
                        "min_beauty": null,
                        "min_happiness": null,
                        "min_level": 16,
                        "needs_overworld_rain": false,
                        "party_species": null,
                        "party_type": null,
                        "relative_physical_stats": null,
                        "time_of_day": "",
                        "trade_species": null,
                        "trigger": {
                            "name": "level-up",
                            "url": "https://pokeapi.co/api/v2/evolution-trigger/1/"
                        },
                        "turn_upside_down": false
                    }
                ],
                "evolves_to": [
                    {
                        "evolution_details": [
                            {
                                "gender": null,
                                "held_item": null,
                                "item": null,
                                "known_move": null,
                                "known_move_type": null,
                                "location": null,
                                "min_affection": null,
                                "min_beauty": null,
                                "min_happiness": null,
                                "min_level": 36,
                                "needs_overworld_rain": false,
                                "party_species": null,
                                "party_type": null,
                                "relative_physical_stats": null,
                                "time_of_day": "",
                                "trade_species": null,
                                "trigger": {
                                    "name": "level-up",
                                    "url": "https://pokeapi.co/api/v2/evolution-trigger/1/"
                                },
                                "turn_upside_down": false
                            }
                        ],
                        "evolves_to": [],
                        "is_baby": false,
                        "species": {
                            "name": "charizard",
                            "url": "https://pokeapi.co/api/v2/pokemon-species/6/"
                        }
                    }
                ],
                "is_baby": false,
                "species": {
                    "name": "charmeleon",
                    "url": "https://pokeapi.co/api/v2/pokemon-species/5/"
                }
            }
        ],
        "is_baby": false,
        "species": {
            "name": "charmander",
            "url": "https://pokeapi.co/api/v2/pokemon-species/4/"
        }
    },
    id: 2
};

export const mockPokemonSpecie = {
        "base_happiness": 70,
        "capture_rate": 45,
        "color": {
            "name": "yellow",
            "url": "https://pokeapi.co/api/v2/pokemon-color/10/"
        },
        "egg_groups": [
            {
                "name": "bug",
                "url": "https://pokeapi.co/api/v2/egg-group/3/"
            }
        ],
        "evolution_chain": {
            "url": "https://pokeapi.co/api/v2/evolution-chain/5/"
        },
        "evolves_from_species": {
            "name": "kakuna",
            "url": "https://pokeapi.co/api/v2/pokemon-species/14/"
        },
        "flavor_text_entries": [
            {
                "flavor_text": "It has three poisonous stingers on its forelegs and\nits tail. They are used to jab its enemy repeatedly.",
                "language": {
                    "name": "en",
                    "url": "https://pokeapi.co/api/v2/language/9/"
                },
                "version": {
                    "name": "x",
                    "url": "https://pokeapi.co/api/v2/version/23/"
                }
            }],

        "form_descriptions": [],
        "forms_switchable": true,
        "gender_rate": 4,
        "genera": [
            {
                "genus": "どくばちポケモン",
                "language": {
                    "name": "ja-Hrkt",
                    "url": "https://pokeapi.co/api/v2/language/1/"
                }
            }],

        "generation": {
            "name": "generation-i",
            "url": "https://pokeapi.co/api/v2/generation/1/"
        },
        "growth_rate": {
            "name": "medium",
            "url": "https://pokeapi.co/api/v2/growth-rate/2/"
        },
        "habitat": {
            "name": "forest",
            "url": "https://pokeapi.co/api/v2/pokemon-habitat/2/"
        },
        "has_gender_differences": false,
        "hatch_counter": 15,
        "id": 15,
        "is_baby": false,
        "is_legendary": false,
        "is_mythical": false,
        "name": "beedrill",
        "names": [
            {
                "language": {
                    "name": "ja-Hrkt",
                    "url": "https://pokeapi.co/api/v2/language/1/"
                },
                "name": "スピアー"
            }],

        "order": 15,
        "pal_park_encounters": [
            {
            "area": {
                "name": "forest",
                "url": "https://pokeapi.co/api/v2/pal-park-area/1/"
            },
            "base_score": 70,
            "rate": 20
            }
        ],
        "pokedex_numbers": [
            {
            "entry_number": 15,
            "pokedex": {
                "name": "national",
                "url": "https://pokeapi.co/api/v2/pokedex/1/"
            }
            }],

        "shape": {
            "name": "bug-wings",
            "url": "https://pokeapi.co/api/v2/pokemon-shape/13/"
        },
        "varieties": [
            {
                "is_default": true,
                "pokemon": {
                    "name": "beedrill",
                    "url": "https://pokeapi.co/api/v2/pokemon/15/"
                }
            },
            {
                "is_default": false,
                "pokemon": {
                    "name": "beedrill-mega",
                    "url": "https://pokeapi.co/api/v2/pokemon/10090/"
                }
            }
        ]
}