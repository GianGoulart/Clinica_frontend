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
  const theme = useTheme();
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
                email: '',
                password: ''
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string().email('Email inválido').max(255).required('Email é obrigatório'),
                password: Yup.string().max(255).required('Senha é obrigatório')
              })}
              onSubmit={() => {
                navigate('/app/dashboard', { replace: true });
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
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Email"
                    margin="normal"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="email"
                    value={values.email}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    label="Senha"
                    margin="normal"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="outlined"
                  />
                  <Box sx={{ py: 2 }}>
                    <Button
                      color="primary"
                      disabled={isSubmitting}
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
