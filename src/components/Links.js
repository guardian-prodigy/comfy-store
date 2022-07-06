import React from "react";
import { useUserContext } from "../context/user_context";
export const Links = ({ Link, links, className, closeSidebar }) => {
  const { myUser } = useUserContext();
  if (closeSidebar) {
    return (
      <ul className={className}>
        {links.map(({ id, text, url }) => {
          return (
            <li key={id} onClick={() => closeSidebar()}>
              <Link to={url}>{text}</Link>
            </li>
          );
        })}
        {myUser && (
          <li onClick={() => closeSidebar()}>
            <Link to="/checkout">checkout</Link>
          </li>
        )}
      </ul>
    );
  }
  return (
    <ul className={className}>
      {links.map(({ id, text, url }) => {
        return (
          <li key={id}>
            <Link to={url}>{text}</Link>
          </li>
        );
      })}
      {myUser && (
        <li>
          <Link to="/checkout">checkout</Link>
        </li>
      )}
    </ul>
  );
};
