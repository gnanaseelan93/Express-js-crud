//Standard user controller functions
import userService from '../models/userModel.js';


const handleResponse = (res,status, message,data=null) => {
    res.status(status).json({
        status,
        message,
        data
    });
};


export const createUser = async (req, res, next) => {
    const { name, email } = req.body;
    console.log(name,email);
    try {
        const newUser = await userService.createUserService(name, email);
        handleResponse(res,201, 'User created successfully', newUser);
    } catch (error) {
        next(error);
    }
};

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsersService();
        handleResponse(res, 200, 'Users retrieved successfully', users);
    } catch (error) {
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
        next(error);
    }
};
