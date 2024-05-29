import { useContext, useEffect, useState } from "react"
import api from "../api"
import { Context } from "../contexts/Context";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"
import { Box, Button, Container, CssBaseline, TextField, Typography } from "@mui/material";
import DateInput from "../components/DateInput/DateInput";
import InputSelect from "../components/InputSelect/InputSelect";

export default function UpdateTask() {
    const {id} = useParams();
    const { connectedUser } = useContext(Context);
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [priorityLevel, setPriorityLevel] = useState('')
    const [error, setError] = useState(false);
    const { push } = useHistory();

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const task = {title, description, date, priorityLevel, userId: connectedUser.id}
        try {
            await api.put(`/task/${id}`, task, {
                headers: {
                    "Authorization": connectedUser.token
                }
            })
            setError(false)
            push('/task')
        } catch (error) {
            console.log(error)
            setError(true)
        }
    }

    useEffect(()=>{
        const getTask = async () =>{
            const {data} = await api.get(`/task/${id}`,{
                headers: {
                    "Authorization": connectedUser.token
                }
            })
            console.log(data)
            setTitle(data.title)
            setDescription(data.description)
            setDate(data.date)
            setPriorityLevel(data.priorityLevel)
        }
        getTask()
    },[connectedUser, id])
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
                    Editar Tarefa
                </Typography>
                <Box component="form" sx={{backgroundColor:"#f1f1f4", padding: 4, borderRadius:10}} action="POST" onSubmit={handleSubmit}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        sx={{ borderRadius:10}}
                        id="title"
                        value={title}
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
