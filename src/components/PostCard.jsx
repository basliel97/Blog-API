import { useTheme, Avatar, Paper, Divider, Box, Typography, Button, Collapse, TextField, CircularProgress } from "@mui/material";
import { MessageCircle, Eye } from "lucide-react";
import useAuthStore from "../store/authStore";

export default function PostCard({
  post,
  comments = [],
  onReadMore,
  onShowComments,
  showComments,
  isLoadingComments,
  newCommentValue,
  setNewCommentValue,
  onAddComment
}) {
  const theme = useTheme();
  const { user } = useAuthStore();
  const headerGradient = "linear-gradient(135deg, #1976d2 0%, #2196f3 100%)";
  const cardBg = theme.palette.background.paper;

  const getAuthorInfo = () => {
    if (post.author && post.author.username) {
      return {
        name: post.author.username,
        initial: post.author.username[0].toUpperCase()
      };
    }
    
    if (user && Number(post.authorId) === Number(user.id)) {
      return {
        name: user.username || user.email,
        initial: (user.username || user.email || "U")[0].toUpperCase()
      };
    }
    
    return {
      name: `User ${post.authorId}`,
      initial: "U"
    };
  };

  const getCommentAuthorInfo = (comment) => {
    if (comment.author && comment.author.username) {
      return comment.author.username;
    }
    
    if (user && Number(comment.authorId) === Number(user.id)) {
      return user.username || user.email;
    }
    
    return `User ${comment.authorId}`;
  };

  const authorInfo = getAuthorInfo();

  return (
    <Paper
      elevation={4}
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        maxWidth: 700,
        mx: "auto",
        mb: 3,
        background: cardBg,
      }}
    >
      <Box
        sx={{
          background: headerGradient,
          color: "#fff",
          px: 2.5,
          py: 1.5,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <Avatar sx={{ width: 36, height: 36, fontSize: 18, bgcolor: headerGradient }}>
          {authorInfo.initial}
        </Avatar>
        <Box>
          <Typography fontWeight={600} fontSize={16} color="#fff">
            {authorInfo.name}
          </Typography>
          <Typography fontSize={13} color="#e3e3e3">
            {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ""}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ px: 3, py: 2 }}>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 1, fontSize: 22 }}>
          {post.title}
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 2, fontSize: 16 }}>
          {post.content?.slice(0, 200)}{post.content?.length > 200 ? "..." : ""}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 2.5, py: 1.2 }}>
        <Button onClick={onReadMore} startIcon={<Eye />} sx={{ fontWeight: 700, color: "#1976d2", textTransform: "none" }}>
          Read More
        </Button>
        <Button
          onClick={onShowComments}
          startIcon={<MessageCircle size={20} style={{ opacity: 0.7 }} />}
          sx={{ fontWeight: 700, color: theme.palette.primary.main, textTransform: "none" }}
        >
          {showComments ? "Hide Comments" : "Show Comments"}
        </Button>
      </Box>
      <Collapse in={showComments} timeout="auto" unmountOnExit>
        <Box sx={{ px: 3, pb: 2 }}>
          <Divider sx={{ my: 1 }} />
          {isLoadingComments ? (
            <Box display="flex" justifyContent="center" py={2}>
              <CircularProgress size={24} />
            </Box>
          ) : (
            <>
              {comments.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No comments yet.
                </Typography>
              ) : (
                comments.map((comment, index) => (
                  <Box key={index} sx={{ mb: 1, p: 1, background: theme.palette.background.paper, borderRadius: 1 }}>
                    <Typography variant="subtitle2" fontWeight={600} color={theme.palette.text.primary}>
                      {getCommentAuthorInfo(comment)}
                      <span style={{ color: theme.palette.text.secondary, fontWeight: 400 }}>— {new Date(comment.createdAt).toLocaleString()}</span>
                    </Typography>
                    <Typography color={theme.palette.text.secondary}>{comment.content}</Typography>
                  </Box>
                ))
              )}
              <TextField
                fullWidth
                size="small"
                placeholder="Add a comment..."
                value={newCommentValue}
                onChange={(e) => setNewCommentValue(e.target.value)}
                sx={{ mt: 1, background: theme.palette.background.default, borderRadius: 2 }}
              />
              <Button onClick={onAddComment} sx={{ mt: 1 }} size="small" variant="contained" color="primary">
                Post Comment
              </Button>
            </>
          )}
        </Box>
      </Collapse>
    </Paper>
  );
} 