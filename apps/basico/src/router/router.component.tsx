import React from "react"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"

import { router } from "./routes"
import { MainPage } from "../main"
import { GitHubProvider } from "../github/github-context"
import { MemberDetail, MemberList } from "../github"

export const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path={router.root} element={<MainPage />} />
                <Route path="*" element={
                    <GitHubProvider>
                        <Routes>
                            <Route path={router.github.list} element={<MemberList />} />
                            <Route path={router.github.detail} element={<MemberDetail />} />
                        </Routes>
                    </GitHubProvider>} />
            </Routes>
        </Router>
    );
}