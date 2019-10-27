import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CheckIcon from '@material-ui/icons/Check';
import Fab from '@material-ui/core/Fab';
import { CircularProgress } from '@material-ui/core';
import axios from 'axios'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
      '& label.Mui-focused': {
        color: '#555555 ',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#39D6D6',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'black',
        },
      '&.Mui-focused fieldset': {
        borderColor: '#39D6D6',
      },
 },
		},
    textField: {
      marginTop: theme.spacing(1),
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      width: 370,
      '&$cssFocused': {
      	color: '#39D6D6',
		},
	  },
    textFieldTitle: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      width: 370,
	  },
    button: {
      backgroundColor: '#39D6D6',
      margin: theme.spacing(1),
      marginTop: theme.spacing(2),
    },
    btnPerg: {
      justifyContent: 'flex-end',
      display: 'flex',
      marginRight: 20,
	  },
    appBar: {
		  backgroundColor: '#39D6D6',
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
	})
);

export default function Perguntas() {
  const [pergunta, setPergunta] = useState({titulo: '', descricao: ''});
  const [loading, setLoading] = useState(false);

	const classes = useStyles();

  const save = async pergunta => {
    setLoading(true)
    try {
      const response = await axios.post('http://localhost:3333/pergunta', pergunta)
    } catch(error){
      console.error(error)
    } finally {
      setLoading(false)
    }
  };

  if (loading) {
    return (
      <div className={classes.loading}>
        <CircularProgress className={classes.loadingColor}/>
        <br />
        Carregando...
      </div>
    )};
	return (
		<div className={classes.root}>
			<AppBar className={classes.appBar} position="static">
				<Toolbar>
					<IconButton href={'/home'} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
						<ArrowBackIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
      <Grid container xs={12} sm={6} md={3}>
        <form>
          <TextField
            id="outlined-name"
            label="Título"
            onChange={e => setPergunta({...pergunta, titulo: e.target.value})}
            className={classes.textFieldTitle}
            margin="normal"
            variant="outlined"
          />
          <TextField
            multiline
            rows="6"
            id="outlined-multiline-static"
            onChange={e => setPergunta({...pergunta, descricao: e.target.value})}
            variant="outlined"
            label="Digite sua pergunta"
            className={classes.textField}
          />	
				</form>
        <Grid item xs={12} sm={6} md={3} className={classes.btnPerg}>
					<Fab color="primary" className={classes.button} onClick={() => save(pergunta)}>
								<CheckIcon />
							</Fab>
				</Grid>
      </Grid>
		</div>
	);
}
