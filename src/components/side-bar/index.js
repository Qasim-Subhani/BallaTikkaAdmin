import React, { useContext } from "react";
import "./styles.scss";
import { AiOutlineHome, AiOutlineClose } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { Link } from "react-router-dom";

export function SideBar({ show, hide }) {
  return (
    <div className={hide ? "nav_menu active" : "nav_menu"}>
      <div className={"top"}>
        <AiOutlineClose
          onClick={() => show()}
          className={"bars"}
          size={25}
          color={"#FFF"}
        />
      </div>

      <nav className={"navbar "}>
        <li>
          <span>
            <AiOutlineHome className={"iconStyle"} />
          </span>
          <Link className={"linkstyle"}>HOME</Link>
        </li>
        <li>
          <span>
            <HiOutlineShoppingBag className={"iconStyle"} />
          </span>
          <Link className={"linkstyle"}>CART</Link>
        </li>
      </nav>
    </div>
  );
}
