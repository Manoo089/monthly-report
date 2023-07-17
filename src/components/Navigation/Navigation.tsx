import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

function Navigation({ session, onClick }: any) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            aria-label="menu"
            sx={{ fontWeight: "bold", textTransform: "uppercase", mr: 2 }}
          >
            Monthly Report
          </Typography>

          {session && (
            <Typography variant="h6" component="div">
              <Button color="inherit">
                <Link href="/" color="inherit" style={{ color: "inherit", textDecoration: "none" }}>
                  Mein Bericht
                </Link>
              </Button>
            </Typography>
          )}

          {session && (
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Button color="inherit">
                <Link href="/profile" color="inherit" style={{ color: "inherit", textDecoration: "none" }}>
                  Profile
                </Link>
              </Button>
            </Typography>
          )}

          {session && (
            <Typography
              variant="body1"
              component="div"
              sx={{ textTransform: "uppercase", fontSize: "16px", marginRight: "10px" }}
            >
              {session.user.email}
            </Typography>
          )}

          <Button onClick={onClick} color="inherit">
            {session ? "Logout" : "Login"}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navigation;
