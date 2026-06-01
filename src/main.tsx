import React from "react";
import ReactDOM from "react-dom/client";
import '@/App.css'
import { RouterProvider } from 'react-router-dom'
import router from "@/router";
import 'virtual:svg-icons-register'
import { ConfigProvider } from 'antd';
import { antdConfig } from '@/config'


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ConfigProvider {...antdConfig}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </ConfigProvider>
);
