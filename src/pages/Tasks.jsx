import { useContext, useEffect, useState } from "react"
import api from "../api"
import { Context } from "../contexts/Context";
import TaskCard from "../components/Card/TaskCard";
import { Container, Typography } from "@mui/material";

export default function Tasks() {
    const [tasks, setTasks] = useState([])
    const { connectedUser } = useContext(Context);
    useEffect(()=>{
        const getTasks = async () =>{
            const {data} = await api.get('/task',{
                headers: {
                    "Authorization": connectedUser.token
                }
            })
            setTasks(data)
        }
        getTasks()
    },[connectedUser])
    return(
        <Container sx={{display:"flex", flexDirection:'column', justifyContent: 'center', margin:0, alignContent:'center'}}>
            <Typography sx={{textAlign:"center",fontFamily:"sans-serif", font:"menu", fontSize:50, fontWeight:700, padding:15, justifyContent:"center"}}>
                Lista De Tarefas
            </Typography>
        <Container sx={{display: "grid", gridTemplateColumns:"auto auto auto", justifyContent:'center' }}>
            {tasks.map((task) =>(
                <TaskCard
                    key={task.id}
                    id={task.id} 
                    title={task.title}
                    description={task.description} 
                    date={task.date}
                    priorityLevel={task.priorityLevel}
                    isCompleted={task.isCompleted}
                />
            ))}
        </Container>
        </Container>
    )
}
