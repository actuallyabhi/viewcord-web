import MetaHelmet from "../../components/common/MetaHelmet";
import Login from "./Login";
import Select from "../../components/common/Select";
import CountryMap from "../../components/common/CountryMap.json";
import Quality from "./Quality";
import { setLocal, getLocal } from "../../components/utils/StorageUtils";
import Instance from "./Instance";
import { useDispatch } from "react-redux";

const Preferences = () => {
  const dispatch = useDispatch();
  return (
    <>
      <MetaHelmet title="Preferences" />
      <div className="w-full h-full flex flex-col justify-start px-4 py-2 items-start">
        <div className="w-full  flex flex-col justify-start items-center  border-b-[1px] border-gray-200 dark:border-gray-700/80 py-4">
          <h1 className="text-5xl font-bold text-gray-800 text-center w-full md:text-left py-2 pb-4 dark:text-white/80">
            Preferences
          </h1>
        </div>
        <div className="flex flex-col gap-2 w-full ">
          <Login />

          {/* country section */}
          <Select label="Country"
                  onChange={(e) => {
                    setLocal("country", e.target.value);
                    // dispatch({ type: "SET_COUNTRY", payload: e.target.value });
                  }}
          >
            {CountryMap.map((option) => (
              <option
                key={option.code}
                value={option.code}
                selected={
                  getLocal("country") == option.code
                    ? true
                    : getLocal("country") === null && option.code == "IN"
                    ? true
                    : false
                }
              >
                {option.name}
              </option>
            ))}
          </Select>
          <Quality />
          <Instance />
        </div>
      </div>
    </>
  );
};

export default Preferences;
