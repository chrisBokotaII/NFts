const Create = () => {
  return (
    <div className="w-1/2 m-auto bg-hero-pattern ">
      <form
        action=""
        className="flex flex-col gap-3 has-[input]:p-2 justify-center items-center  "
      >
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" className="p-1 w-1/2 rounded-lg" />

        <label htmlFor="price">Price:</label>
        <input type="text" id="price" className="p-1 w-1/2 rounded-lg" />
        <div className="flex gap-3 flex-col">
          <label htmlFor="img" className="text-center">
            Imange:
          </label>
          <input type="file" id="img" className="rounded-lg" />
          <button type="submit" className="bg-green-500 w-1/4 p-1 rounded-lg">
            Upload
          </button>
          <span></span>
        </div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          placeholder="Discribe your NFT......"
          className="p-2 w-1/2 rounded-lg"
        />
        <hr />
        <button type="submit" className="bg-green-500 w-1/4 p-1 rounded-lg">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Create;
