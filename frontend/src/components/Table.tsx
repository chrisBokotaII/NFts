import { useState } from "react";
import { data } from "../data";
import Preview from "./Preview";

interface IHome {
  id: number;
  name: string;
  description: string;
  price: string;
}
const Table = () => {
  const [toggle, setToggle] = useState(false);
  const [home, setHome] = useState<IHome | undefined>({} as IHome);
  const togglePop = (home?: IHome) => {
    setHome(home);
    toggle ? setToggle(false) : setToggle(true);
  };
  return (
    <div className="w-[90%] m-auto ">
      <div className="overflow-x-auto mt-6 h-[60vh]">
        <table className="table-auto bg-white text-[0.7rem]  border-separate border-spacing-2 border bordr-slate-500 ">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-bold text-green-900 text-[1rem] ">
                #ID
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-bold text-green-900 text-[1rem] ">
                Image
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-bold text-green-900 text-[1rem] ">
                Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-bold text-green-900 text-[1rem]  ">
                Description
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-bold text-green-900 text-[1rem] ">
                Price
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-bold text-green-900 text-[1rem] ">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="text-[0.7rem]">
            {data.map((item, index) => (
              <tr
                key={index}
                className="cursor-pointer hover:bg-slate-400"
                onClick={() => togglePop(item)}
              >
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 ">
                  {item.id}
                </td>
                <td>
                  <img
                    src="../images/bg.jpg"
                    alt="img"
                    className="w-[40%] rounded-lg text-center object-cover"
                  />
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {item.name}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-wrap">
                  {item.description}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {item.price}
                </td>

                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  <button
                    className=" text-[0.8rem] bg-green-500 text-white font-bold py-2 px-6 rounded flex items-center gap-2 hover:bg-green-600 transition-all duration-300 ease-in-out"
                    type="button"
                  >
                    List
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {toggle && <Preview home={home || undefined} togglePop={togglePop} />}
    </div>
  );
};

export default Table;
