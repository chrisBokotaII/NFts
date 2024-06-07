import axios from "axios";

interface PinataResponse {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
}

const JWT = import.meta.env.VITE_PINATA_JWT;

const uploadToIPFS = async (file: File): Promise<string | undefined> => {
  try {
    const data = new FormData();
    data.append("file", file);
    data.append("pinataMetadata", '{"name":"test"}');

    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      data,
      {
        headers: {
          Authorization: `Bearer ${JWT}`,
        },
      }
    );

    const json: PinataResponse = res.data as PinataResponse;
    console.log(json.IpfsHash);
    return json.IpfsHash;
  } catch (error) {
    console.error(error);
  }
};

const uploadMetadataToIPFS = async (
  name: string,
  description: string,
  external_url: string,
  price: string,
  cid: string
): Promise<string | undefined> => {
  try {
    const data = JSON.stringify({
      name: name,
      description: description,
      external_url: external_url,
      price: price,
      image: `ipfs://${cid}`,
    });

    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JWT}`,
        },
      }
    );

    const json: PinataResponse = res.data as PinataResponse;
    console.log(json.IpfsHash);
    return json.IpfsHash;
  } catch (error) {
    console.error(error);
  }
};

export const main = async (
  file: File,
  name: string,
  description: string,
  external_url: string,
  price: string
) => {
  try {
    const cid = await uploadToIPFS(file);
    if (!cid) return;
    const hash = await uploadMetadataToIPFS(
      name,
      description,
      external_url,
      price,
      cid
    );
    console.log(hash);
    return hash;
  } catch (error) {
    console.error(error);
  }
};
