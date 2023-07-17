import { useEffect } from "react";
import cn from "../lib/class-name";
import { Component } from "../types/component";
import { getSession } from "next-auth/react";
import { Typography } from "@mui/material";
import PasswordForm from "../components/PasswordForm/PasswordForm";
import { io } from "socket.io-client";

interface Props extends Component {
  data: any;
  session: any;
}

const Profile = ({ classNames }: Props) => {
  async function changePasswordHandler(passwordData: any) {
    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();

    console.log(data);
  }

  const whatsapp = async () => {
    const response = await fetch("/api/user/whatsapp", {
      method: "PATCH",
      body: JSON.stringify({ test: "test" }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();

    console.log(data);
  };

  const socketInitializer = async () => {
    const socket = new (io as any)(process.env.NEXT_PUBLIC_SITE_URL, {
      path: "/api/user/whatsapp"
    });

    socket.on("connect", () => {
      console.log("connected");
    });
  };

  useEffect(() => {
    socketInitializer();
  }, []);

  return (
    <div className={cn("Profile", [], classNames)}>
      <div className="Profile__change-password">
        <Typography variant="h3" component="h3" align="center" fontWeight="bold" m={3}>
          Profil
        </Typography>
        <PasswordForm onSubmit={changePasswordHandler} />
      </div>

      <div className="Profile__whatsapp">
        <button onClick={whatsapp}>WhatsApp</button>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false
      }
    };
  }

  return {
    props: { session }
  };
}

export default Profile;
