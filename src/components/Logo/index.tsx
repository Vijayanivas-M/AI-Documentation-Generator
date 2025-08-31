import { Link } from "react-router-dom"
import { Box, Typography } from "@mui/material"
const Logo = () => {
  return(
  <Box sx = {{display: "flex", mr:"auto", alignItems: "center", gap: 1, justifyContent: "center"}}>
    <Link to = {"/"}>
    <img src="robott.gif" alt="robott" width={'30px'} height={'30px'} className= "image-color"/>
    </Link>{" "}
    <Typography sx={{display: {md: "block", sm: "none", xs: "none"},
    mr:"auto",
    fontWeight: '800',
    textShadow:"2px 2px 2px #000",}}
    color="white" variant="h6" component="div" gutterBottom>
      <span className="ai-chatbot-title">AI ENHANCED CODE DOCUMENTATION GENERATOR</span>
    </Typography>
  </Box>
  );
};

export default Logo