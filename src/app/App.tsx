import {Menu} from '@mui/icons-material'
import {AppBar, Button, CircularProgress, Container, IconButton, LinearProgress, Toolbar} from '@mui/material';
import {selectAppStatus, selectIsInitialized} from 'app/app.selectors';
import {ErrorSnackbar} from 'common/components'
import {useActions} from 'common/hooks';
import {useAppSelector} from "common/hooks/useAppSelector";
import {selectIsLoggedIn} from 'features/auth/auth.selectors';
import {authThunks} from 'features/auth/auth.slice';
import {Login} from 'features/auth/Login/Login'
import {TodolistsList} from 'features/TodolistsList/TodolistsList'
import React, {useEffect} from 'react'
import {HashRouter, Route, Routes} from 'react-router-dom'

function App() {
    const status = useAppSelector(selectAppStatus)
    const isInitialized = useAppSelector(selectIsInitialized)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const {initializeApp, logout} = useActions(authThunks)

    useEffect(() => {
        initializeApp({})
    }, [])

    const logoutHandler = () => logout({})

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <HashRouter>
            <div className="App">
                <ErrorSnackbar/>
                <AppBar position="static">
                    <Toolbar style={{justifyContent: 'space-between'}}>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                    <Routes>
                        <Route path={'/'} element={<TodolistsList/>}/>
                        <Route path={'/login'} element={<Login/>}/>
                    </Routes>
                </Container>
            </div>
        </HashRouter>
    )
}

export default App