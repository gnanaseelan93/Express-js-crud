import pool from "../config/db.js";
import logger from "../config/logger.js";

export const getAllUsers = async () => {
  try {
    logger.debug("DB: Executing query -> SELECT * FROM users");
    const result = await pool.query("SELECT * FROM users");
    logger.info(`DB: Retrieved ${result.rows.length} users`);
    return result.rows;
  } catch (error) {
    logger.error(`DB Error (getAllUsers): ${error.message}`);
    throw error; // rethrow to service/controller
  }
};

export const getUserById = async (id) => {
  try {
    logger.debug(`DB: Executing query -> SELECT * FROM users WHERE id=${id}`);
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (!result?.rows?.length) {
      logger.warn(`DB: No user found with ID=${id}`);
      return null;
    }

    logger.info(`DB: Retrieved user ID=${id}`);
    return result.rows[0];
  } catch (error) {
    logger.error(`DB Error (getUserById): ${error.message}`);
    throw error;
  }
};

export const createUser = async (name, email) => {
  try {
    logger.debug(`DB: Inserting new user (name=${name}, email=${email})`);
    const result = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );
    logger.info(`DB: User created with ID=${result.rows[0].id}`);
    return result.rows[0];
  } catch (error) {
    logger.error(`DB Error (createUser): ${error.message}`);
    throw error;
  }
};

export const updateUser = async (id, name, email) => {
  try {
    logger.debug(`DB: Updating user ID=${id}`);
    const result = await pool.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
      [name, email, id]
    );
    if (!result.rows.length) {
      logger.warn(`DB: No user found to update with ID=${id}`);
      return null;
    }

    logger.info(`DB: User updated ID=${id}`);
    return result.rows[0];
  } catch (error) {
    logger.error(`DB Error (updateUser): ${error.message}`);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    logger.debug(`DB: Deleting user ID=${id}`);
    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );
    if (!result?.rows?.length) {
      logger.warn(`DB: No user found to delete with ID=${id}`);
      return null;
    }
    logger.info(`DB: Deleted user ID=${id}`);
    return result.rows[0];
  } catch (error) {
    logger.error(`DB Error (deleteUser): ${error.message}`);
    throw error;
  }
};

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
