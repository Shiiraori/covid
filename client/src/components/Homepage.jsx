import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { Chart } from "chart.js/auto";
import "./main.js";
import MostHeader from "./MostHeader.jsx";
import Header from "./Header.jsx";

// import "./assets/js/main.js";

function Homepage() {
  const [covidBarangay, setCovidBarangay] = useState([]);
  const [totalCases, setTotalCases] = useState(null);
  const [statusCounts, setStatusCounts] = useState({});
  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);
  const chartRef3 = useRef(null);
  const chartRef4 = useRef(null);
  const chartRef5 = useRef(null);
  const monthlyCases = useRef(null);
  const barmonthly = useRef(null);
  const pieChart = useRef(null);
  const barangaylineall = useRef(null);
  const chartRefg = useRef(null);
  const chartRefg2 = useRef(null);

  const covidBarangayCount = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/covid/barangaycount",
        {
          method: "GET",
        }
      );
      const jsonData = await response.json();
      //console.log(jsonData)
      setCovidBarangay(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchTotalCases = async () => {
    try {
      const response = await fetch("http://localhost:5000/covid/totalcases");
      const data = await response.json();
      setTotalCases(data.total_cases);
    } catch (err) {
      console.error(err.message);
    }
  };

  const patientStatus = async () => {
    try {
      const response = await fetch("http://localhost:5000/covid/statustest");
      const data = await response.json();
      setStatusCounts(data);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    const fetchDataAll = async () => {
      // Fetch chart data for the bar graph
      const response = await fetch(
        "http://localhost:5000/covid/barangaycountall"
      );
      const chartDataLoc = await response.json();

      const labels = chartDataLoc.map((item) => item.barangay);
      const data1 = chartDataLoc.map((item) => item.total_recovered);
      const data2 = chartDataLoc.map((item) => item.total_deceased);

      // Define chart configuration
      const chartConfig = {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Deceased",
              backgroundColor: "olive",
              data: data2,
            },
            {
              label: "Recovered",
              backgroundColor: "orangered",
              data: data1,
            },
          ],
        },
        options: {
          indexAxis: "y",
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              beginAtZero: true,
            },
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "",
            },
          },
        },
      };

      // Create Chart instance
      const chart = new Chart(chartRef1.current, chartConfig);
      console.log(chartDataLoc); // This logs the entire array

      // Using map to log each barangay
      // chartDataLoc.forEach((item, index) => {
      //   console.log(`Barangay ${index + 1}: ${item.barangay}`);
      // });
      return () => {
        chart.destroy();
      };
    };

    const monthlycase = async () => {
      // Fetch chart data for the bar graph
      const response = await fetch("http://localhost:5000/covid/monthlycases");
      const chartDataLoc = await response.json();

      const data1 = chartDataLoc.map((item) => item.month);
      const data2 = chartDataLoc.map((item) => item.total_cases);

      // Define chart configuration
      const chartConfig = {
        type: "line",
        data: {
          labels: data1,
          datasets: [
            {
              label: "Number of cases",
              backgroundColor: "olive",
              data: data2,
            },
            // {
            //   label: "Recovered",
            //   backgroundColor: "orangered",
            //   data: data1,
            // },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              beginAtZero: true,
            },
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Monthly Cases in 2020",
            },
          },
        },
      };

      // Create Chart instance
      const chart = new Chart(monthlyCases.current, chartConfig);
      console.log(chartDataLoc); // This logs the entire array

      return () => {
        chart.destroy();
      };
    };

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const formatMonthYear = (month, year) => {
      const monthName = months[parseInt(month) - 1];
      return `${monthName} ${year}`;
    };

    const barmonthlydata = async () => {
      // Fetch chart data for the bar graph
      const response = await fetch("http://localhost:5000/covid/monthlydata");
      const chartDataLoc = await response.json();

      const labels = chartDataLoc.map((item) =>
        formatMonthYear(item.month, item.year)
      );
      const data1 = chartDataLoc.map((item) => item.total_recovered);
      const data2 = chartDataLoc.map((item) => item.total_deceased);

      // Define chart configuration
      const chartConfig = {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Deceased",
              backgroundColor: "olive",
              data: data2,
            },
            {
              label: "Recovered",
              backgroundColor: "orangered",
              data: data1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              beginAtZero: true,
            },
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "",
            },
          },
        },
      };

      // Create Chart instance
      const chart = new Chart(barmonthly.current, chartConfig);
      console.log(chartDataLoc); // This logs the entire array

      return () => {
        chart.destroy();
      };
    };

    const colors = [
      "red",
      "blue",
      "green",
      "palegreen",
      "orange",
      "palevioletred",
      "saddlebrown",
      "seagreen",
      "salmon",
      "silver",
      "tan",
      "tomato",
      "violet",
      "yellowgreen",
      "antiquewhite",
      "coral",
      "brown",
      "cyan",
      "darkblue",
      "darkcyan",
      "darkgoldenrod",
      "darkgray",
      "darkgreen",
      "darkkhaki",
      "darkmagenta",
      "darkolivegreen",
      "darkorange",
      "darkorchid",
      "darkred",
      "darksalmon",
      "darkseagreen",
      "darkslateblue",
      "darkslategray",
      "darkturquoise",
      "darkviolet",
      "deeppink",
      "deepskyblue",
    ];

    const fetchChartRecoveredData = async () => {
      const response = await fetch(
        "http://localhost:5000/covid/recoveredcountbygenderage"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const chartDataLoc = await response.json();

      // Verify the fetched data
      console.log("Fetched Data:", chartDataLoc);

      const uniqueAges = [...new Set(chartDataLoc.map((item) => item.age))];
      uniqueAges.sort((a, b) => a - b);

      const maleData = uniqueAges.map((age) => {
        const item = chartDataLoc.find(
          (data) => data.age === age && data.gender === "M"
        );
        return item ? parseInt(item.recovered_count, 10) : 0;
      });

      const femaleData = uniqueAges.map((age) => {
        const item = chartDataLoc.find(
          (data) => data.age === age && data.gender === "F"
        );
        return item ? parseInt(item.recovered_count, 10) : 0;
      });

      // Check the lengths and values of the arrays
      console.log("Unique Ages:", uniqueAges);
      console.log("Female Data:", femaleData);
      console.log("Male Data:", maleData);

      // Determine the maximum value for the scale
      const maxValue = Math.max(...maleData, ...femaleData);

      const chartConfig = {
        type: "bar",
        data: {
          labels: uniqueAges,
          datasets: [
            {
              label: "Female",
              stack: "Stack 0",
              backgroundColor: "purple",
              //turn female data into negative numbers so that it is displayed opposite to the
              //male data
              data: femaleData.map((k) => -k),
            },
            {
              label: "Male",
              stack: "Stack 0",
              backgroundColor: "blue",
              data: maleData,
            },
          ],
        },
        options: {
          indexAxis: "y",
          plugins: {
            tooltip: {
              callbacks: {
                label: (c) => {
                  //convert the female data to a positive number
                  const value = Number(c.raw);
                  const positiveOnly = value < 0 ? -value : value;
                  return `${c.dataset.label}: ${positiveOnly.toString()}`;
                },
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Number of Recovered",
              },
              ticks: {
                //x-axis is always positive
                callback: (v) => (v < 0 ? -v : v),
              },
              max: maxValue, // Set max value for equal scale
              min: -maxValue, // Set min value for equal scale
            },
            y: {
              title: {
                display: true,
                text: "Age",
              },
            },
          },
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: true,
            position: "right",
          },
          title: {
            display: true,
            text: "Recovered Count by Gender and Age",
          },
        },
      };

      // Create Chart instance
      const chart = new Chart(chartRefg.current, chartConfig);

      return () => {
        chart.destroy();
      };
    };

    const fetchChartDeceasedData = async () => {
      const response = await fetch(
        "http://localhost:5000/covid/deceasedcountbygenderage"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const chartDataLoc = await response.json();

      // Verify the fetched data
      console.log("Fetched Data:", chartDataLoc);

      const uniqueAges = [...new Set(chartDataLoc.map((item) => item.age))];
      uniqueAges.sort((a, b) => a - b);

      const maleData = uniqueAges.map((age) => {
        const item = chartDataLoc.find(
          (data) => data.age === age && data.gender === "M"
        );
        return item ? parseInt(item.deceased_count, 10) : 0;
      });

      const femaleData = uniqueAges.map((age) => {
        const item = chartDataLoc.find(
          (data) => data.age === age && data.gender === "F"
        );
        return item ? parseInt(item.deceased_count, 10) : 0;
      });

      // Check the lengths and values of the arrays
      console.log("Deceased Unique Ages:", uniqueAges);
      console.log("Deceased Female Data:", femaleData);
      console.log("Deceased Male Data:", maleData);

      // Determine the maximum value for the scale
      const maxValue = Math.max(...maleData, ...femaleData);

      const chartConfig = {
        type: "bar",
        data: {
          labels: uniqueAges,
          datasets: [
            {
              label: "Female",
              stack: "Stack 0",
              backgroundColor: "purple",
              //turn female data into negative numbers so that it is displayed opposite to the
              //male data
              data: femaleData.map((k) => -k),
            },
            {
              label: "Male",
              stack: "Stack 0",
              backgroundColor: "blue",
              data: maleData,
            },
          ],
        },
        options: {
          indexAxis: "y",
          plugins: {
            tooltip: {
              callbacks: {
                label: (c) => {
                  //convert the female data to a positive number
                  const value = Number(c.raw);
                  const positiveOnly = value < 0 ? -value : value;
                  return `${c.dataset.label}: ${positiveOnly.toString()}`;
                },
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Number of Deceased",
              },
              ticks: {
                //x-axis is always positive
                callback: (v) => (v < 0 ? -v : v),
              },
              max: maxValue, // Set max value for equal scale
              min: -maxValue, // Set min value for equal scale
            },
            y: {
              title: {
                display: true,
                text: "Age",
              },
            },
          },
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: true,
            position: "right",
          },
          title: {
            display: true,
            text: "Deceased Count by Gender and Age",
          },
        },
      };

      // Create Chart instance
      const chart = new Chart(chartRefg2.current, chartConfig);

      return () => {
        chart.destroy();
      };
    };

    covidBarangayCount();
    patientStatus();
    fetchTotalCases();
    fetchDataAll();
    monthlycase();
    barmonthlydata();
    fetchChartRecoveredData();
    fetchChartDeceasedData();
  }, []);

  return (
    <>
      <MostHeader />
      <Header />

      <section id="hero" class="d-flex align-items-center">
        <div class="container">
          <h1>Iligan City Covid Data</h1>
          {/* <h2>Covid casescases from 2016 to 2021.</h2> */}
          <a href="#about" class="btn-get-started scrollto">
            See Info
          </a>
        </div>
      </section>

      <main id="main">
        <section id="why-us" class="why-us">
          <div class="container">
            <div class="row">
              <div class="col-lg-4 d-flex align-items-stretch">
                <div class="content">
                  <h3>What is COVID-19?</h3>
                  <p>
                    COVID-19 is a respiratory illness caused by the novel
                    coronavirus SARS-CoV-2. It can cause mild to severe illness
                    and, in some cases, can be fatal. The virus primarily
                    spreads through respiratory droplets when an infected person
                    coughs, sneezes, or talks.
                  </p>
                </div>
              </div>
              <div class="col-lg-8 d-flex align-items-stretch">
                <div class="icon-boxes d-flex flex-column justify-content-center">
                  <div class="row">
                    <div class="col-xl-4 d-flex align-items-stretch">
                      <div class="icon-box mt-4 mt-xl-0">
                        <i class="bx bxs-detail"></i>
                        <h4>Symptom 1</h4>
                        <p>
                          Fever: A fever is a common symptom of COVID-19, with
                          temperatures often exceeding 100.4°F (38°C).
                        </p>
                      </div>
                    </div>
                    <div class="col-xl-4 d-flex align-items-stretch">
                      <div class="icon-box mt-4 mt-xl-0">
                        <i class="bx bxs-detail"></i>
                        <h4>Symptom 2</h4>
                        <p>
                          Fatigue: Feeling unusually tired or fatigued is
                          another common symptom, which can persist for weeks
                          after the acute illness has resolved.
                        </p>
                      </div>
                    </div>
                    <div class="col-xl-4 d-flex align-items-stretch">
                      <div class="icon-box mt-4 mt-xl-0">
                        <i class="bx bxs-detail"></i>
                        <h4>Symptom 3</h4>
                        <p>
                          Muscle or Body Aches: Muscle pain or body aches are
                          common symptoms that can occur with COVID-19
                          infection.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" class="about">
          <div class="container-fluid">
            <div class="row">
              <div class="col-xl-5 col-lg-6 video-box d-flex justify-content-center align-items-stretch position-relative">
                <a
                  href="https://www.youtube.com/watch?v=5DGwOJXSxqg&pp=ygUGY292aWQg"
                  class="glightbox play-btn mb-4"
                ></a>
              </div>

              <div class="col-xl-7 col-lg-6 icon-boxes d-flex flex-column align-items-stretch justify-content-center py-5 px-lg-5">
                <h3>Government Response to COVID-19 in Iligan City</h3>
                <p>
                  The Philippine government implemented various strategies to
                  combat COVID-19. Here's a breakdown of some key initiatives:
                </p>

                <div class="icon-box">
                  <div class="icon">
                    <i class="bx bxs-error-alt"></i>
                  </div>
                  <h4 class="title">
                    <a href="#about">1. Surveillance and Early Warning:</a>
                  </h4>
                  <p class="description">
                    Enhanced disease surveillance: Expanded data collection and
                    monitoring systems to track cases, identify outbreaks early,
                    and inform proactive responses.
                    <br />
                    Public awareness campaigns: Launched nationwide campaigns to
                    educate communities about COVID-19 prevention, symptoms, and
                    treatment.
                    <br />
                    Hotspot identification: Pinpointed areas with high caseloads
                    and targeted interventions there.
                  </p>
                </div>

                <div class="icon-box">
                  <div class="icon">
                    <i class="bx bxs-add-to-queue"></i>
                  </div>
                  <h4 class="title">
                    <a href="#about">2. Clinical Management:</a>
                  </h4>
                  <p class="description">
                    Healthcare infrastructure enhancement: Upgraded medical
                    facilities and equipment to handle COVID-19 cases.
                    <br />
                    Training and education: Conducted training programs and
                    educational campaigns to enhance public health response
                    capabilities.
                  </p>
                </div>

                <div class="icon-box">
                  <div class="icon">
                    <i class="bx bx-atom"></i>
                  </div>
                  <h4 class="title">
                    <a href="#about">3. Economic Support:</a>
                  </h4>
                  <p class="description">
                    Financial assistance: Provided financial aid to individuals
                    and businesses affected by the pandemic.
                    <br />
                    Stimulus packages: Implemented economic stimulus packages to
                    revive the economy and support recovery efforts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="counts" class="counts">
          <div class="container">
            <div class="row">
              <div class="col-lg-3 col-md-6">
                <div class="count-box">
                  <i class="fas fa-city"></i>
                  <span
                    data-purecounter-start="0"
                    data-purecounter-end="17"
                    data-purecounter-duration="1"
                    class="purecounter"
                  >
                    {covidBarangay.length}
                  </span>
                  <p>Cities Affected</p>
                </div>
              </div>

              <div class="col-lg-3 col-md-6 mt-5 mt-md-0">
                <div class="count-box">
                  <i class="far fa-hospital"></i>
                  <span class="purecounter">
                    {statusCounts.total_recovered}
                  </span>

                  <div></div>
                  <p>Recovered</p>
                </div>
              </div>

              <div class="col-lg-3 col-md-6 mt-5 mt-lg-0">
                <div class="count-box">
                  <i class="far fa-clipboard"></i>
                  <span
                    data-purecounter-start="0"
                    data-purecounter-end="32701"
                    data-purecounter-duration="1"
                    class="purecounter"
                  >
                    {statusCounts.total_deceased}
                  </span>
                  <p>Deceased</p>
                </div>
              </div>

              <div class="col-lg-3 col-md-6 mt-5 mt-lg-0">
                <div class="count-box">
                  <i class="fas fa-clipboard-list"></i>
                  <span
                    data-purecounter-start="0"
                    data-purecounter-end="1166364"
                    data-purecounter-duration="1"
                    class="purecounter"
                  >
                    {totalCases}
                  </span>
                  <p>Overall Cases</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" class="services">
          <div class="container">
            <div class="section-title">
              <h2>Covid Data in Iligan City</h2>
              <p>
                This Bar Charts Shows the cases and deaths in different
                barangays of Iligan City.
              </p>
            </div>

            <div class="row">
              <div class="">
                <div class="container mt-5">
                  <canvas ref={chartRef1} width="1200" height="1200"></canvas>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="departments" class="departments">
          <div class="container">
            <div class="section-title">
              <h2>covid Data</h2>
              <p></p>
            </div>

            <div class="row gy-4">
              <div class="col-lg-3">
                <ul class="nav nav-tabs flex-column">
                  <li class="nav-item">
                    <a
                      class="nav-link active show"
                      data-bs-toggle="tab"
                      href="#tab-1"
                    >
                      Line Chart - Monthly Cases
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" data-bs-toggle="tab" href="#tab-2">
                      Radar Chart - Data by Month
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" data-bs-toggle="tab" href="#tab-3">
                      Vertical Bar Chart - Recovered by Gender and Age
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" data-bs-toggle="tab" href="#tab-4">
                      Vertical Bar Chart - Deceased by Gender and Age
                    </a>
                  </li>
                </ul>
              </div>
              <div class="col-lg-9">
                <div class="tab-content">
                  <div class="tab-pane active show" id="tab-1">
                    <div class="row gy-4">
                      <div class="col-lg-14 details order-1 order-lg-1">
                        <canvas
                          ref={monthlyCases}
                          width="800"
                          height="300"
                        ></canvas>
                      </div>
                    </div>
                  </div>
                  <div class="tab-pane" id="tab-2">
                    <div class="row gy-4">
                      <div class="col-lg-14 details order-2 order-lg-1">
                        {/* <!-- Radar Chart Container --> */}

                        <canvas
                          ref={barmonthly}
                          width="1000"
                          height="600"
                        ></canvas>
                      </div>
                    </div>
                  </div>
                  <div class="tab-pane" id="tab-3">
                    <div class="row gy-4">
                      <div class="col-lg-14 details order-2 order-lg-1">
                        {/* <!-- Pie Chart Container for all the region counts --> */}
                        <canvas
                          ref={chartRefg}
                          width="400"
                          height="400"
                        ></canvas>
                      </div>
                    </div>
                  </div>
                  <div class="tab-pane" id="tab-4">
                    <div class="row gy-4">
                      <div class="col-lg-14 details order-2 order-lg-1">
                        {/* <!-- Line Chart Container for Region Data --> */}
                        <canvas
                          ref={chartRefg2}
                          width="800"
                          height="500"
                        ></canvas>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" class="faq section-bg">
          <div class="container">
            <div class="section-title">
              <h2>COVID-19 FAQs</h2>
              <p>Learn more about COVID-19, its prevention, and management.</p>
            </div>

            <div class="faq-list">
              <ul>
                <li data-aos="fade-up">
                  <i class="bx bxs-pencil icon-help"></i>
                  <a
                    data-bs-toggle="collapse"
                    class="collapse"
                    data-bs-target="#faq-list-1"
                  >
                    What are the symptoms of COVID-19?{" "}
                    <i class="bx bx-chevron-down icon-show"></i>
                    <i class="bx bx-chevron-up icon-close"></i>
                  </a>
                  <div
                    id="faq-list-1"
                    class="collapse show"
                    data-bs-parent=".faq-list"
                  >
                    <p>
                      COVID-19 symptoms can vary, but commonly include fever,
                      cough, fatigue, shortness of breath, and loss of taste or
                      smell. It's important to get tested if you experience
                      these symptoms.
                    </p>
                  </div>
                </li>

                <li data-aos="fade-up" data-aos-delay="100">
                  <i class="bx bxs-pencil icon-help"></i>
                  <a
                    data-bs-toggle="collapse"
                    data-bs-target="#faq-list-2"
                    class="collapsed"
                  >
                    How can I protect myself and others from COVID-19?{" "}
                    <i class="bx bx-chevron-down icon-show"></i>
                    <i class="bx bx-chevron-up icon-close"></i>
                  </a>
                  <div
                    id="faq-list-2"
                    class="collapse"
                    data-bs-parent=".faq-list"
                  >
                    <p>
                      To protect yourself and others, practice good hygiene
                      (wash hands frequently, avoid touching your face), wear a
                      mask in public places, maintain physical distance from
                      others, and follow local health guidelines.
                    </p>
                  </div>
                </li>

                <li data-aos="fade-up" data-aos-delay="200">
                  <i class="bx bxs-pencil icon-help"></i>
                  <a
                    data-bs-toggle="collapse"
                    data-bs-target="#faq-list-3"
                    class="collapsed"
                  >
                    Is there a vaccine for COVID-19?{" "}
                    <i class="bx bx-chevron-down icon-show"></i>
                    <i class="bx bx-chevron-up icon-close"></i>
                  </a>
                  <div
                    id="faq-list-3"
                    class="collapse"
                    data-bs-parent=".faq-list"
                  >
                    <p>
                      Yes, several vaccines have been developed and authorized
                      for emergency use to protect against COVID-19. Vaccination
                      is a key tool in controlling the spread of the virus.
                    </p>
                  </div>
                </li>

                <li data-aos="fade-up" data-aos-delay="300">
                  <i class="bx bxs-pencil icon-help"></i>
                  <a
                    data-bs-toggle="collapse"
                    data-bs-target="#faq-list-4"
                    class="collapsed"
                  >
                    What should I do if I think I have COVID-19?{" "}
                    <i class="bx bx-chevron-down icon-show"></i>
                    <i class="bx bx-chevron-up icon-close"></i>
                  </a>
                  <div
                    id="faq-list-4"
                    class="collapse"
                    data-bs-parent=".faq-list"
                  >
                    <p>
                      If you think you have COVID-19, stay home and self-isolate
                      to avoid spreading the virus. Contact a healthcare
                      provider for guidance on testing and care.
                    </p>
                  </div>
                </li>

                <li data-aos="fade-up" data-aos-delay="400">
                  <i class="bx bxs-pencil icon-help"></i>
                  <a
                    data-bs-toggle="collapse"
                    data-bs-target="#faq-list-5"
                    class="collapsed"
                  >
                    How can I support the COVID-19 response?{" "}
                    <i class="bx bx-chevron-down icon-show"></i>
                    <i class="bx bx-chevron-up icon-close"></i>
                  </a>
                  <div
                    id="faq-list-5"
                    class="collapse"
                    data-bs-parent=".faq-list"
                  >
                    <p>
                      You can support the COVID-19 response by following public
                      health guidelines, staying informed, and helping others in
                      need. Donating to organizations working on COVID-19 relief
                      efforts is also helpful.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <footer id="footer">
          <div className="footer-top">
            <div className="container">
              <div className="row">
                <div className="col-lg-7 col-md-6 footer-contact">
                  <h3>Iligan City Covid Data</h3>
                  <p>
                    MSU-Iligan Institute of Technology <br />
                    Tibanga, Iligan City, 9200
                    <br />
                    Mindanao, Philippines
                  </p>
                </div>

                <div className="container d-md-flex">
                  <div className="me-md-auto text-center text-md-start">
                    <div className="credits">
                      Designed by{" "}
                      <a href="https://bootstrapmade.com/">BootstrapMade</a>
                    </div>
                  </div>
                  <div className="social-links text-center text-md-right pt-3 pt-md-0">
                    <a href="#" className="twitter">
                      <i className="bx bxl-twitter"></i>
                    </a>
                    <a href="#" className="facebook">
                      <i className="bx bxl-facebook"></i>
                    </a>
                    <a href="#" className="instagram">
                      <i className="bx bxl-instagram"></i>
                    </a>
                    <a href="#" className="google-plus">
                      <i className="bx bxl-skype"></i>
                    </a>
                    <a href="#" className="linkedin">
                      <i className="bx bxl-linkedin"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

export default Homepage;
