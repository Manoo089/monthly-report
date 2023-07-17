import { useRef } from "react";
import { Component } from "../../types/component";
import cn from "../../lib/class-name";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

interface Props extends Component {
  onSubmit?: (e: React.MouseEvent<HTMLFormElement>) => void;
}

const AuthForm = ({ onSubmit, classNames }: Props) => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  return (
    <form className={cn("AuthForm", [], classNames)} onSubmit={onSubmit}>
      <Box>
        <TextField
          id="email"
          label="E-Mail"
          ref={emailInputRef}
          required
          size="medium"
          type="email"
          variant="standard"
        />
      </Box>

      <Box mt={3}>
        <TextField
          id="password"
          label="Passwort"
          ref={passwordInputRef}
          required
          size="medium"
          type="password"
          variant="standard"
        />
      </Box>

      <Box mt={2}>
        <Button className="AuthForm_button" type="submit" variant="contained" fullWidth>
          Login
        </Button>
      </Box>
    </form>
  );
};

export default AuthForm;
