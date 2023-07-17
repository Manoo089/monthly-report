import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";

import { ButtonOnClickEvent, InputChangeEvent } from "../types/events";
import { InitialInputType, InitialData } from "../types/props";

import { formatDate } from "../helpers/formatDate";
import { getCurrentMonth } from "../helpers/getMonth";
import { fetchMethods } from "../helpers/methods";

import { Calculator } from "../lib/calculate";

import getData from "./api/getData";

import Card from "../components/Card/Card";
import CardLayout from "../components/CardLayout/CardLayout";

export interface Props {
  dbData: InitialData;
}

const INITIAL_INPUT: InitialInputType = {
  stunden: 0,
  abgaben: 0,
  rueckbesuche: 0,
  videos: 0
};

const Home = ({ dbData }: Props) => {
  const calculate = new Calculator();
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [initialData, setInitialData] = useState(dbData);
  const [updatedData, setUpdatedData] = useState({});
  const [userInput, setUserInput] = useState<InitialInputType>(INITIAL_INPUT);

  const handleOnClickButton = (e: ButtonOnClickEvent) => {
    const target = e.currentTarget;
    const { id, name } = target;
    const currentDateLocal = new Date().toISOString();

    const updatedData = [...initialData];
    const currentTarget = updatedData.find(el => name === el.name);
    currentTarget!.date = currentDateLocal;
    currentTarget!.counter =
      id === "increase"
        ? calculate.add(currentTarget!.counter, userInput[name])
        : calculate.subtract(currentTarget!.counter, userInput[name]);

    setInitialData(updatedData);
    setUpdatedData({ ...currentTarget });
    setUserInput(INITIAL_INPUT);
    setIsUpdate(true);
  };

  const handleInputChange = (e: InputChangeEvent) => {
    const target = e.target;
    const inputName = target.name;

    setUserInput({
      ...userInput,
      [inputName]: e.currentTarget.valueAsNumber
    });
  };

  useEffect(() => {
    if (isUpdate) {
      fetchMethods("/api/user/patchData", "PUT", updatedData);
    } else {
      return;
    }
  }, [updatedData, isUpdate]);

  return (
    <div>
      <h3>Aktueller Monat: {getCurrentMonth()}</h3>

      <CardLayout>
        {initialData.map((data: any) => {
          return (
            <Card
              key={data.id}
              counter={data.counter}
              title={data.name}
              date={data.date ? formatDate(data.date) : ""}
              name={data.name}
              value={userInput[data.name]}
              onIncrease={handleOnClickButton}
              onDecrease={handleOnClickButton}
              onChange={handleInputChange}
            />
          );
        })}
      </CardLayout>
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

  const entries = await getData(session.user!.email);
  return {
    props: {
      dbData: JSON.parse(JSON.stringify(entries.rows)),
      session
    }
  };
}

export default Home;
