import Create from "../components/Create";
import Nav from "../components/Nav";

const Upload = () => {
  return (
    <div className="h-screen bg-hero-pattern text-secondary">
      <Nav />
      <h1 className="text-3xl font-bold text-white text-center">Upload</h1>
      <Create />
    </div>
  );
};

export default Upload;
