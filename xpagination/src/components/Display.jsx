import { useEffect, useState } from "react";

const Display = () => {
  const [employee, setEmployee] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        const jsonData = await response.json();
        setEmployee(jsonData);
      } catch (e) {
        console.error(e);
      }
    };
    fetchApi();
  }, []);
  console.log(employee);
  return (
    <>
      <h1>Empoyee Data Table</h1>
      <table>
        <tbody>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </tbody>
      </table>
    </>
  );
};
export default Display;
