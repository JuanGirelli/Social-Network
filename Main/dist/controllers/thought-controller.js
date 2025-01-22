import { Thought, User } from '../models/index.js';
export const getThoughts = async (_req, res) => {
    try {
        const thoughts = await Thought.find().sort({ createdAt: -1 });
        return res.json(thoughts);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while fetching thoughts.' });
    }
};
export const getSingleThought = async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with this ID.' });
        }
        return res.json(thought);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while fetching the thought.' });
    }
};
export const createThought = async (req, res) => {
    try {
        const thought = await Thought.create(req.body);
        const user = await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'Thought created, but no user found with this ID.' });
        }
        return res.json({ message: 'Thought successfully created!' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while creating the thought.' });
    }
};
export const updateThought = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $set: req.body }, { runValidators: true, new: true });
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with this ID.' });
        }
        return res.json(thought);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while updating the thought.' });
    }
};
export const deleteThought = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with this ID.' });
        }
        const user = await User.findOneAndUpdate({ thoughts: req.params.thoughtId }, { $pull: { thoughts: req.params.thoughtId } }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'Thought deleted, but no associated user found.' });
        }
        return res.json({ message: 'Thought successfully deleted!' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while deleting the thought.' });
    }
};
export const addReaction = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $addToSet: { reactions: req.body } }, { runValidators: true, new: true });
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with this ID.' });
        }
        return res.json(thought);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while adding the reaction.' });
    }
};
export const removeReaction = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { runValidators: true, new: true });
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with this ID.' });
        }
        return res.json(thought);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while removing the reaction.' });
    }
};
