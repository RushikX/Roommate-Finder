// src/components/Login.js
import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { auth, googleProvider } from "../firebase/config";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const email = result.user.email;

      // Check if email is from VIT domain
      if (!email.endsWith("@vitstudent.ac.in")) {
        await auth.signOut();
        setError("Please use your VIT student email to login");
        return;
      }

      dispatch({ type: "LOGIN", payload: result.user });
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box my={4} textAlign="center">
        <Typography variant="h4" gutterBottom>
          VIT Chennai Roommate Finder
        </Typography>
        {error && (
          <Typography color="error" gutterBottom>
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoogleLogin}
          fullWidth
          size="large"
          sx={{ mt: 2 }}
        >
          Login with Google
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
