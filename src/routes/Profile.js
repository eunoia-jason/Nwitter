import {
  authService,
  collection,
  dbService,
  getDocs,
  orderBy,
  query,
  where,
} from "fbase";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ userObj }) => {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };
  const getMyNweets = async () => {
    const nweets = await getDocs(
      query(
        collection(dbService, "nweets"),
        where("creatorId", "==", userObj.uid),
        orderBy("createdAt")
      )
    );
    console.log(nweets.docs.map((doc) => doc.data()));
  };
  useEffect(() => {
    getMyNweets();
  }, []);
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
