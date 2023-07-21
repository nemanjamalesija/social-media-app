import { Request, Response } from 'express';
import catchAsync from '../helpers/catchAsync.ts';
import User from '../models/User.ts';
import controllerFactory from './controllerFactory.ts';
import userServices from '../services/userServices.ts';

const getAllUsers = controllerFactory.getAll(User);
const createUser = controllerFactory.createOne(User);

const getOneUser = catchAsync(async (req: Request, res: Response) => {
  const targetUser = await userServices.getOneUser(req.params.id);

  if (req.body.currentUser.id !== targetUser.id) {
    const isFriendRequested = targetUser.friendRequests.some(
      (friend) => friend.id === req.body.currentUser.id
    );

    const isAlreadyFriends = targetUser.friends.some(
      (friend) => friend.id === req.body.currentUser.id
    );

    res.status(200).json({
      status: 'success',
      data: {
        isAlreadyFriends: isAlreadyFriends,
        isFriendRequested: isFriendRequested,
        targetUser,
      },
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      targetUser,
    },
  });
});

const addFriend = catchAsync(async (req: Request, res: Response) => {
  const currentUserId = req.body.currentUser.id;
  const targetUserId = req.body.id;

  await userServices.addFriend(currentUserId, targetUserId);

  res.status(200).json({
    status: 'success',
    data: null,
  });
});

const acceptFriendRequest = catchAsync(async (req: Request, res: Response) => {
  const currentUserId = req.body.currentUser.id;
  const targetUserId = req.body.id;

  await userServices.acceptFriendRequest(currentUserId, targetUserId);

  res.status(200).json({
    status: 'success',
    data: null,
  });
});

const denyFriendRequest = catchAsync(async (req: Request, res: Response) => {
  const currentUserId = req.body.currentUser.id;
  const targetUserId = req.body.id;

  await userServices.dennyFriendRequest(currentUserId, targetUserId);

  res.status(204).json({
    status: 'sucess',
    data: null,
  });
});

const removeFriend = catchAsync(async (req: Request, res: Response) => {
  const currentUserId = req.body.currentUser.id;
  const targetUserId = req.body.id;

  await userServices.removeFriend(currentUserId, targetUserId);

  res.status(204).json({
    status: 'sucess',
    data: null,
  });
});

export default {
  getAllUsers,
  createUser,
  addFriend,
  acceptFriendRequest,
  getOneUser,
  denyFriendRequest,
  removeFriend,
};
