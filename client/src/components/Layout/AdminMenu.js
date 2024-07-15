import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="text-center">
      <div className="list-group">
        <NavLink
          to="#"
          className="list-group-item list-group-item-action active"
          aria-current="true"
        >
          The current link item
        </NavLink>
        <NavLink to="#" className="list-group-item list-group-item-action">
          A second link item
        </NavLink>
        <NavLink to="#" className="list-group-item list-group-item-action">
          A third link item
        </NavLink>
        <NavLink to="#" className="list-group-item list-group-item-action">
          A fourth link item
        </NavLink>
      
      </div>
    </div>
  );
};

export default AdminMenu;
