import {getAllUsers,getUserById,createUser,updateUser,deleteUser} from '../models/userModel.js';
import logger from '../config/logger.js';


/**
 * Service: Fetch all users
 */
const getAllUsersService = async () => {
  try {
    logger.debug('Service: getAllUsersService called');
    const users = await getAllUsers();

    if (!users || users.length === 0) {
      logger.warn('Service: No users found in database');
      return [];
    }

    logger.info(`Service: Retrieved ${users.length} users`);
    return users;
  } catch (error) {
    logger.error(`Service Error (getAllUsersService): ${error.message}`, { stack: error.stack });
    throw error;
  }
};

/**
 * Service: Get a user by ID
 */
const getUserByIdService = async (id) => {
  try {
    logger.debug(`Service: getUserByIdService called with id=${id}`);
    const user = await getUserById(id);

    if (!user) {
      logger.warn(`Service: User not found with ID=${id}`);
      return null;
    }

    logger.info(`Service: Retrieved user ID=${id}`);
    return user;
  } catch (error) {
    logger.error(`Service Error (getUserByIdService): ${error.message}`, { stack: error.stack });
    throw error;
  }
};

/**
 * Service: Create a new user
 */
const createUserService = async (name, email) => {
  try {
    logger.debug('Service: createUserService called', { name, email });
    const newUser = await createUser(name, email);

    logger.info(`Service: User created successfully with ID=${newUser.id}`);
    return newUser;
  } catch (error) {
    logger.error(`Service Error (createUserService): ${error.message}`, { stack: error.stack });
    throw error;
  }
};

/**
 * Service: Update an existing user
 */
const updateUserService = async (id, name, email) => {
  try {
    logger.debug(`Service: updateUserService called with id=${id}`);
    const updatedUser = await updateUser(id, name, email);

    if (!updatedUser) {
      logger.warn(`Service: No user found to update with ID=${id}`);
      return null;
    }

    logger.info(`Service: User updated successfully (ID=${id})`);
    return updatedUser;
  } catch (error) {
    logger.error(`Service Error (updateUserService): ${error.message}`, { stack: error.stack });
    throw error;
  }
};

/**
 * Service: Delete a user
 */
const deleteUserService = async (id) => {
  try {
    logger.debug(`Service: deleteUserService called with id=${id}`);
    const deletedUser = await deleteUser(id);

    if (!deletedUser) {
      logger.warn(`Service: No user found to delete with ID=${id}`);
      return null;
    }

    logger.info(`Service: User deleted successfully (ID=${id})`);
    return deletedUser;
  } catch (error) {
    logger.error(`Service Error (deleteUserService): ${error.message}`, { stack: error.stack });
    throw error;
  }
};


export default {
    getAllUsersService,
    getUserByIdService,
    createUserService,
    updateUserService,
    deleteUserService
};