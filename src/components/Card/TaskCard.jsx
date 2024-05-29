import { Button, Card, CardActions, CardContent, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Dialog } from '@mui/material';
import { useContext, useState } from "react";
import api from "../../api";
import { Context } from "../../contexts/Context";
import { useHistory } from "react-router-dom";


// eslint-disable-next-line react/prop-types
export default function TaskCard({ id, title, description, date, priorityLevel, isCompleted }) {
  const [open, setOpen] = useState(false);
  const { connectedUser } = useContext(Context);
  const { replace } = useHistory();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const priorityColor = {
    alta: "red",
    media: "yellow",
    baixa: "green",
  }

  const deleteTask = async (e) =>{
      e.preventDefault()
      try {
          await api.delete(`/task/${id}`, {
              headers: {
                  "Authorization": connectedUser.token
              }
          })
          setOpen(false)
          replace("/task")
      } catch (error) {
        alert(error)
      }
  }
  const completeTask = async (e) =>{
    e.preventDefault()
    try {
        await api.patchForm(`/task/${id}`,connectedUser.token,{
            headers: {
                "Authorization": connectedUser.token
            }
        })
        console.log(id)
        setOpen(false)
        replace("/task")
    } catch (error) {
      alert(error)
    }
}

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
    <Card sx={{p:2, m: 2, color:"#1f2b5c", minWidth: 400, typography:{ ":hover":{backgroundColor:"Highlight"}, justifyContent:"center", gap:2, border:"#aaa", borderRadius: 20}, fontFamily:"sans-serif", background: isCompleted ? "#9b9fb0" : "#d4d6dd" }}>
      <CardContent sx={{padding:5}}>
        <Typography textAlign={"center"} fontSize={40} fontWeight={700} gutterBottom variant="h3" component="div">
          {title}
        </Typography>
        <Typography variant="h5" fontWeight={700} fontFamily={"sans-serif"} textAlign={"center"} color="text.secondary">
           Descrição: {description}
        </Typography>
        <Typography variant="body1" fontWeight={600} color="text.secondary">
            Data: {date}
        </Typography>
        <Typography variant="body1" fontWeight={700} color={priorityColor[priorityLevel]}>
          Prioridade: {priorityLevel}
        </Typography>
        <Typography variant="body1" fontWeight={700} color="text.secondary">
          Status: {isCompleted ? "Finalizada" : "Pendente"}
        </Typography>
      </CardContent>
      <CardActions sx={{ padding: 2,justifyContent:"center"}}>
        <Link to={`task/updated/${id}`}>
          <Button variant="contained" color="warning" size="small">Editar</Button>
        </Link>
          <Button variant="contained" color="error" onClick={handleClickOpen} size="small">Excluir</Button>
          <Button variant="contained" color="info" onClick={completeTask} size="small">Concluir</Button>
          
      </CardActions>
    </Card>
    <Dialog 
      open={open} 
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">
          {"Você deseja realmente excluir essa tarefa ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Após excluir a tarefa não será possível recuperar novamente
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={deleteTask} autoFocus>
            Apagar
          </Button>
        </DialogActions>
    </Dialog>
    </>
  )
}