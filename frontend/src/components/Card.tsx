interface IHome {
  id: number;
  name: string;
  description: string;
  price: string;
}

const Card = ({ id, name, description, price }: IHome) => {
  return (
    <div className="p-2 flex flex-col gap-4 mb-2 ">
      <h1 className="text-[0.8rem] font-bold">
        {name} {id}
      </h1>
      <img
        src="../images/bg.jpg"
        alt=""
        className="w-[100%]  rounded-xl object-cover"
      />
      <p className="text-[0.8rem] w-[100%] p-2  ">{description}</p>
      <p className="text-[0.7rem] text-green-600 ">{price}</p>
      <button className="text-[0.7rem] text-green-600 bg-white px-4 py-2 rounded hover:bg-gray-600">
        Buy
      </button>
    </div>
  );
};

export default Card;
