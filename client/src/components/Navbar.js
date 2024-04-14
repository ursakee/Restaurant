import React from "react";
import { useNavbarContext } from "../context/NavbarContext";
import { useNavigate } from "react-router-dom";

// Assets
import Logo from "../assets/logo.svg";
import BackArrow from "../assets/back-arrow.svg";

function Navbar() {
  const { showBackArrow, setShowBackArrow } = useNavbarContext();
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
    setShowBackArrow(false);
  };

  return (
    <nav>
      <div className={`flex items-center justify-between p-3 px-8 ${showBackArrow ? "bg-orange" : ""}`}>
        <button className="flex space-x-2 items-center" onClick={goBack}>
          {showBackArrow ? (
            <img className="w-8 h-8" src={BackArrow} alt="Back" />
          ) : (
            <>
              <div className="font-crimson text-2xl text-black font-semibold">Urban</div>
              <img className="w-7 h-7" src={Logo} alt="Urban Harvest" />
              <div className="font-crimson text-2xl text-black font-semibold">Harvest</div>
            </>
          )}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
