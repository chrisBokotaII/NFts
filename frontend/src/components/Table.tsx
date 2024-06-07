import { data } from "../data";
const Table = () => {
  return (
    <div className="w-full m-auto ">
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-[0.7rem] ">
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

          <tbody className="divide-y mb-4 divide-gray-200 p-2">
            {data.map((item, index) => (
              <tr key={index} className="">
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {item.id}
                </td>
                <td>
                  <img
                    src="../images/bg.jpg"
                    alt="img"
                    className="w-[60px] rounded-lg"
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
    </div>
  );
};

export default Table;
