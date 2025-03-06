// src/components/Profile.js (continued)
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import PostForm from "./PostForm";

const Profile = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await axios.get("/api/posts/user");
        setUserPosts(res.data);
      } catch (err) {
        console.error("Error fetching user posts:", err);
      }
    };

    fetchUserPosts();
  }, []);

  const handleEdit = (post) => {
    setSelectedPost(post);
    setOpenEditForm(true);
  };

  const handleDelete = (post) => {
    setSelectedPost(post);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/api/posts/${selectedPost._id}`);
      setUserPosts(userPosts.filter((post) => post._id !== selectedPost._id));
      setOpenDeleteDialog(false);
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        My Profile
      </Typography>

      <Typography variant="h6" gutterBottom>
        My Posts
      </Typography>

      {userPosts.length === 0 ? (
        <Typography>You haven't created any posts yet.</Typography>
      ) : (
        <Grid container spacing={3}>
          {userPosts.map((post) => (
            <Grid item xs={12} key={post._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    Registration Number: {post.registrationNumber}
                  </Typography>
                  <Typography>Branch: {post.branch}</Typography>
                  <Typography>Year of Study: {post.yearOfStudy}</Typography>
                  <Typography>
                    Languages: {post.languagesKnown.join(", ")}
                  </Typography>
                  <Typography>CGPA: {post.cgpa}</Typography>
                  <Typography>Contact: {post.contactDetails}</Typography>

                  <div style={{ marginTop: "1rem" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ marginRight: "1rem" }}
                      onClick={() => handleEdit(post)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(post)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Edit Post Form */}
      {selectedPost && (
        <PostForm
          open={openEditForm}
          handleClose={() => setOpenEditForm(false)}
          post={selectedPost}
          isEdit={true}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this post? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile;
