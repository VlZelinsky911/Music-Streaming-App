import React from "react";
import Arrows from "../../Home/Arrows/Arrows";
import SearchBar from "../../../header/SearchBar/SearchBar";
import UserMenu from "../../../header/UserMenu/UserMenu";

export default function searchHeader() {
  return (
      <div className="flex items-center justify-between mb-5 gap-4">
        <div className="flex items-center gap-2">
          <Arrows />
        </div>
        {/* <SearchBar /> */  /*  розібратись чому він портить логін */ }
        <UserMenu />
      </div>	
  );
}
