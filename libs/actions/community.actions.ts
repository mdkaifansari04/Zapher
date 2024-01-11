import { NextResponse } from "next/server";
import { connectToDb } from "../../utils/mongoose";
import Community from "../model/community.model";
import User from "../model/user.model";
import { revalidatePath } from "next/cache";
import Thread from "../model/thread.model";

export const createCommunity = async (
  id: string,
  name: string,
  username: string,
  image: string,
  bio: string,
  createdBy: string
) => {
  try {
    await connectToDb();
    const user = await User.findOne({ id: createdBy });
    if (!user) return null;

    const newCommunity = await Community.create({
      id,
      name,
      username,
      bio: bio ? bio : "Org bio",
      image,
      createdBy: user._id,
    });

    user.community.push(newCommunity._id);
    await user.save();

    console.log("Community Created : " + newCommunity);

    return newCommunity;
  } catch (error: any) {
    console.log("Failed to create community :", error.message);
  }
};

export const addMemberToCommunity = async (
  communityId: string,
  userId: string
) => {
  try {
    await connectToDb();

    const user = await User.findOne({ id: userId });
    if (!user) return NextResponse.json({ message: "User not found" });

    const community = await Community.findOne({ id: communityId });
    if (!community)
      return NextResponse.json({ message: "Community not found" });

    community.members.push(user._id);
    await community.save();

    user.community.push(community._id);
    await user.save();

    return;
  } catch (error: any) {
    console.log(`Failed to add member to community ${error.message}`);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
};

export const removeUserFromCommunity = async (
  communityId: string,
  userId: string
) => {
  try {
    await connectToDb();

    const user = await User.findOne({ id: userId });
    if (!user) return NextResponse.json({ message: "User not found" });

    const community = await Community.findOne({ id: communityId });
    if (!community)
      return NextResponse.json({ message: "Community not found" });

    const newCommunityArray = community.members.reduce(
      (member: any) => member !== userId
    );

    community.members = newCommunityArray;
    await community.save();

    const newUserArray = user.community.reduce(
      (community: any) => community !== community._id
    );

    user.community = newUserArray;
    await user.save();

    return;
  } catch (error: any) {
    console.log(`Failed to add member to community ${error.message}`);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
};

export const updateCommunityInfo = async (
  id: string,
  name: string,
  slug: string,
  logo_url: string
) => {
  try {
    await connectToDb();

    const community = await Community.findOne({ id: id });

    if (!community)
      return NextResponse.json({ message: "Community not found" });

    const updatedCommunity = await Community.findByIdAndUpdate(
      { _id: community._id },
      {
        name,
        username: slug,
        image: logo_url,
      },
      { new: true }
    );

    console.log("Community updated :", updatedCommunity);

    return;
  } catch (error: any) {
    console.log("Failed to update community: " + error.message);
  }
};

export const deleteCommunity = async (id: string) => {
  try {
    await connectToDb();
    const community = await Community.findOne({ id: id });
    if (!community)
      return NextResponse.json({ message: "Community not found" });

    await Community.findByIdAndDelete(community._id);
  } catch (error: any) {
    console.log("Failed to delete community " + error.message);
  }
};

export const fetchAllCommunity = async (path?: string) => {
  try {
    await connectToDb();

    const community = await Community.find({});
    if (!community) return console.log("Community not found");
    if (path) revalidatePath(path);
    return community;
  } catch (error: any) {
    console.log("Failed to fetch community" + error.message);
  }
};

export const fetchCommunityById = async (communityId: string) => {
  try {
    await connectToDb();
    const community = await Community.findOne({ id: communityId })
      .populate({
        path: "threads",
        model: Thread,
      })
      .populate({
        path: "members",
        model: User,
      });

    if (!community) return console.log("Community not found");

    return community;
  } catch (error: any) {
    console.log(`Failed to get community by id ${error.message} `);
  }
};

export const fetchCommunityThreads = async (communityId: string) => {
  try {
    connectToDb();
    const community = await Community.findOne({ id: communityId });
    if (!community) return console.log("Community not found");

    const threads = await Thread.find({
      _id: { $in: community.threads },
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
          select: "name image id",
        },
      });
    if (!threads) return console.log("Threads not found");

    return threads;
  } catch (error) {}
};
