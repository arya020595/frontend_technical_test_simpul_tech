import { useState, useEffect } from "react";
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button'; 

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

const Sidebar = (props) => {
    const classes = useStyles();
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
    const getData = async () => {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users`)
        let data = await response.json();
        setData(data);
        setIsLoading(false)

        console.log(data);
    }
    getData()
    }, [])

    const sendData = (data) => {
        props.sendDataToContent(data);
    };

    if (isLoading) return 'Loading...';
    
    return (
        <>
            <Grid item xs={3} className={classes.borderRight500}>
                <Grid item xs={12} style={{padding: '10px'}}>
                    Friends
                </Grid>
                <Divider />
                <List>
                    {
                        data.map((item) => 
                            item.username == "arya020595" ? null : 
                            <ListItem onClick={() => sendData(item)} component={Button} key={item._id}>
                                <ListItemIcon>
                                    <Avatar alt={item.username} src={item.avatar} />
                                </ListItemIcon>
                                <ListItemText primary={item.username}>{item.username}</ListItemText>
                            </ListItem>
                        )
                    }
                </List>
            </Grid>
        </>
    );
};

export default Sidebar;