import React from "react"

import { RickMortyCard } from "./rickmorty-card";
import { useDebounce } from "use-debounce";
import { RickMortyContext } from "./rick-morty-context";


interface Location {
    name: string;
    url: string;
}

enum Gender {
    Female = "Female",
    Male = "Male",
    Unknown = "unknown",
}

enum Species {
    Alien = "Alien",
    Human = "Human",
}

enum Status {
    Alive = "Alive",
    Dead = "Dead",
    Unknown = "unknown",
}

export interface Character {
    id: number;
    name: string;
    status: Status;
    species: Species;
    type: string;
    gender: Gender;
    origin: Location;
    location: Location;
    image: string;
    episode: string[];
    url: string;
}

export interface CharacterFilter extends Character {
    filtered: boolean;
}

interface Response {
    results: Character[]
}

export const RickMortyList: React.FC = () => {
    const { filterContext, setFilterContext } = React.useContext(RickMortyContext)
    const [characters, setCharacters] = React.useState<Character[]>([]);
    const [charactersFilter, setCharacterFilter] = React.useState<CharacterFilter[]>([]);
    const [filter, setFilter] = React.useState(filterContext)
    const [value] = useDebounce(filter, 500);

    React.useEffect(() => {
        try {
            fetch(`${process.env.API_RICKMORTY_URL_BASE}/character`).then(data => data.json()).then(json => {
                const { results } = json as Response
                setCharacters(results)
            })
        }
        catch (e) {
            setCharacters([])
        }
    }, []);

    React.useEffect(() => {
        setCharacterFilter(characters.map(c => {
            const filtered = value && (c.name.toLowerCase().includes(value.toLowerCase()) 
            || c.status.toLowerCase().includes(value.toLowerCase()) 
            || c.gender.toLowerCase() === value.toLowerCase())
            return {
                ...c,
                filtered
            }
        }))
    }, [value, characters])

    React.useEffect(() => {
        setFilterContext(value)
    }, [value])



    return <div className="rickmorty-container">
        <div className="form">
            <input type="text" value={filter} onChange={(e) => {
                setFilter(e.target.value)
            }} placeholder="Filter characters by name, status or gender" />
        </div>
        <div className="characters">
            {charactersFilter?.map(character => {
                return <React.Fragment key={character.id}>
                    <RickMortyCard character={character} />
                </React.Fragment>
            })}
        </div>
    </div>
}