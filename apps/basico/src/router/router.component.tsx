import React, { Children } from "react"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"

import { router } from "./routes"
import { MainPage } from "../main"
import { GitHubProvider } from "../github/github-context"
import { MemberDetail, MemberList } from "../github"
import { RickMortyDetail, RickMortyList } from "../rickymorty"
import { AppLayout } from "../layouts/app.layout"
import { RickMortyProvider } from "../rickymorty/rick-morty-context"

export const AppRouter: React.FC = () => {

    return (
        <Router future={{
            v7_relativeSplatPath: true,
            v7_startTransition: true
        }}>
            <Routes>
                <Route path={router.root} element={<MainPage />} />
                <Route path={router.github.root} element={
                    <GitHubProvider>
                        <AppLayout>
                            <Routes>
                                <Route path={router.github.children.list} element={<MemberList />} />
                                <Route path={router.github.children.detail} element={<MemberDetail />} />
                            </Routes>
                        </AppLayout>
                    </GitHubProvider>
                }></Route>
                <Route path={router.rickmorty.root} element={
                    <RickMortyProvider>
                        <AppLayout>
                            <Routes>
                                <Route path={router.rickmorty.children.list} element={<RickMortyList />} />
                                <Route path={router.rickmorty.children.detail} element={<RickMortyDetail />} />
                            </Routes>
                        </AppLayout>
                    </RickMortyProvider>
                }></Route>
            </Routes>
        </Router>
    );
}