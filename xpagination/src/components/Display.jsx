import { useEffect, useState } from "react";
import styles from "./Display.module.css";
const Display = () => {
  const [employee, setEmployee] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentEmployee, setCurrentEmployee] = useState([]);
  const totalPages = Math.ceil(employee.length / 10);
  useEffect(() => {
    const endIndex = 10 * currentPage;
    const startIndex = endIndex - 10;
    setCurrentEmployee(employee.slice(startIndex, endIndex));
  }, [currentPage]);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        const jsonData = await response.json();
        setEmployee(jsonData);
        setCurrentPage(1);
      } catch (e) {
        alert("failed to fetch data");
      }
    };
    fetchApi();
  }, []);
  const setPageNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };
  const setPagePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };
  return (
    <>
      <div className={styles.container}>
        <h1>Empoyee Data Table</h1>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployee.map((data) => {
              return (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.role}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className={styles.paginationButtons}>
          <div>
            {" "}
            <button type="button" onClick={setPagePrev}>
              Previous
            </button>
          </div>
          <div>
            <p>{currentPage}</p>
          </div>
          <div>
            <button type="button" onClick={setPageNext}>
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Display;
