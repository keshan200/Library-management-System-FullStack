import axios from "axios";


export const sendOverdueNotifications = async () => {
  const response = await axios.post("http://localhost:3000/api/notification/overdue");
  return response.data;
};