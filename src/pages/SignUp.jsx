import { useState } from "react"
import api from "../api"
import { useHistory } from "react-router-dom";
import { Box, Button, Container, CssBaseline, TextField, Typography } from "@mui/material";

export default function SignUp() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false);
    const { push } = useHistory();
    const handleSubmit = async (e) =>{
        e.preventDefault()
        const user = {email, password}
        try {
            await api.post('/user', user)
            setError(false)
            push('/')
        } catch (error) {
            setError(true)
        }
    }
    return(
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
                <Typography component="h1" fontWeight={400} fontFamily={"sans-serif"} variant="h2">
                    Criar Conta
                </Typography>
                <Box component="form" sx={{backgroundColor:"#f1f1f4", padding: 4, borderRadius:10}} action="POST" onSubmit={handleSubmit}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="exemplo@gmail.com"
                        name="email"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        autoFocus
                        helperText="E-mail precisa ser válido"
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
                        minRows={6}
                        error={error}
                        helperText="Senha deve conter mais de 5 caracteres"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Criar
                    </Button>
                </Box>
            </Container>
        </Container>
    )
}
