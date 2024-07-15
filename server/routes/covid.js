const router = require("express").Router();
const pool = require("../db");

//get all covid data
router.get("/", async (req, res) => {
  try {
    const alldengue = await pool.query("SELECT * FROM covid_records");

    res.json(alldengue.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/test", async (req, res) => {
  try {
    const barangay = "TUBOD";
    const alldengue = await pool.query(
      "SELECT * FROM covid_records WHERE BARANGAY = $1",
      [barangay]
    );

    res.json(alldengue.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/totalcases", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT COUNT(*) AS total_cases FROM covid_records"
    );
    const totalCases = result.rows[0].total_cases;
    res.json({ total_cases: totalCases });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/status", async (req, res) => {
  try {
    const patientStatus = await pool.query(
      "SELECT STATUS, COUNT(*) AS total_recovered_dead FROM covid_records GROUP BY STATUS"
    );
    res.json(patientStatus.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/monthlydata", async (req, res) => {
  try {
    // Retrieve data for barangays 1 to 6
    const barangayCounts1to6 = await pool.query(`
        SELECT
        EXTRACT(MONTH FROM remarks) AS month,
        EXTRACT(YEAR FROM remarks) AS year,
        COUNT(CASE WHEN status = 'RECOVERED' THEN 1 END) AS total_recovered,
        COUNT(CASE WHEN status = 'DECEASED' THEN 1 END) AS total_deceased
    FROM
        covid_records
    GROUP BY
        year,
        month
    ORDER BY
        year,
        month;
    
      `);

    res.json(barangayCounts1to6.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/statustest", async (req, res) => {
  try {
    const patientStatus = await pool.query(`
      SELECT
        SUM(CASE WHEN STATUS = 'RECOVERED' THEN 1 ELSE 0 END) AS total_recovered,
        SUM(CASE WHEN STATUS = 'DECEASED' THEN 1 ELSE 0 END) AS total_deceased
      FROM covid_records
    `);

    res.json(patientStatus.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/barangaycount", async (req, res) => {
  try {
    const barangayCounts = await pool.query(
      "SELECT BARANGAY, COUNT(*) AS total_patients_barangay FROM covid_records GROUP BY BARANGAY"
    );
    res.json(barangayCounts.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/barangaycountall", async (req, res) => {
  try {
    // Retrieve data for barangays 1 to 6
    const barangayCounts1to6 = await pool.query(`
        SELECT
          BARANGAY,
          SUM(CASE WHEN STATUS = 'RECOVERED' THEN 1 ELSE 0 END) AS total_recovered,
          SUM(CASE WHEN STATUS = 'DECEASED' THEN 1 ELSE 0 END) AS total_deceased
        FROM covid_records
        GROUP BY BARANGAY
      `);

    res.json(barangayCounts1to6.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/barangaycount1_6", async (req, res) => {
  try {
    // Retrieve data for barangays 1 to 6
    const barangayCounts1to6 = await pool.query(`
        SELECT
          BARANGAY,
          SUM(CASE WHEN STATUS = 'RECOVERED' THEN 1 ELSE 0 END) AS total_recovered,
          SUM(CASE WHEN STATUS = 'DECEASED' THEN 1 ELSE 0 END) AS total_deceased
        FROM covid_records
        GROUP BY BARANGAY
        LIMIT 6
      `);

    res.json(barangayCounts1to6.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/barangaycount7_13", async (req, res) => {
  try {
    // Retrieve data for barangays 7 to 13
    const barangayCounts7to13 = await pool.query(`
        SELECT
          BARANGAY,
          SUM(CASE WHEN STATUS = 'RECOVERED' THEN 1 ELSE 0 END) AS total_recovered,
          SUM(CASE WHEN STATUS = 'DECEASED' THEN 1 ELSE 0 END) AS total_deceased
        FROM covid_records
        GROUP BY BARANGAY 
        LIMIT 6 OFFSET 6
        `);

    res.json(barangayCounts7to13.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/barangaycount14_20", async (req, res) => {
  try {
    // Retrieve data for barangays 14 to 20
    const barangayCounts14to20 = await pool.query(` 
        SELECT
          BARANGAY,
          SUM(CASE WHEN STATUS = 'RECOVERED' THEN 1 ELSE 0 END) AS total_recovered,
          SUM(CASE WHEN STATUS = 'DECEASED' THEN 1 ELSE 0 END) AS total_deceased
        FROM covid_records
        GROUP BY BARANGAY        
        LIMIT 6 OFFSET 12
        `);

    res.json(barangayCounts14to20.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/barangaycount21_27", async (req, res) => {
  try {
    // Retrieve data for barangays 21 to 27
    const barangayCounts21to27 = await pool.query(`
    SELECT
      BARANGAY,
      SUM(CASE WHEN STATUS = 'RECOVERED' THEN 1 ELSE 0 END) AS total_recovered,
      SUM(CASE WHEN STATUS = 'DECEASED' THEN 1 ELSE 0 END) AS total_deceased
    FROM covid_records
    GROUP BY BARANGAY
    LIMIT 6 OFFSET 18
    `);

    res.json(barangayCounts21to27.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/barangaycount28_35", async (req, res) => {
  try {
    // Retrieve data for barangays 28 to 35
    const barangayCounts28to35 = await pool.query(`
    SELECT
      BARANGAY,
      SUM(CASE WHEN STATUS = 'RECOVERED' THEN 1 ELSE 0 END) AS total_recovered,
      SUM(CASE WHEN STATUS = 'DECEASED' THEN 1 ELSE 0 END) AS total_deceased
    FROM covid_records
    GROUP BY BARANGAY  
    LIMIT 7 OFFSET 24
    `);

    res.json(barangayCounts28to35.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/monthlycases", async (req, res) => {
  try {
    // Retrieve monthly cases
    const barangayCounts7to13 = await pool.query(`
        SELECT
          TO_CHAR(date_postive, 'Month') AS month,
          COUNT(*) AS total_cases
        FROM
            covid_records
        GROUP BY
            TO_CHAR(date_postive, 'Month')
        ORDER BY
        MIN(date_postive);
        `);

    res.json(barangayCounts7to13.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// router.get("/barangaycounttest", async (req, res) => {
//   try {
//     // Retrieve data for barangays 1 to 6
//     const barangayCounts1to6 = await pool.query("SELECT BARANGAY, COUNT(*) AS total_patients_barangay FROM covid_records GROUP BY BARANGAY LIMIT 6");

//     // Retrieve data for barangays 7 to 13
//     const barangayCounts7to13 = await pool.query("SELECT BARANGAY, COUNT(*) AS total_patients_barangay FROM covid_records GROUP BY BARANGAY LIMIT 6 OFFSET 6");

//     // Retrieve data for barangays 14 to 20
//     const barangayCounts14to20 = await pool.query("SELECT BARANGAY, COUNT(*) AS total_patients_barangay FROM covid_records GROUP BY BARANGAY LIMIT 6 OFFSET 12");

//     // Retrieve data for barangays 21 to 27
//     const barangayCounts21to27 = await pool.query("SELECT BARANGAY, COUNT(*) AS total_patients_barangay FROM covid_records GROUP BY BARANGAY LIMIT 6 OFFSET 18");

//     // Retrieve data for barangays 28 to 35
//     const barangayCounts28to35 = await pool.query("SELECT BARANGAY, COUNT(*) AS total_patients_barangay FROM covid_records GROUP BY BARANGAY LIMIT 7 OFFSET 24");

//     res.json({
//       barangayCounts1to6: barangayCounts1to6.rows,
//       barangayCounts7to13: barangayCounts7to13.rows,
//       barangayCounts14to20: barangayCounts14to20.rows,
//       barangayCounts21to27: barangayCounts21to27.rows,
//       barangayCounts28to35: barangayCounts28to35.rows
//     });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ message: "Server error" });
//   }
// });

router.get("/recoveredcountbygenderage", async (req, res) => {
  try {
    const recoveredCounts = await pool.query(`
      SELECT
        gender,
        age,
        COUNT(*) AS recovered_count
      FROM
        covid_records
      WHERE
        status = 'RECOVERED'
      GROUP BY
        gender, age
      ORDER BY
        age
    `);

    res.json(recoveredCounts.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/deceasedcountbygenderage", async (req, res) => {
  try {
    const deceasedCounts = await pool.query(`
      SELECT
        gender,
        age,
        COUNT(*) AS deceased_count
      FROM
        covid_records
      WHERE
        status = 'DECEASED'
      GROUP BY
        gender, age
      ORDER BY
        age
    `);

    res.json(deceasedCounts.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const dengue = await pool.query(
      "SELECT * FROM covid_records WHERE number = $1",
      [id]
    );

    res.json(dengue.rows);
  } catch (err) {
    console.error(err.message);
  }
});
router.get("/test/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dengue = await pool.query(
      "SELECT * FROM covid_records WHERE barangay = $1",
      [id]
    );

    // Check if any rows were returned
    if (dengue.rows.length > 0) {
      res.json(dengue.rows);
    } else {
      res
        .status(404)
        .json({ message: "No data found for the specified barangay." });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
