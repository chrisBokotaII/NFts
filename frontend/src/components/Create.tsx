import React, { useState } from "react";
import { main } from "../helper/pinata";
import { ethers } from "ethers";

const Create = ({
  provider,
  contract,
}: {
  provider: ethers.BrowserProvider | undefined;
  contract: ethers.Contract | undefined;
}) => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    external_url: "https://pinata.cloud",
  });
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.size > 1048576) {
      alert("File size exceeds 1MB limit. Please select a smaller file.");
      event.target.value = "";
    } else {
      setSelectedFile(file);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (selectedFile) {
      const cid = await main(
        selectedFile,
        form.name,
        form.description,
        form.external_url,
        form.price
      );
      console.log(cid);
      if (cid) {
        alert("NFT created successfully");
      }

      const signer = await provider?.getSigner();
      if (!signer) {
        alert("No signer found");
        return;
      }
      const tx = await contract
        ?.connect(signer)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .safeMint(signer?.getAddress(), cid);
      await tx?.wait();
      console.log(tx, signer);

      // window.location.reload();
    } else {
      alert("No file selected");
    }
  };

  return (
    <div className="w-1/2 m-auto  p-2 rounded-xl overlay">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 has-[input]:p-2 justify-center items-center"
      >
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          className="p-1 w-1/2 rounded-lg text-black"
          onChange={handleChange}
        />

        <label htmlFor="price">Price:</label>
        <input
          type="text"
          id="price"
          name="price"
          className="p-1 w-1/2 rounded-lg text-black"
          onChange={handleChange}
        />

        <label htmlFor="img" className="text-center">
          Image:
        </label>
        <input
          type="file"
          id="img"
          name="img"
          className="rounded-lg"
          onChange={changeHandler}
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          placeholder="Describe your NFT..."
          className="p-2 w-1/2 rounded-lg text-black"
          onChange={handleChange}
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
