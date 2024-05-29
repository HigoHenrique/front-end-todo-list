import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../../contexts/Context';


export default function Navbar() {
    const { setConnectedUser } = useContext(Context);
    const { push } = useHistory();
    const pages = {
        task: "/task",
        create: "/task/create",
    }
    const logout = () => {
        setConnectedUser({})
        push('/')
        console.log('to aqui')
    }
    return (
        <Container>
        <AppBar sx={{ justifyContent: 'center', alignItems: "center", textAlign: 'center', alignContent:'center'}}>
                <Toolbar>
                    <Typography
                        variant="h4"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        ToDoList
                    </Typography>
                    <Toolbar>
                        <Button
                            href={pages.task}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Home
                        </Button>
                        <Button
                            href={pages.create}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Criar Tarefa
                        </Button>
                        <Button
                            onClick={logout}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Sair
                        </Button>
                    </Toolbar>
                </Toolbar>
        </AppBar>
        </Container>
    );
}