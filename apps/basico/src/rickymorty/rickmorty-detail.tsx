import React from "react";
import { Character } from "./rickmorty-list";
import { Link, useParams } from "react-router-dom";
import { router } from "../router";


interface Episode {
    id: number;
    name: string;
    episode: string;
}

export const RickMortyDetail: React.FC = () => {
    const { id } = useParams();
    const [character, setCharacter] = React.useState<Character>(undefined)
    const [firstSeenIn, setFirstSeenIn] = React.useState("")

    React.useEffect(() => {
        setCharacter(undefined)
        try {
            fetch(`${process.env.API_RICKMORTY_URL_BASE}/character/${id}`).then(data => data.json()).then(json => {
                setCharacter(json)
            })
        }
        catch (e) {
            console.error("Error", e)
        }
    }, [id]);

    React.useEffect(() => {
        setFirstSeenIn(undefined)
        try {
            if (character) {
                const firstEpisode = character.episode[0]
                if (firstEpisode) {
                    fetch(firstEpisode).then(data => data.json()).then(json => {
                        const episode = json as Episode
                        if (episode) {
                            setFirstSeenIn(episode.name + " (" + episode.episode + ")")
                        }
                    })
                }
            }
        }
        catch (e) {
            console.error("Error", e)
        }
    }, [character])


    return (
        <div className="character-detail">
            {character && <>
                <header>
                    <span className="character-name">{character.name}</span>
                </header>
                <img src={character.image}
                    alt={character.name}
                />
                <div className="last-location">
                    <span className="text-gray">Last known location:</span>
                    <span>{character.location.name}</span>
                </div>
                {firstSeenIn &&
                    <div className="first-seen">
                        <span className="text-gray">First seen in:</span>
                        <span>{firstSeenIn}</span>
                    </div>
                }

                <footer>
                    <span className="text-gray">Status:</span>
                    <span className={`status-${character.status}`}>{character.status} - {character.gender}</span>
                </footer>
                <Link to={router.listRickMorty}>Volver a Rick y Morty</Link>
            </>}
        </div>
    )
}