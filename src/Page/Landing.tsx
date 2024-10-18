import React, { useEffect } from "react";
import Div1 from "../Components/div1";
import Div2 from "../Components/div2";
import Div3 from "../Components/div3";
import Div4 from "../Components/div4";
import Div5 from "../Components/div5";
import Div6 from "../Components/div6";
import Menu from "./Menu/Menu";

const Landing = () => {
  useEffect(() => {
    const snapFunction = () => {
      const divi = window.innerHeight * 100;
      const dist =
        document.documentElement.scrollTop || document.body.scrollTop;
      const final = dist / divi;

      if (final <= 0.005) {
        // Adjusted from 0.01 to 0.005
        document.getElementById("dd1")!.className = "";
        document.getElementById("dd2")!.className = "";
        document.getElementById("dd3")!.className = "";
        document.getElementById("dd4")!.className = "";
        document.getElementById("dd5")!.className = "";
        document.getElementById("dd6")!.className = "";
      } else if (final > 0.005 && final <= 0.015) {
        // Adjusted from 0.01 to 0.015
        document.getElementById("dd1")!.className = "active22";
        document.getElementById("dd2")!.className = "active22";
        document.getElementById("dd3")!.className = "active22";
        document.getElementById("dd4")!.className = "active22";
        document.getElementById("dd5")!.className = "active22";
        document.getElementById("dd6")!.className = "active22";
      } else if (final > 0.015 && final <= 0.025) {
        // Adjusted from 0.025 to 0.030
        document.getElementById("dd1")!.className = "active23";
        document.getElementById("dd2")!.className = "active23";
        document.getElementById("dd3")!.className = "active23";
        document.getElementById("dd4")!.className = "active23";
        document.getElementById("dd5")!.className = "active23";
        document.getElementById("dd6")!.className = "active23";
      } else if (final > 0.025 && final <= 0.035) {
        // Adjusted from 0.045 to 0.045
        document.getElementById("dd1")!.className = "active24";
        document.getElementById("dd2")!.className = "active24";
        document.getElementById("dd3")!.className = "active24";
        document.getElementById("dd4")!.className = "active24";
        document.getElementById("dd5")!.className = "active24";
        document.getElementById("dd6")!.className = "active24";
      } else if (final > 0.035 && final <= 0.045) {
        // Adjusted from 0.065 to 0.065
        document.getElementById("dd1")!.className = "active25";
        document.getElementById("dd2")!.className = "active25";
        document.getElementById("dd3")!.className = "active25";
        document.getElementById("dd4")!.className = "active25";
        document.getElementById("dd5")!.className = "active25";
        document.getElementById("dd6")!.className = "active25";
      } else {
        document.getElementById("dd1")!.className = "active26";
        document.getElementById("dd2")!.className = "active26";
        document.getElementById("dd3")!.className = "active26";
        document.getElementById("dd4")!.className = "active26";
        document.getElementById("dd5")!.className = "active26";
        document.getElementById("dd6")!.className = "active26";
      }
    };

    window.onscroll = snapFunction;
    return () => {
      window.onscroll = null;
    };
  }, []);

  return (
    <div className='main'>
      <Menu />
      <Div1 />
      <Div2 />
      <Div3 />
      <Div4 />
      <Div5 />
      <Div6 />
    </div>
  );
};

export default Landing;
