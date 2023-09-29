import { useState } from 'react'
import './App.css'
import MainContent from "./MainContent";
import Sidebar from "./Sidebar";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function App() {
  const [dataUser, setDataUser] = useState(null);

  const receiveDataFromSidebar = (user) => {
    setDataUser(user);
  };

  return (
    <Container fixed>
      <Grid container>
          <Grid item xs={12}>
              <Typography variant="h5" className="header-message">Chat</Typography>
          </Grid>
      </Grid>
      <Grid container style={{width: '800px'}} component={Paper}>
        <Sidebar sendDataToContent={receiveDataFromSidebar} />
        <MainContent contentData={dataUser} />
      </Grid>
    </Container>
  )
}

export default App
