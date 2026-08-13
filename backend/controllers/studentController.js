import pool from "../config/db.js";

export const getStudents = async (req, res) => {
  try {
    const students = await pool.query(`
      SELECT
        id,
        name,
        email,
        phone,
        class,
        status,
        created_at AS "createdAt"
      FROM students
      ORDER BY created_at DESC
    `);
    res.send(students?.rows);
  } catch (err) {
    next(err);
  }
};

export const addStudent = async (req, res, next) => {
  const { name, email, phone, status, class: studentClass } = req?.body;
  try {
    const { name, email, phone, class: studentClass, status } = req.body?.data;

    if (!name || !email || !phone || !studentClass || !status) {
      next({ code: 400, message: "All fields are required" }, res, res, next);
    }

    const result = await pool.query(
      `
        INSERT INTO students
        (name, email, phone, class, status)

        VALUES ($1, $2, $3, $4, $5)

        RETURNING
          id,
          name,
          email,
          phone,
          class,
          status,
          created_at AS "createdAt"
      `,
      [name, email, phone, studentClass, status],
    );
    console.log(result?.rows[0]);
    return res.status(201).json({
      message: "Student added successfully",
      student: result.rows[0],
    });
  } catch (err) {
    next(err);
  }
};
