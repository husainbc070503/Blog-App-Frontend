import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

const CardPost = styled(Card)`
  padding: 12px 0;
  box-shadow: 0 10px 30px #dde6ed;
  transition: all 0.4s;
  z-index: -1;

  &:hover {
    transform: translateY(-10px);
  }
`;

const BlogCard = ({ post }) => {
  const { title, description, image, _id } = post;

  return (
    <CardPost sx={{ maxWidth: "100%" }}>
      <CardMedia sx={{ height: 240 }} image={image} title="green iguana" />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          textAlign="center"
          fontSize="32px"
          fontWeight="bold"
        >
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description.substr(0, 250) + "..."}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`singlePost/${_id}`} className="view-link">
          View Blog
        </Link>
      </CardActions>
    </CardPost>
  );
};

export default BlogCard;
