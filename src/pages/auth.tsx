import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import AuthForm from "../components/AuthForm/AuthForm";
import Typography from "@mui/material/Typography";

const Auth = () => {
  const { status } = useSession();
  const router = useRouter();

  const onSubmitHandler = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    const enteredEmail = e.currentTarget.email.value;
    const enteredPassword = e.currentTarget.password.value;

    const result = await signIn("credentials", { redirect: false, email: enteredEmail, password: enteredPassword });
    console.log(result);

    if (!result!.error) {
      // todo
    }
  };

  if (status === "authenticated") {
    router.replace("/");
  } else if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Typography variant="h3" component="h3" align="center" fontWeight="bold" m={3}>
        Login
      </Typography>
      <AuthForm onSubmit={onSubmitHandler} />
    </>
  );
};

export default Auth;
