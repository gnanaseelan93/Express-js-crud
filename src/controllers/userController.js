//Standard user controller functions
import userService from '../services/userService.js';
import logger from '../config/logger.js';

const handleResponse = (res,status, message,data=null) => {
    res.status(status).json({
        status,
        message,
        data
    });
};


export const createUser = async (req, res, next) => {
    const { name, email } = req.body;
    try {
        const newUser = await userService.createUserService(name, email);
        handleResponse(res,201, 'User created successfully', newUser);
    } catch (error) {
        logger.error(`Error creating user: ${error.message}`);
        next(error);
    }
};

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsersService();
        handleResponse(res, 200, 'Users retrieved successfully', users);
    } catch (error) {
        logger.error(`Error retrieving users: ${error.message}`);
        next(error);
    }
};

export const getUserById = async (req, res, next) => {
    
    try {
        const user = await userService.getUserByIdService(req.params.id);
        if (!user) {
            return handleResponse(res,404, 'User not found');
        }
        handleResponse(res, 200, 'User retrieved successfully', user);
    } catch (error) {
        logger.error(`Error retrieving user: ${error.message}`);
        next(error);
    }
};

export const updateUser = async (req, res, next) => {
    const { name, email } = req.body;
    try {
        const updatedUser = await userService.updateUserService(req.params.id, name, email);
        if (!updatedUser) {
            return handleResponse(res, 404, 'User not found');
        }
        handleResponse(res, 200, 'User updated successfully', updatedUser);
    } catch (error) {
        logger.error(`Error updating user: ${error.message}`);
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await userService.deleteUserService(req.params.id);
        if (!deletedUser) {
            return handleResponse(res, 404, 'User not found');
        }
        handleResponse(res, 200, 'User deleted successfully', deletedUser);
    } catch (error) {
        logger.error(`Error deleting user: ${error.message}`);
        next(error);
    }
};
