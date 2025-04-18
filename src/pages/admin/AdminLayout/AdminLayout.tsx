import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import s from './AdminLayout.module.scss'
import Navbar from "../NavBar/NavBar";

export const AdminLayout = () => {
  return (
    <div className={s.AdminLayout}>
        <Navbar />
      <Outlet />
    </div>
  );
};
