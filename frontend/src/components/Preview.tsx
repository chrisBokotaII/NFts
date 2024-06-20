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
    <div
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center"
      onClick={togglePop}
    >
      {home && (
        <div
          className="w-[80%] max-w-3xl bg-gray-800 p-6 rounded-lg shadow-lg text-white flex flex-col md:flex-row gap-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full md:w-1/2">
            <img
              src={`https://blush-advisory-shark-880.mypinata.cloud/ipfs/${home.image.substring(
                7
              )}`}
              alt={home.name}
              className="w-full h-[500px] rounded-lg object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-4">{home.name}</h2>
              <p className="mb-4">{home.description}</p>
              <a
                href={home.external_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline"
              >
                More Info
              </a>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-xl font-bold">Price: {home.price}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Preview;
