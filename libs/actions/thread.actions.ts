"use server";
import { revalidatePath } from "next/cache";
import { connectToDb } from "../../utils/mongoose";
import Thread from "../model/thread.model";
import User from "../model/user.model";
import Community from "../model/community.model";

interface ThreadProp {
  text: string;
  userId: string;
  parentId?: string;
  path: string;
  communityId: any;
}
export const createThread = async ({
  text,
  userId,
  parentId,
  path,
  communityId,
}: ThreadProp) => {
  try {
    await connectToDb();
    const user = await User.findById(userId);
    if (!user) return console.log("User does not exists");

    const community = await Community.findOne({ id: communityId });

    const newThread = await Thread.create({
      text: text,
      author: user._id,
      parent: parentId || null,
      community: community?._id || null,
    });
    user.threads.push(newThread._id);
    await user.save();

    if (communityId !== null) {
      community.threads.push(newThread._id);
      await community.save();
    }

    revalidatePath(path);
    console.log("Thread Created Successfully" + newThread);
  } catch (error: any) {
    console.log("Failed to create thread : " + error.message);
  }
};

export const fetchAllThreads = async (currentPage = 1, pageSize = 10) => {
  const skipAmount = (currentPage - 1) * pageSize;
  try {
    connectToDb();
    const threads = await Thread.find({
      parent: { $in: [null, undefined] },
    })
      .sort({ createdAt: "desc" })
      // .skip(skipAmount)
      // .limit(pageSize)
      .populate({
        path: "author",
        model: User,
        select: "name image id",
      })
      .populate({
        path: "community",
        model: Community,
        select: "name image id",
      })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: User,
          select: "_id name parentId image",
        },
      });

    const threadCount = await Thread.countDocuments({
      parentId: { $in: [null, undefined] },
    });

    return { threads, threadCount };
  } catch (error: any) {
    console.log("Failed to fetch posts :" + error.message);
  }
};

export const fetchThreadById = async (threadId: string) => {
  try {
    await connectToDb();
    const thread = await Thread.findById(threadId)
      .populate({
        path: "author",
        model: User,
        select: "_id id image name",
      })
      .populate({
        path: "community",
        model: Community,
        select: "_id id name image",
      }) // Populate the community field with _id and name
      .populate({
        path: "children",
        populate: [
          {
            path: "author",
            model: User,
            select: "_id id name parentId image",
          },
          {
            path: "children",
            model: Thread,
            populate: [
              {
                path: "author",
                model: User,
                select: "_id id name image parentId",
              },
            ],
          },
        ],
      })
      .exec();

    return thread;
  } catch (error: any) {
    console.log("Failed to get thread data" + error.message);
  }
};

interface CommentThreadProps {
  comment: string;
  threadId: string;
  author: string;
  parentId: string;
  path: string;
}
export const commentOnThread = async ({
  threadId,
  comment,
  author,
  parentId,
  path,
}: CommentThreadProps) => {
  try {
    await connectToDb();
    console.log(threadId);

    const parentThread = await Thread.findById(threadId);

    if (!parentThread) return new Error("Thread not found 404");

    const newCommentThread = await Thread.create({
      text: comment,
      author: author,
      parent: parentThread._id,
    });

    parentThread.children.push(newCommentThread._id);
    await parentThread.save();

    revalidatePath(path);
  } catch (error: any) {
    console.log("Failed to comment on thread :" + error.message);
  }
};

export const fetchUserThreads = async (userId: string) => {
  try {
    connectToDb();
    const user = await User.findOne({ id: userId });
    if (!user) return console.log("User not found");
    const threads = await Thread.find({
      _id: { $in: user.threads },
      parent: { $in: [null, undefined] },
    })
      .populate({
        path: "author",
        model: User,
        select: "name image id",
      })
      .populate({
        path: "community",
        model: Community,
        select: "name image id",
      })
      .populate({
        path: "children",
        model: Thread,
        populate: {
          path: "author",
          model: User,
        },
      });
    if (!threads) return console.log("Threads not found");

    return threads;
  } catch (error: any) {
    console.log("Error in fetching the user threads : " + error.message);
  }
};

export const deleteThreadById = async (threadId: string, path: string) => {
  try {
    const deletedThread = await Thread.findByIdAndDelete(threadId);
    if (!deletedThread) return new Error("Failed to delete the thread ");
    revalidatePath(path);
    return;
  } catch (error: any) {
    console.log("Failed to delete the thread :" + error);
  }
};

export const getActivity = async (userId: string) => {
  try {
    const userThreads = await Thread.find({ author: userId });

    let commentIds = userThreads.reduce((acc, userThread) => {
      return acc.concat(userThread.children);
    }, []);

    const activityThreads = await Thread.find({
      _id: { $in: commentIds },
      author: { $ne: userId },
    })
      .populate({
        path: "author",
        model: User,
        select: "id name image",
      })
      .sort({ createdAt: "desc" });
    return activityThreads;
  } catch (error: any) {
    console.log("Failed to fetch activity :" + error.message);
  }
};
