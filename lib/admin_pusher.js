import Pusher from "pusher-js";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { AddNewNotification } from "../store/slices/notificationSlice";

class AdminPusherConnection {
  static instance = null;

  constructor(token, dispatch) {
    if (AdminPusherConnection.instance) {
      return AdminPusherConnection.instance;
    }

    this.token = token;
    this.dispatch = dispatch;
    this.pusher = new Pusher("26233804739961e48ecf", {
      // d5c70393f1a8e34bf58c
      cluster: "ap1",
      encrypted: true,
      authEndpoint: `https://api.safqapay.com/admin/pusher/auth`,
      auth: {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      },
    });

    AdminPusherConnection.instance = this;
  }

  subscribeToNotifications() {
    const { pusher, token, role, dispatch } = this;

    pusher.connection.bind("connected", function () {
      console.log("Connected to Pusher");
    });

    pusher.connection.bind("disconnected", function () {
      console.log("Disconnected from Pusher");
    });

    pusher.connection.bind("error", function (err) {
      console.error("Pusher connection error:", err);
    });

    const channelKey = "private-admin_Notification";
    const channel = pusher.subscribe(channelKey);
    channel.bind("adminNotification", function (data) {
      console.log(data);
      const newData = {
        ...data,
        icon: <AddShoppingCartIcon sx={{ width: "20px" }} />,
      };
      dispatch(AddNewNotification(newData));
    });
  }

  // unsubscribeFromNotifications() {
  //     const { pusher } = this;
  //     pusher.unsubscribeAll();
  // }
}

export default AdminPusherConnection;
