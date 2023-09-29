import { useState, useEffect, useRef } from "react"
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import Pusher from 'pusher-js'
import SendIcon from '@mui/icons-material/Send'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { formatDistanceToNow } from 'date-fns';

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

const MainContent = (props) => {
  const [dataMessage, setDataMessage] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [inputData, setInputData] = useState('')
  const [dataConversation, setdataConversation] = useState({})
  const containerRef = useRef(null)
  const classes = useStyles();

  useEffect(() => {
    console.log(props.contentData);

    const getData = async () => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          {
            "user_id_sender": "6516d503c1150036db00e717",
            "user_id_recipient": props.contentData._id
          }
        )
      }
      
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/conversations`, requestOptions)
      let data = await response.json()
      setDataMessage(data.messages)
      setdataConversation(data.conversation)
      setIsLoading(false)      
    }

    if (props.contentData !== null) {
      getData()
    } else {
      setIsLoading(false)
    }

    const pusher = new Pusher('40c419ade346e9cb8ff3', {
      cluster: 'ap1',
      encrypted: true,
    })
  
    const channel = pusher.subscribe('chat')
  
    channel.bind('new-message', (data) => {
      setDataMessage((prevMessages) => [...prevMessages, data])
    })
  
    return () => {
      channel.unbind()
      pusher.unsubscribe('chat')
    }

  }, [props])

  const submitMessage = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          "conversation_id": dataConversation._id, 
          "user_id": "6516d503c1150036db00e717",
          "body": inputData
        }
      )
    }

    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/messages`, requestOptions)
    let data = await response.json()
    // setDataMessage((prevMessages) => [...prevMessages, data])
    // scrollToBottom()
    // Clear input
    setInputData('')
  }

  const handleInputChange = (e) => {
    setInputData(e.target.value)
  }

  const dateTime = (created_at) => {
    const dateString = created_at;
    const date = new Date(dateString);

    // Define the desired date format (e.g., "yyyy-MM-dd HH:mm:ss")
    const dateFormat = "yyyy-MMM-dd HH:mm";

    // Format the date using date-fns
    return `${formatDistanceToNow(date)} ago`;
  }

  if (isLoading) return 'Loading...'

  return (
    <>
      {
        props.contentData == null ? (
          <Grid item xs={9} style={{alignSelf: 'center'}}>
            <p>Select your friend to start conversations</p>
          </Grid>
        ) : 
        (
          <Grid item xs={9}>
            <List className={classes.messageArea}>
              {
                dataMessage.map((item) => 
                <ListItem key={item._id}>
                    <Grid container>
                        <Grid item xs={12}>
                            <ListItemText align={item.username == 'arya020595' ? 'right' : 'left'} primary={item.body}></ListItemText>
                        </Grid>
                        <Grid item xs={12}>
                            <ListItemText align={item.username == 'arya020595' ? 'right' : 'left'} secondary={dateTime(item.created_at)}></ListItemText>
                        </Grid>
                    </Grid>
                </ListItem>
                )
              }
                
            </List>
            <Divider />
            <Grid container spacing={2} style={{padding: '20px'}}>
                <Grid item xs={10}>
                    <TextField value={inputData} onChange={handleInputChange} id="outlined-basic-email" label="Type Something" fullWidth />
                </Grid>
                <Grid item xs={1} align="right">
                    <Fab onClick={submitMessage} color="primary" aria-label="add"><SendIcon /></Fab>
                </Grid>
            </Grid>
          </Grid>
        )
      }
    </>
    
  )
}

export default MainContent