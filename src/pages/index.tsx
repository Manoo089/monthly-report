import { useEffect, useState } from "react";

import { formatDate } from "../helpers/formatDate";
import { getCurrentMonth } from "../helpers/getMonth";
import { fetchMethods } from "../helpers/methods";

import { Calculator } from "../libs/calculate";

import getData from "./api/getData";

import Card from "../components/Card/Card";
import CardLayout from "../components/CardLayout/CardLayout";

interface Props {
  dbData: InitialData;
}

type InitialData = {
  id: number;
  name: string;
  date: string;
  counter: number;
}[];

type InitialInputType = {
  [key: string]: number;
};

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

  const handleOnIncrease = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    const currentDateLocal = new Date().toISOString();

    const updatedData = [...initialData];
    const currentTarget = updatedData.find(el => target.name === el.name);
    currentTarget!.date = currentDateLocal;
    currentTarget!.counter = calculate.add(currentTarget!.counter, userInput[target.name]);

    setInitialData(updatedData);
    setUpdatedData({ ...currentTarget });
    setUserInput(INITIAL_INPUT);
    setIsUpdate(true);
  };

  const handleOnDecrease = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    const currentDateLocal = new Date().toISOString();

    const updatedData = [...initialData];
    const currentTarget = updatedData.find(el => target.name === el.name);
    currentTarget!.date = currentDateLocal;
    currentTarget!.counter = calculate.subtract(currentTarget!.counter, userInput[target.name]);

    setInitialData(updatedData);
    setUpdatedData({ ...currentTarget });
    setUserInput(INITIAL_INPUT);
    setIsUpdate(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const inputName = target.name;

    setUserInput({
      ...userInput,
      [inputName]: e.currentTarget.valueAsNumber
    });
  };

  useEffect(() => {
    if (isUpdate) {
      fetchMethods("/api/patchData", "PUT", updatedData);
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
              date={formatDate(data.date)}
              name={data.name}
              value={userInput[data.name]}
              onIncrease={userInput[data.name] !== 0 ? handleOnIncrease : undefined}
              onDecrease={userInput[data.name] !== 0 ? handleOnDecrease : undefined}
              onChange={handleInputChange}
            />
          );
        })}
      </CardLayout>
    </div>
  );
};

export async function getServerSideProps() {
  const entries = await getData();
  return {
    props: {
      dbData: JSON.parse(JSON.stringify(entries.rows))
    }
  };
}

export default Home;
