import { Divider, List } from "@mui/material";
import { mainListItems } from "../../../pages/listItems";

export default function MenuItems() {
  return (
    <>
      <List component="nav">
        {mainListItems}
      </List>
    </>
  )
}