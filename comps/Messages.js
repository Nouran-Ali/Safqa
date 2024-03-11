import { Button, notification, Space } from 'antd';
import { getCookie } from 'cookies-next';


export const NotifyMessage = ({ type, title, description }) => {
    let formattedDescription = description;
    if (typeof description === "object") {
        formattedDescription = "Check input fields";
    }

    return notification[type]({
        message: title,
        description: formattedDescription,
        placement: "top",
        // duration: 0 // never close the notification
    });
};