import { Link as RouterLink } from "react-router-dom"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks"
import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startCreatingUserWithUserAndPassowrd } from "../../store/auth/thunks"

const formData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe tener un @'],
  password: [(value) => value.length >= 6, 'El password debe tener mas de 6 caracteres'],
  displayName: [(value) => value.length >=1, 'El nombre es obligatorio']
}

export const RegisterPage = () => {

  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector(state => state.auth);

  const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

  const { formState, email, password, displayName, onInputChange,
          isFormValid, emailValid, passwordValid, displayNameValid } = useForm(formData, formValidations);

  const [formSubmited, setFormSubmited] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setFormSubmited(true)

    if(!isFormValid) return;
    
    dispatch(startCreatingUserWithUserAndPassowrd(formState));
  }

  return (
    <AuthLayout title="Crear cuenta">
    <h1>FormValid { isFormValid ? 'Valido' : 'Incorrecto' }</h1>
      <form autoComplete="off" onSubmit={onSubmit}>
        <Grid container>

        <Grid item xs={12} sx={{ mt:2 }}>
            <TextField
              label="Nombre completo"
              type="text"
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              placeholder="Felipe Cardenas"
              fullWidth
              error={!!displayNameValid && formSubmited }
              helperText={ displayNameValid } />
          </Grid>

          <Grid item xs={12} sx={{ mt:2 }}>
            <TextField
              label="Correo"
              type="email"
              name="email"
              value={email}
              onChange={onInputChange}
              placeholder="correo@google.com"
              fullWidth
              error={!!emailValid && formSubmited }
              helperText={ emailValid } />
          </Grid>

          <Grid item xs={12} sx={{ mt:2 }}>
            <TextField
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={onInputChange}
              placeholder="Password"
              fullWidth
              error={!!passwordValid && formSubmited }
              helperText={ passwordValid } />
          </Grid>

          <Grid container spacing={2} sx={{ mb:2, mt:1 }}>

            <Grid
              item
              xs={ 12 }
              display={ !!errorMessage ? '' : 'none' }>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>

            <Grid item xs={ 12 }>
              <Button
                disabled={ isCheckingAuthentication }
                type="submit"
                variant="contained"
                fullWidth>Crear cuenta</Button>
            </Grid>
          </Grid>


          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>Ya tienes una cuenta?</Typography>
            <Link component={ RouterLink } to="/auth/login">Ingresar</Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}
