import { Link as RouterLink, useNavigate } from 'react-router-dom'; 
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Card,
  CardMedia,
  Typography
} from '@material-ui/core';
import {makeStyles, useTheme } from '@material-ui/core/styles';
import { useContext, useState } from 'react';
import AppContext from 'src/AppContext';
import { LoginService } from 'src/services/Services';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: "300px",
    height: "150px"
  },
}));

const Login = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const { state, dispatch } = useContext(AppContext)
  const theme = useTheme();
  const [user, setUser] = useState({})
  const [erro, setErro] = useState({})
  const [loading, setLoading] = useState(false)

  const getLogin = (userLogin) =>{
    (async () => {
      try {
        setLoading(true)
        const response = await LoginService.getLogin(userLogin);     

        dispatch({
          type: 'SET_USER',
          payload: response.data
        })

        window.sessionStorage.setItem("user", JSON.stringify(response.data))
        if (response.data != null){
          navigate("/app/dashboard")
        }
      } catch (error) {
        setLoading(false)
        dispatch({
          type: 'SET_SNACKBAR',
          payload: {
              message: 'Usuário ou senha incorreto.',
              color: 'red'
          },
        })
        return
      } finally {
        setLoading(false)
        
      }
    })()

  }

  return (
    <>
      <Helmet>
        <title>Entrar | Clinica Abrão</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Card>
          <Container>
          <Grid>
            <CardMedia
              className={classes.cover}
              image='/static/images/avatars/logo_clinica.png'
            />
            <Formik
              initialValues={{
                  nome: '',
                  senha: ''
              }}
              validationSchema={Yup.object().shape({
                nome: Yup.string().max(255).required('Usuário é obrigatório'),
                senha: Yup.string().max(255).required('Senha é obrigatório')
              })}
              onSubmit={(user) => {
                getLogin(user)
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values
              }) => (
                <form onSubmit={handleSubmit}>

                  <TextField
                    error={Boolean(touched.user && errors.email)}
                    fullWidth
                    helperText={touched.user && errors.email}
                    label="Usuário"
                    margin="normal"
                    name="nome"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.nome}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    label="Senha"
                    margin="normal"
                    name="senha"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.senha}
                    variant="outlined"
                  />
                  <Box sx={{ py: 2 }}>
                    <Button
                      color="primary"
                      disabled={loading}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Entrar
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
            </Grid>
            </Container>
            </Card>
          </Container>
      </Box>
    </>
  );
};

export default Login;
