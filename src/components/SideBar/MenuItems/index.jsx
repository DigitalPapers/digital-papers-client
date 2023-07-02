import {  List } from "@mui/material";
import { mainListItems } from "./NavigationBar.jsx";

export default function MenuItems() {
  return (
    <>
      <List component="nav">
        {mainListItems}
      </List>
    </>
  )
}
