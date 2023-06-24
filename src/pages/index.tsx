import { useEffect, useState } from "react";

import { getCurrentMonth } from "../helpers/getMonth";
import { fetchMethods } from "../helpers/methods";

import mongodb from "../utils/mongodb";

import InputField from "../components/InputField/InputField";
import dbModels from "../models/dbModels";

interface CurrentData {
  hours: number;
}

interface UserInput {
  inputHours: string | number;
}

const Home = ({ hours }: any) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentData, setCurrentData] = useState<CurrentData>({
    hours: hours[0].hours
  });

  const [userInput, setUserInput] = useState<UserInput>({
    inputHours: "0"
  });

  const handleAddHours = () => {
    setCurrentData({ ...currentData, hours: currentData.hours + Number(userInput.inputHours) });
    setUserInput({ inputHours: 0 });
    setIsUpdate(true);
  };

  useEffect(() => {
    if (isUpdate) {
      const reqBody = { hours: currentData.hours };
      fetchMethods("/api/patchData", "PATCH", reqBody);
    } else {
      return;
    }
  }, [currentData.hours, isUpdate]);

  return (
    <div>
      <h3>Aktueller Monat: {getCurrentMonth()}</h3>
      <h3>Aktuelle Stunden: {currentData.hours}</h3>

      {/* TODO: Aktuelle Abgaben, Aktuelle Videos, Aktuelle Rückbesuche */}

      <div className="input">
        <h4>Stunden hinzufügen</h4>
        <InputField
          onChange={e => setUserInput({ ...userInput, inputHours: e.currentTarget.value })}
          value={userInput.inputHours}
        />
      </div>
      <button onClick={handleAddHours}>Add</button>
    </div>
  );
};

export async function getServerSideProps() {
  await mongodb.dbConnect();
  const hours = await dbModels.find({}).lean();
  return {
    props: {
      hours: JSON.parse(JSON.stringify(hours))
    }
  };
}

export default Home;
