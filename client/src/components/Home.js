// src/components/Home.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Fab,
  
} from "@mui/material";
import { makeStyles } from '@mui/styles';

import AddIcon from '@mui/icons-material/Add';
import PostForm from "./PostForm";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const Home = () => {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/api/posts");
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchPosts();
  }, []);

  const handleContactClick = (contactDetails) => {
    // Open WhatsApp with the contact number
    window.open(`https://wa.me/${contactDetails}`, "_blank");
  };

  return (
    <Container className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Find a Roommate
      </Typography>

      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post._id}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6">{post.user.name}</Typography>
                <Typography color="textSecondary">
                  Branch: {post.branch}
                </Typography>
                <Typography color="textSecondary">
                  Year: {post.yearOfStudy}
                </Typography>
                <Typography color="textSecondary">
                  Languages: {post.languagesKnown.join(", ")}
                </Typography>
                <Typography color="textSecondary">CGPA: {post.cgpa}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleContactClick(post.contactDetails)}
                >
                  Contact
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Fab
        color="primary"
        className={classes.fab}
        onClick={() => setOpenForm(true)}
      >
        <AddIcon />
      </Fab>

      <PostForm open={openForm} handleClose={() => setOpenForm(false)} />
    </Container>
  );
};

export default Home;
