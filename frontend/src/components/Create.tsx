import React, { useState } from "react";
import { main } from "../helper/pinata";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
      try {
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
          .safeMint(cid);
        await tx?.wait();
        console.log(tx, signer);

        navigate("/dashboard");
      } catch (error) {
        console.error("Error creating NFT:", error);
        alert("An error occurred while creating the NFT.");
      }
    } else {
      alert("No file selected");
    }
  };

  return (
    <div className="xl:w-1/2 m-auto p-6 rounded-xl overlay sm:w-fit sm:p-2 md:w-1/2">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 justify-center items-center"
      >
        <label htmlFor="name" className="text-white">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="p-2 w-full sm:w-3/4 md:w-1/2 rounded-lg text-black"
          onChange={handleChange}
          required
        />

        <label htmlFor="price" className="text-white">
          Price:
        </label>
        <input
          type="text"
          id="price"
          name="price"
          className="p-2 w-full sm:w-3/4 md:w-1/2 rounded-lg text-black"
          onChange={handleChange}
          required
        />

        <label htmlFor="img" className="text-white">
          Image:
        </label>
        <input
          type="file"
          id="img"
          name="img"
          className="p-2 rounded-lg text-white"
          onChange={changeHandler}
          required
        />

        <label htmlFor="description" className="text-white">
          Description:
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Describe your NFT..."
          className="p-2 w-full sm:w-3/4 md:w-1/2 rounded-lg text-black"
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="bg-green-500 w-1/4 p-2 rounded-lg text-white hover:bg-green-600 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Create;
