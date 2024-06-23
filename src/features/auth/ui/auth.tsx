import { Box } from "@mui/material"
import { SignInForm } from "./formSignIn"
import { Navigate } from "react-router-dom";
import { ROUTES } from "router/routes";
import { getToken } from "store/userData";
import { useSelector } from "react-redux";


export const AuthForm = () => {
  const token = useSelector(getToken);

  if (token) return <Navigate to={ROUTES.PROFILE} />;
  return (
    <Box
        sx={{
          margin: "40px 0",
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <SignInForm />
      </Box>
  )
}