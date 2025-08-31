import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "../Logo";
import { userAuth } from "../../context/AuthContext";
import NavigationLink from "../Logo/NavigationLink";

const Header = () => {
  const auth = userAuth();
  return (
  <AppBar 
    sx={{bgcolor: "transparent", position: "static", boxShadow: "none"}}
  > 
  <Toolbar sx={{ display: "flex"  }}>
    <Logo />
    <div>
      {auth?.isLoggedIn ? (<>
      <NavigationLink bg="#00fffc" to="/chat" text="Go to the chat" textColor="black"/> 
      <NavigationLink bg="#00fffc" to="/doc-gen" text="Doc Generator" textColor="black"/> 
      <NavigationLink bg="#51538f" textColor="white" to="/" text="logout" onClick={auth.logout}/>
      </> 
    ): (
    <>
    <NavigationLink bg="#00fffc" to="/login" text="Login" textColor="black"/>
    <NavigationLink bg="#51538f" to="/signup" text="Signup" textColor="white"/> 
</>
    )}
    </div>

    </Toolbar>
  </AppBar>
  );
};

export default Header;