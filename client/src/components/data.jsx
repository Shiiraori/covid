import React, { useEffect } from "react";
import { useState } from "react";

const CovidDataTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/covid"); // Change the URL to your API endpoint
      const jsonData = await response.json();
      setData(jsonData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    $(".table").DataTable({
      paging: true,
      searching: true,
    });
  }, []);

  return (
    <div>
      <br />
      <section>
        <div
          className="card"
          style={{ width: "70%", margin: "0 auto", backgroundColor: "#C5D7F2" }}
        >
          <div className="card-body">
            <div className="card-title" style={{ textAlign: "center" }}>
              <h3>
                <strong>
                  Covid Data in the Philippines
                  {/* <span> 2016-2021 </span>  */}
                </strong>
              </h3>
            </div>
            <table className="table table-striped table-primary my-3">
              <thead>
                <tr>
                  <th>date_postive</th>
                  <th>ic</th>
                  <th>local_lsi_rof</th>
                  <th>lsi_rof_no</th>
                  <th>barangay</th>
                  <th>age</th>
                  <th>gender</th>
                  <th>number</th>
                  <th>status</th>
                  <th>remarks</th>
                  <th>place_of_isolation</th>
                  <th>vaccine</th>
                  <th>partial_fully_vaccinated</th>
                  <th>date_of_last_dose</th>
                  <th>date_swab</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    <td>{row.date_postive}</td>
                    <td>{row.ic}</td>
                    <td>{row.local_lsi_rof}</td>
                    <td>{row.lsi_rof_no}</td>
                    <td>{row.barangay}</td>
                    <td>{row.age}</td>
                    <td>{row.gender}</td>
                    <td>{row.number}</td>
                    <td>{row.status}</td>
                    <td>{row.remarks}</td>
                    <td>{row.place_of_isolation}</td>
                    <td>{row.vaccine}</td>
                    <td>{row.partial_fully_vaccinated}</td>
                    <td>{row.date_of_last_dose}</td>
                    <td>{row.date_swab}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CovidDataTable;
