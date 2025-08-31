import { RiLoginBoxLine } from "react-icons/ri";
import { Box , Typography, Button} from "@mui/material"
import CustomizedInput from "../components/Logo/CustomizedInput";
import toast, {} from 'react-hot-toast'
import { Form } from "react-router-dom";
import { userAuth } from "../context/AuthContext";
import { use } from "react";

export const Login = () => {
  const auth = userAuth();
  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      toast.loading("Signing in...",{id:"login"});
      await auth?.login(email, password );
      toast.success("Signed in successfully",{id:"login"});
    } catch (error) {
      console.log(error);
      toast.error("Signing in failed !",{id:"login"});
    }
  }
  return (
    <Box width={"100%"} height={"100%"} display={"flex"} flex={1}>
      <Box display={"flex"} flex={{xs: 1, md: 0.5}} justifyContent={"center"} alignItems={"center"} padding={2} ml={"auto"} mt={16}
      >
        <form 
        onSubmit={handleSubmit}
        style={{margin:"auto", padding:'30px', boxShadow:"10px 10px 5px #888888", borderRadius:"10px", border:"none"}}>
          <Box sx={{display:'flex',flexDirection:"column", justifyContent: "center",

          }}
          >
            <Typography variant="h4" textAlign={"center"} padding={2} fontWeight={600}
            >
              login
            </Typography>
            <CustomizedInput type="email" name="email" label="Email" />
            <CustomizedInput type="password" name="password" label="Password"/>
            <Button type="submit" 
            sx={{
              px: 2,
              py: 1,
              mt: 1,
              width: "400px",
              borderRadius: 10,
              bgcolor: "black",
              ":hover": {
                bgcolor: "white",
                color: "black",
              }

            }}
            endIcon={<RiLoginBoxLine size={20} />}
            >Login</Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};
export default Login