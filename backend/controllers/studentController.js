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

export const deleteStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `
        DELETE FROM students
        WHERE id = $1
        RETURNING id
      `,
      [id],
    );
    res.send({ message: "Student Deleted Successfully", id });
  } catch (err) {
    next(err);
  }
};

export const updateStudent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { name, email, phone, class: studentClass, status } = req.body?.data;

    if (!name || !email || !phone || !studentClass || !status) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const result = await pool.query(
      `
        UPDATE students
        SET
          name = $1,
          email = $2,
          phone = $3,
          class = $4,
          status = $5
        WHERE id = $6
        RETURNING
          id,
          name,
          email,
          phone,
          class,
          status,
          created_at AS "createdAt"
      `,
      [name, email, phone, studentClass, status, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Student not found",
      });
    }
      return res.status(200).json({
      message: "Student updated successfully",
      student: result.rows[0],
    });
  } catch (err) {
    next(err);
  }
};
