import Pusher from "pusher-js";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DescriptionIcon from "@mui/icons-material/Description";
import { AddNewNotification } from "../store/slices/notificationSlice";
import jwt_decode from "jwt-decode";

export const user_notification_types = {
  // user types
  notification_create_invoice: {
    href: "/dashboard/invoices",
    icon: <DescriptionIcon sx={{ width: "20px" }} />,
  },
  notification_invoice_paid: {
    href: "/dashboard/invoices",
    icon: <AddShoppingCartIcon sx={{ width: "20px" }} />,
  },
  notification_new_order: {
    href: "notification_new_order",
    icon: <AddShoppingCartIcon sx={{ width: "20px" }} />,
  },
  notification_create_batch_invoice: {
    href: "notification_create_batch_invoice",
    icon: <AddShoppingCartIcon sx={{ width: "20px" }} />,
  },
  notification_deposit: {
    href: "/dashboard/wallet",
    icon: <AddShoppingCartIcon sx={{ width: "20px" }} />,
  },
  notification_create_recurring_invoice: {
    href: "notification_create_recurring_invoice",
    icon: <AddShoppingCartIcon sx={{ width: "20px" }} />,
  },
  notification_refund_transfered: {
    href: "/dashboard/refunds",
    icon: <AddShoppingCartIcon sx={{ width: "20px" }} />,
  },
  notification_notifications_serviceRequest: {
    href: "notification_notifications_serviceRequest",
    icon: <AddShoppingCartIcon sx={{ width: "20px" }} />,
  },
  notification_notifications_hourly_deposit_rejected: {
    href: "notification_notifications_hourly_deposit_rejected",
    icon: <AddShoppingCartIcon sx={{ width: "20px" }} />,
  },
  notification_approve_vendor_account: {
    href: "notification_approve_vendor_account",
    icon: <AddShoppingCartIcon sx={{ width: "20px" }} />,
  },
  notification_create_shipping_invoice: {
    href: "notification_create_shipping_invoice",
    icon: <AddShoppingCartIcon sx={{ width: "20px" }} />,
  },
};

class UserPusherConnection {
  static instance = null;

  constructor(token, myData, dispatch) {
    if (UserPusherConnection.instance) {
      return UserPusherConnection.instance;
    }

    this.token = token;
    this.myData = myData;
    this.dispatch = dispatch;
    this.pusher = new Pusher("26233804739961e48ecf", {
      // d5c70393f1a8e34bf58c
      cluster: "ap1",
      encrypted: true,
      authEndpoint: `https://api.safqapay.com/api/pusher/auth`,
      auth: {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      },
    });

    UserPusherConnection.instance = this;
  }

  subscribeToNotifications() {
    const { pusher, token, role, myData, dispatch } = this;

    pusher.connection.bind("connected", function () {
      console.log("Connected to Pusher");
    });

    pusher.connection.bind("disconnected", function () {
      console.log("Disconnected from Pusher");
    });

    pusher.connection.bind("error", function (err) {
      console.error("Pusher connection error:", err);
    });

    Object.keys(user_notification_types).forEach((key) => {
      const channelKey = `private-user_notification.${key}.${myData?.profile_business?.id}`;
      const shouldSubscribe = myData?.[key];

      if (shouldSubscribe) {
        console.log("shouldSubscribe");
        const channel = pusher.subscribe(channelKey);
        channel.bind(`userNotification`, function (data) {
          console.log(data);
          const newData = {
            ...data,
            icon: <AddShoppingCartIcon sx={{ width: "20px" }} />,
          };
          dispatch(AddNewNotification(newData));
        });
      } else {
        // Not subscribed, you can add your logic here if needed
        console.log(`Not subscribed to channel ${channelKey}`);
      }
    });
  }

  // unsubscribeFromNotifications() {
  //     const { pusher } = this;
  //     pusher.unsubscribeAll();
  // }
}

export default UserPusherConnection;
