import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Header } from "../header/Header";


export function Layout() {


    return <>
        <Header />
        <Container maxWidth="lg">
            <Outlet />
        </Container>
    </>
}