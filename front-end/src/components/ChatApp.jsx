import { useContext, useEffect, useState } from "react";
import ConnectedUsers from "./ConnectedUsers";
import MessageBody from "./MessageBody";
import Sendmsg from "./SendMsg";
import SocketContext from "../Context/socketContext.js";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function ChatApp() {
  const [messageList, setMsgList] = useState([]);
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});
const socket = useContext(SocketContext);

  const getUserDetails = async (accessToken) => {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
    );
    const data = await response.json();
    setUserDetails(data);
    console.log(data);
    if(socket){socket.emit("newUser",data);}
  };

  useEffect(() => {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      navigate("/");
    }
    getUserDetails(accessToken);
  }, [navigate]);

  return (
    <div>
      <ConnectedUsers userDetails={userDetails}/>
      <MessageBody messageList={messageList} />
      <Sendmsg setMsgList={setMsgList} />
    </div>
  );
}
