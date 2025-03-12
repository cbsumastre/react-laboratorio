import React from "react";
import { useNavigate } from "react-router-dom";

import { CharacterFilter } from "./rickmorty-list";
import { router } from "../router";



interface Props {
    character: CharacterFilter
}

export const RickMortyCard: React.FC<Props> = (props) => {
    const { character } = props

    const navigate = useNavigate();

    const onNavigateToDetail = (id: string) => navigate(router.detailsRickMorty(id));
    return (
        <div className="character-card" onClick={() => onNavigateToDetail(character.id.toString())}>
            <header>
                <span className="character-name">{character.name}</span>
            </header>
            <img src={character.image}
                alt={character.name}
                className={character.filtered ? "filtered" : ""}
            />
            <footer><span className={`status-${character.status}`}>{character.status} - {character.gender}</span></footer>
        </div>
    )
}