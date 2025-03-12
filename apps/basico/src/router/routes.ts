import { generatePath } from "react-router-dom"

const routes = {
    root: "/",
    github: {
        root: "/github/*",
        children: {
            list: "list",
            detail: "detail/:id"
        }

    },
    rickmorty: {
        root: "/rickmorty/*",
        children: {
            list: "list",
            detail: "detail/:id"
        }

    }
}

export const router = {
    ...routes,
    listGithub: routes.github.root.replace("*","")+routes.github.children.list,
    detailsGithub: (id: string) => generatePath(routes.github.root.replace("*","")+routes.github.children.detail, { id }),
    listRickMorty: routes.rickmorty.root.replace("*","")+routes.rickmorty.children.list,
    detailsRickMorty: (id: string) => generatePath(routes.rickmorty.root.replace("*","")+routes.rickmorty.children.detail, { id })
}