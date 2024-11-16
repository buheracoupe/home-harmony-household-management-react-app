import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

interface Notification {
    id: string
    message: string
    timestamp: Date
    priority: "High" | "Medium" | "Low"
  }


  const initialNotifications: Notification[] = [
    {
      id: nanoid(),
      message: "The dishwasher cycle is complete. Please unload it when you can.",
      timestamp: new Date(), // Current date and time
      priority: "High",
    },
    {
      id: nanoid(),
      message: "Grocery shopping is scheduled for Saturday. Please add items to the list.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      priority: "Medium",
    },
    {
      id: nanoid(),
      message: "Reminder: Family meeting tomorrow at 5 PM in the living room.",
      timestamp: new Date(Date.now() - 26 * 60 * 60 * 1000), // 26 hours ago
      priority: "Low",
    },
    {
      id: nanoid(),
      message: "The thermostat was adjusted to a comfortable 72°F.",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      priority: "Medium",
    },
  ];

  interface communicationHubState {
    notificationModalState: boolean;
    notifications: Notification[];
  }

  const initialState: communicationHubState = {
    notificationModalState: false,
    notifications: initialNotifications,
  }
  

const communicationHubSlice = createSlice({
    name: "communicationHub",
    initialState,
    reducers: {
        openNotificationModal: (state) => {
            state.notificationModalState = true
        },
        closeNotificationModal: (state) => {
            state.notificationModalState = false
        },
        addNotification: (state, action) => {
            state.notifications.push(action.payload)
        },
        removeNotification: (state, action) => {
          const removeIndex =  state.notifications.findIndex((notification) => notification.id === action.payload)
          if (removeIndex > -1) {
            state.notifications.splice(removeIndex, 1);
          }

        }

    }
})

export const { openNotificationModal, closeNotificationModal, addNotification, removeNotification } = communicationHubSlice.actions;

export default communicationHubSlice.reducer;