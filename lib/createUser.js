import User from "@/models/User";
import { connectToDB } from "./mongoose";
export async function getOrCreateUser(kindeUser) {
  await connectToDB()

  const { id, email, given_name, family_name } = kindeUser;

  let user = await User.findOne({ kindeUserId: id });

  if (!user) {
    user = await User.create({
      kindeUserId: id,
      email,
      given_name,
      family_name,

    });
  }

  return user;
}
