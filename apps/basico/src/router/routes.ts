import { generatePath } from "react-router-dom"

const routes = {
    root: "/",
    github: {
        list: "/github/list",
        detail: "/github/detail/:id"
    }
}

export const router = {
    ...routes,
    detailsGithub: (id: string) => generatePath(routes.github.detail, { id })
}