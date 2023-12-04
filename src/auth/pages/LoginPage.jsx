import { useDispatch, useSelector } from "react-redux"

import { Link as RouterLink } from "react-router-dom"
import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"

import { useForm } from "../../hooks"
import { checkingAuthentication, startGoogleSignIn, startSignInWithEmailAndPassword } from "../../store/auth"
import { useMemo } from "react"

export const LoginPage = () => {

  const { status, errorMessage } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const { email, password, onInputChange } = useForm({
    email: '', 
    password: ''
  });

  const isAuthenticated = useMemo(() => status === 'checking', [status]);

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(checkingAuthentication());

    dispatch(startSignInWithEmailAndPassword({email, password}));
  }

  const onGoogleSignIn = (event) => {
    event.preventDefault();
    dispatch(startGoogleSignIn())
  }

  return (
    <AuthLayout title="Login">
    <form autoComplete="off" onSubmit={onSubmit}>
      <Grid container>

        <Grid item xs={12} sx={{ mt:2 }}>
          <TextField
            label="Correo" type="email" name="email" placeholder="correo@google.com" fullWidth onChange={onInputChange} />
        </Grid>

        <Grid item xs={12} sx={{ mt:2 }}>
          <TextField
            label="Password" type="password" name="password" placeholder="Password" fullWidth onChange={onInputChange} />
        </Grid>

        <Grid container spacing={2} sx={{ mb:2, mt:1 }}>

          <Grid
              item
              xs={ 12 }
              display={ !!errorMessage ? '' : 'none' }>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>

          <Grid item xs={ 12 } sm={6}>
            <Button type="submit" disabled={isAuthenticated} variant="contained" fullWidth >Login</Button>
          </Grid>

          <Grid item xs={ 12 } sm={6}>
            <Button variant="contained" disabled={isAuthenticated} fullWidth onClick={onGoogleSignIn}>
              <Google />
              <Typography sx={{ ml:1 }}>Google</Typography>
            </Button>
          </Grid>
        </Grid>


        <Grid container direction="row" justifyContent="end">
          <Link component={ RouterLink } to="/auth/register">Crear una cuenta</Link>
        </Grid>
      </Grid>
    </form>
    </AuthLayout>
  )
}
