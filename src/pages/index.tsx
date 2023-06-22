import { useEffect, useState } from "react";

import { buildDataPath, extractData, extractStunden } from "./api/getData";
import { getCurrentMonth } from "../helpers/getMonth";
import { fetchMethods } from "../helpers/methods";

import InputField from "../components/InputField/InputField";

interface CurrentData {
  hours: number;
}

interface UserInput {
  inputHours: string | number;
}

const Home = ({ hours }: any) => {
  const [currentData, setCurrentData] = useState<CurrentData>({
    hours: hours
  });

  const [userInput, setUserInput] = useState<UserInput>({
    inputHours: "0"
  });

  const handleAddHours = () => {
    setCurrentData({ ...currentData, hours: currentData.hours + Number(userInput.inputHours) });
    setUserInput({ inputHours: 0 });
  };

  useEffect(() => {
    const reqBody = { hours: currentData.hours };
    fetchMethods("/api/patchData", "PATCH", reqBody);
  }, [currentData.hours]);

  return (
    <div>
      <h3>Aktueller Monat: {getCurrentMonth()}</h3>
      <h3>Aktuelle Stunden: {currentData.hours}</h3>

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

export async function getStaticProps() {
  const filePath = buildDataPath();
  const data = extractData(filePath);
  const stunden = extractStunden(data);
  return {
    props: {
      hours: stunden
    }
  };
}

export default Home;
