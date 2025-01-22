import { Request, Response } from 'express';
import { User, Thought } from '../models/index.js';

// Get all users
export const getUsers = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const users = await User.find().select('-__v');
    return res.json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while fetching users.' });
  }
};

// Get a single user by ID
export const getSingleUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await User.findById(req.params.userId)
      .select('-__v')
      .populate('friends')
      .populate('thoughts');

    if (!user) {
      return res.status(404).json({ message: 'No user found with this ID.' });
    }

    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while fetching the user.' });
  }
};

// Create a new user
export const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await User.create(req.body);
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while creating the user.' });
  }
};

// Update a user by ID
export const updateUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'No user found with this ID.' });
    }

    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while updating the user.' });
  }
};

// Delete a user by ID
export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: 'No user found with this ID.' });
    }

    await Thought.deleteMany({ _id: { $in: user.thoughts } });
    return res.json({ message: 'User and associated thoughts deleted!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while deleting the user.' });
  }
};

// Add a friend
export const addFriend = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'No user found with this ID.' });
    }

    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while adding the friend.' });
  }
};

// Remove a friend
export const removeFriend = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'No user found with this ID.' });
    }

    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while removing the friend.' });
  }
};
