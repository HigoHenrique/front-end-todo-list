import { Box, Button, Container, CssBaseline, TextField, Typography } from "@mui/material";
import api from "../api";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useContext, useState } from "react";
import { Context } from "../contexts/Context";
import DateInput from "../components/DateInput/DateInput";
import InputSelect from "../components/InputSelect/InputSelect";

export default function CreateTask() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [priorityLevel, setPriorityLevel] = useState('')
    const { connectedUser } = useContext(Context);
    const [error, setError] = useState(false);
    const { push } = useHistory();

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const task = {title, description, date, priorityLevel}
        try {
            await api.post('/task', task, {
                headers: {
                    "Authorization": connectedUser.token
                }
            })
            setError(false)
            push('/task')
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
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" fontWeight={400} fontFamily={"sans-serif"} variant="h2">
                    Criar Tarefa
                </Typography>
                <Box component="form" sx={{backgroundColor:"#f1f1f4", padding: 4, borderRadius:10}} action="POST" onSubmit={handleSubmit}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="Título"
                        type="text"
                        helperText="Descrição deve conter mais de 1 caracteres"
                        onChange={(e) => setTitle(e.target.value)}
                        autoFocus
                        error={error}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Descrição"
                        name="description"
                        value={description}
                        type="text"
                        minRows={6}
                        error={error}
                        helperText="Descrição deve conter mais de 9 caracteres"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <DateInput date={date} setDate={setDate}/>
                    <InputSelect priorityLevel={priorityLevel} setPriorityLevel={setPriorityLevel}/>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, fontWeight:600 }}
                    >
                        Criar Tarefa
                    </Button>
                </Box>
            </Container>
        </Container>
    )
}