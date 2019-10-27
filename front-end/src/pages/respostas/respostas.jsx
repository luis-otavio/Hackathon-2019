import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import axios from 'axios'
import { red, blue } from '@material-ui/core/colors';
import CardHeader from '@material-ui/core/CardHeader';
import {
	useParams
} from "react-router-dom";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CheckIcon from '@material-ui/icons/Check';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		'& .MuiOutlinedInput-input': {
			color: '#39D6D6',
		},
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
		},
		'&:hover fieldset': {
			borderColor: '#39D6D6',
		},
		'&.Mui-focused fieldset': {
			borderColor: '#39D6D6',
		},
	},
	respostaPergunta: {
		marginLeft: '15px'
	},
	cardPergunta: {
		maxWidth: 370,
		display: 'flex',
		margin: 'auto',
	},
	qtdLikes: {
		marginTop: '50px',
		fontWeight: 'bold',
		color: 'gray'
	},
	botoesLike: {
		
	},
	cardRespostas: {
		maxWidth: 370,
		display: 'flex',
		margin: 20,
	},
	btnLike: {
		marginTop: 'auto',
	},
	title: {
		marginLeft: '15px',
		fontWeight: 'bold',
	},
	description: {
		marginLeft: '15px',
	},
	button: {
		backgroundColor: '#39D6D6',
		margin: theme.spacing(1),
		fontWeight: 'bold',
		color:'white',
	},
	btnResp: {
		justifyContent: 'flex-end',
		display: 'flex',
		marginRight: 10,
	},
	btnSendResp: {
		backgroundColor: '#39D6D6',
		justifyContent: 'flex-end',
		display: 'flex',
		marginRight: 20,
	},
	avatarPergunta: {
		backgroundColor: red[500],
	},
	avatarResposta: {
		backgroundColor: blue[500],
	},
	btnSetting: {
		justifyContent: 'right',
		display: 'flex',
		marginTop: 'auto',
	},
	textField: {
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		width: 372,
		marginTop: 20,
		
	},
	appBar: {
		backgroundColor: '#39D6D6',
	},
	hr: {
		width: '90%',
	},
}));

export default function Respostas() {

	let { id } = useParams();
	const classes = useStyles();
	const [showText, setShowText] = useState(false);
	const [loading, setLoading] = useState(false);
	const [descricao, setDescricao] = useState('');
	const [respostas, setRespostas] = useState([]);
	const [titulo, setTitulo] = useState('')
	const [pergunta, setPergunta] = useState('')
	const [resposta, setResposta] = useState('')

	useEffect(() => {
		buscaRespostas().then(res => {
			setTitulo(res.data.titulo)
			setDescricao(res.data.descricao)
			setRespostas(res.data.respostas)
		})
	}, []);

	const buscaRespostas = async () => {
		setLoading(true)
		try {
			const response = await axios.get('http://localhost:3333/pergunta/'+id);
			return response;
	  	} catch (error) {
			console.error(error);    
	  	} finally {
			setLoading(false);
		}
	}
	
	const liked = async (id) => {
		console.log(id)
		setLoading(true)
		try {
			const response = await axios.put('http://localhost:3333/ranqueiaResposta/'+id, {increment: true});
			for(let i=0;i<respostas.length;i++){
				if(respostas[i].id === id){
					respostas[i].qtdLike = respostas[i].qtdLike + 1
				}
			}
		} catch (error) {
			console.error(error);    
	  	} finally {
			setLoading(false);
		}
	};

	const save = async() => {
		setLoading(true)
		try {
			const response = await axios.post('http://localhost:3333/resposta', {
				descricao: resposta.resposta,
				pergunta_id: id
			})
			respostas.push({descricao: resposta.resposta, pergunta_id: id, qtdLike: 0, id: response.id})
			setResposta('')
			setShowText(false)
			return response
		} catch(error){
			console.error(error)
		} finally {
			setLoading(false)
		}
  	};

	const disliked = async (id) => {
		setLoading(true)
		try {
			const response = await axios.put('http://localhost:3333/ranqueiaResposta/'+id, {increment: false});
			for(let i=0;i<respostas.length;i++){
				if(respostas[i].id === id){
					respostas[i].qtdLike = respostas[i].qtdLike - 1
				}
			}
		} catch (error) {
			console.error(error);    
	  	} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<AppBar className={classes.appBar} position="static">
				<Toolbar>
					<IconButton href={'/home'} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
						<ArrowBackIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
			<Grid item xs={12} sm={6} md={3} className={classes.btnResp}>
					<Button
						variant="contained"
						font color={'#FFFFFF'}
						className={classes.button}
						onClick={() => setShowText(!showText)}
						aria-label="responder"
					>	
						<AddIcon />
						Responder
					</Button>
				</Grid>
			<Grid xs={12} sm={6} md={3}>
				{/* ---------------------- PERGUNTA ---------------------------------- */}
				<Grid item xs={12} sm={6} md={3}>
					<Card className={classes.cardPergunta}>
						<CardContent>
							<CardHeader
								title=""
								subheader="26 de outubro, 2019"
							/>
							<Typography className={classes.title}>{titulo}</Typography>
							<Typography className={classes.description}>{descricao}</Typography>
						</CardContent>
					</Card>
				</Grid>
				

				{showText && (
					<form>
						<Grid item xs={12} sm={6} md={3}>
							<TextField
								multiline
								rows="4"
								id="outlined-multiline-static"
								variant="outlined"
								onChange={e => setResposta({...resposta, resposta: e.target.value})}
								label="Digite sua resposta"
								className={classes.textField}
							/>
							<Grid item xs={12} sm={6} md={3} className={classes.btnResp}>
								<Fab onClick={() => save()} color="primary" className={classes.button}>
									<CheckIcon />
								</Fab>
							</Grid>
						</Grid>
					</form>

				)}

				{/* ---------------------RESPOSTAS -------------------------- */}
				{respostas.map((resposta) => 
				<div key={resposta.id}>	
					<Grid item xs={12} sm={12} md={12}>
						<Card className={classes.cardRespostas}>
								<CardContent>
									<CardHeader
										subheader="26 de outubro, 2019"
									/>
									<Typography className={classes.respostaPergunta}>{resposta.descricao}</Typography>
								</CardContent>
								<CardActions className={classes.botoesLike}>

									<IconButton onClick={() => liked(resposta.id)} className={classes.btnLike} aria-label="like it">
										<ThumbUpAltIcon />
									</IconButton>

									<Typography className={classes.qtdLikes}>{resposta.qtdLike === null ? 0 : resposta.qtdLike}</Typography>

									<IconButton onClick={() => disliked(resposta.id)} className={classes.btnLike} aria-label="dislike it">
										<ThumbDownIcon />
									</IconButton>

								</CardActions>
							</Card>
						</Grid>
					</div>
					)}
				</Grid>
			</div>
	);
}
