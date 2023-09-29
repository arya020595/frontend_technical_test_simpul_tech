import { useState, useEffect } from "react";
import { makeStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send'
import Button from '@mui/material/Button'; 
import Container from '@mui/material/Container';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '80vh'
  },
  headBG: {
      backgroundColor: '#e0e0e0'
  },
  borderRight500: {
      borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
  }
});

const Chat = () => {
    const classes = useStyles();

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
    const getData = async () => {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users`)
        let data = await response.json();
        setData(data);
        setIsLoading(false)
    }

    getData()
    }, [])

  return (
    <Container fixed>
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="h5" className="header-message">Chat</Typography>
            </Grid>
        </Grid>
        <Grid container style={{width: '800px'}} component={Paper}>
            <Grid item xs={3} className={classes.borderRight500}>
                <Grid item xs={12} style={{padding: '10px'}}>
                    Friends
                </Grid>
                <Divider />
                <List>
                    {
                        data.map((item) => 
                            item.username == "arya020595" ? null : 
                            <>
                                <ListItem component={Button} key={item._id}>
                                    <ListItemIcon>
                                        <Avatar alt={item.username} src="https://material-ui.com/static/images/avatar/1.jpg" />
                                    </ListItemIcon>
                                    <ListItemText primary={item.username}>{item.username}</ListItemText>
                                </ListItem>
                            </>
                        )
                    }
                </List>
            </Grid>
            <Grid item xs={9}>
                <List className={classes.messageArea}>
                    <ListItem key="1">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="right" secondary="09:30"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem key="2">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="left" primary="Hey, Iam Good! What about you ?"></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="left" secondary="09:31"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem key="3">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="right" secondary="10:30"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                </List>
                <Divider />
                <Grid container spacing={2} style={{padding: '20px'}}>
                    <Grid item xs={10}>
                        <TextField id="outlined-basic-email" label="Type Something" fullWidth />
                    </Grid>
                    <Grid item xs={1} align="right">
                        <Fab color="primary" aria-label="add"><SendIcon /></Fab>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
      </Container>
  );
}

export default Chat;