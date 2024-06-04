import Nav from "../components/Nav";
import Table from "../components/Table";

const Dashboard = () => {
  return (
    <div className="bg-black h-screen">
      <Nav />
      <h1 className="text-3xl font-bold text-white text-center">Dashboard</h1>
      <Table />
    </div>
  );
};

export default Dashboard;
