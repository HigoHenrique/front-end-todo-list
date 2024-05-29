import { useContext, useState } from "react"
import api from "../api"
import { useHistory, Link } from "react-router-dom";
import { Context } from "../contexts/Context";
import { Box, Button, Container, CssBaseline, TextField, Typography } from "@mui/material";

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false);
    const { push } = useHistory();
    const { setConnectedUser } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = { email, password }
        try {
            const { data } = await api.post('/login', user)
            setConnectedUser(data)
            setError(false)
            push("/task")
        } catch (error) {
            setError(true)
            alert("Email e/ou senha inválido")
        }
    }
    return (
        <Container maxWidth="md">
            <CssBaseline/>
            <Container
                sx={{
                    marginTop: 15,
                    display: 'flex',
                    padding: 5,
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" fontWeight={700} sx={{paddingBottom: 3}} fontFamily={"sans-serif"} variant="h2">
                    Minha lista de Tarefas
                </Typography>
                <Box component="form" sx={{backgroundColor:"#f1f1f4", padding: 4, borderRadius:10}} onSubmit={handleSubmit}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="E-mail"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        autoFocus
                        error={error}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Senha"
                        name="password"
                        value={password}
                        type="password"
                        autoComplete="password"
                        error={error}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Entrar
                    </Button>
                    <Link to="/signup" variant="body2">
                        {"Não tem conta ainda ? Faça já sua conta aqui!"}
                    </Link>
                </Box>
            </Container>
        </Container>
    )

}
