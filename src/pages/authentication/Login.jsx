import * as React from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link as RouterLink } from 'react-router-dom';
// material-ui
import {
  Button,
  Checkbox,
  Container,
  Box,
  FormControlLabel,
  FormHelperText,
  Avatar,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';

import { EyeOutlined, EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from "../../hooks/AuthProvider";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://fromchiapas.dev">
        FromChiapasDev
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Debe ser un correo valido').max(255).required('Email es requerido'),
  password: Yup.string().max(255).required('Contraseña es requerido'),
});

export default function Login() {
  const { login } = useAuth()
  const [checked, setChecked] = React.useState(false);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmitForm = (values, { setErrors, setStatus, setSubmitting }) => {
    try {
      setStatus({ success: false });
      setSubmitting(true);
      console.log('Values form', values)
      login({ email: values.email, password: values.password })
    } catch (err) {
      setStatus({ success: false });
      setErrors({ submit: err.message });
      setSubmitting(false);
    }
  }

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar sesión
        </Typography>
        <Formik
          initialValues={{
            email: 'pruebadashboard@fromchiapas.dev',
            password: 'pruebaDashboard',
            submit: null
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmitForm}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="email-login">Correo</InputLabel>
                    <OutlinedInput
                      id="email-login"
                      type="email"
                      value={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Ingresa Email..."
                      fullWidth
                      error={Boolean(touched.email && errors.email)}
                    />
                    {touched.email && errors.email && (
                      <FormHelperText error>
                        {errors.email}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="password-login">Contraseña</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.password && errors.password)}
                      id="password-login"
                      type={showPassword ? 'text' : 'password'}
                      value={values.password}
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            size="large"
                          >
                            {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                          </IconButton>
                        </InputAdornment>
                      }
                      placeholder="Ingresa tu contraseña..."
                    />
                    {touched.password && errors.password && (
                      <FormHelperText error>
                        {errors.password}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>

                <Grid item xs={12} sx={{ mt: -1 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checked}
                          onChange={(event) => setChecked(event.target.checked)}
                          name="checked"
                          color="primary"
                          size="small"
                        />
                      }
                      label={<Typography variant="h6">Mantener sesión iniciada</Typography>}
                    />
                    <Link variant="h6" component={RouterLink} to="/password-recovery" color="text.primary">
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </Stack>
                </Grid>
                {errors.submit && (
                  <Grid item xs={12}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Iniciar sesión
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
