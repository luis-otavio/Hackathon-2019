import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import { CircularProgress } from '@material-ui/core';
import axios from 'axios'
import logo from './LOGO_sem fundo.png'
import { Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    color:'white',
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  logo: {
    width: '300px',
    /* text-align: center; */
    margin: '0 auto',
    display: 'flex',
    marginTop: '30px',
    marginBottom: '30px'
  },
  button: {
    backgroundColor: '#39D6D6',
    color: '#fafafa',
    margin: '0 auto',
    display: 'flex',
    width: '75%',
    fontSize: 18,
    fontWeight: 'bold',
    boxShadow: '0 3px 5px 2px rgba(126, 167, 169)',
  },
  tipografiaPerguntas: {
    textAlign: 'center',
    marginTop: '30px'
  },
  link: {
    color: '#39D6D6',
  },
  loadingColor: {
		color: '#39D6D6',
  },
  loading: {
    position: 'absolute', 
    left: '50%', 
    top: '50%',
    transform: 'translate(-50%, -50%)'
  },
}));

export default function AlignItemsList() {
  
  const classes = useStyles();
  const [perguntas, setPerguntas] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    buscaPerguntas().then(setPerguntas)
  }, []);

  const buscaPerguntas = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get('http://localhost:3333/pergunta');
      return data;
  } catch (error) {
      console.error(error);    
  } finally {
    setLoading(false);
  }
}

  if (loading) {
    return (
      <div className={classes.loading}>
        <CircularProgress className={classes.loadingColor}/>
        <br />
        Carregando...
      </div>
    )
  }

  return (
    <div>

      <img alt="logo" className={classes.logo} src={logo} />

      <Button href={'/perguntas/perguntas'} variant="contained" className={classes.button}>
        Adicionar pergunta
      </Button>

      <Typography className={classes.tipografiaPerguntas} variant="h6" component="h6">
        Perguntas
      </Typography>

      {perguntas.map((pergunta) => 
      <div key={pergunta.id}>
      <Grid item xs={12} sm={6} md={3}>
        <List className={classes.root}>
          <ListItem alignItems="flex-start">
          <Link href={'/respostas/respostas/'+pergunta.id} className={classes.link}>
            <ListItemText 
              className={classes.title} primary={pergunta.titulo}
              secondary={pergunta.descricao}
            />
          </Link>
          </ListItem>
          <Divider variant="inset" component="li" />
        </List>
      </Grid>
      </div>
      )}
  </div>
)
}