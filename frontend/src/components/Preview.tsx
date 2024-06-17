interface IHome {
  name: string;
  description: string;
  external_url: string;
  price: string;
  image: string;
}
const Preview = ({
  home,
  togglePop,
}: {
  home: IHome | undefined;

  togglePop: () => void;
}) => {
  return (
    <div className="w-screen  h-screen fixed bg-black bg-opacity-90 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      {/* <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div> */}
      {home && (
        <div className="w-[80%] h-[300px] fixed top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 text-white flex gap-4 ">
          <div>
            <img
              src={`https://blush-advisory-shark-880.mypinata.cloud/ipfs/${home.image.substring(
                7
              )}`}
              alt=""
              className="w-[100%] h-[300px] rounded-lg object-cover"
            />
          </div>
          <div className="p-4 flex flex-col gap-4">
            <h2 className="text-[1.5rem] ">{home.name}</h2>
            <p className="text-[0.8rem] ">{home.description}</p>
            <p className="text-[0.7rem] text-green-600">{home.price}</p>
          </div>
          <div>
            <button
              type="button"
              title="close"
              className="text-[1.5rem] text-white font-bold py-2 px-6 rounded flex items-center gap-2 hover:bg-red-600 transition-all duration-300 ease-in-out"
              onClick={togglePop}
            >
              {" "}
              x{" "}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Preview;
