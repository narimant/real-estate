import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/models/User";
import MyProfilesPage from "@/template/MyProfilesPage";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";

const MyProfile = async () => {
  const session = await getServerSession(authOptions);
  connectDB();
  const [user] = await User.aggregate([
    { $match: { email: session.user.email } },
    { $lookup: {
        from:'profiles',
        foreignField: 'userId',
        localField:'_id',
        as:'profiles'
    } },
  ]);


  console.log(user.profiles);
  return <MyProfilesPage profiles={user.profiles}/>;
};

export default MyProfile;
