import { useRef } from "react";
import cn from "../../lib/class-name";
import { Component } from "../../types/component";
import { Button, Box, TextField } from "@mui/material";

type Password = {
  oldPassword?: string;
  newPassword?: string;
};

interface Props extends Component {
  onSubmit: ({ oldPassword, newPassword }: Password) => void;
}

const PasswordForm = ({ onSubmit, classNames }: Props) => {
  const oldPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);

  const submitHandler = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    const enteredOldPassword = oldPasswordRef.current ? oldPasswordRef.current.value : "";
    const enteredNewPassword = newPasswordRef.current ? newPasswordRef.current.value : "";

    // optional Add validation

    onSubmit?.({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword
    });

    oldPasswordRef!.current!.value = "";
    newPasswordRef!.current!.value = "";
  };

  return (
    <form className={cn("PasswordForm", [], classNames)} onSubmit={submitHandler}>
      <Box>
        <TextField
          id="oldPassword"
          label="Altes Passwort"
          inputRef={oldPasswordRef}
          required
          size="medium"
          type="password"
          variant="standard"
        />
      </Box>

      <Box mt={3}>
        <TextField
          id="newPassword"
          label="Neues Passwort"
          inputRef={newPasswordRef}
          required
          size="medium"
          type="password"
          variant="standard"
        />
      </Box>

      <Box mt={2}>
        <Button className="AuthForm_button" type="submit" variant="contained" fullWidth>
          Passwort ändern
        </Button>
      </Box>
    </form>
  );
};

export default PasswordForm;
