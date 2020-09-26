import React, { useState, useEffect } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FaStackOverflow } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

const SocialMediaLinks = () => (
  <div className="icons">
    {" "}
    <a target="_blank" className="github" href="https://github.com/yilmazbingo">
      <AiFillGithub />
    </a>
    <a
      target="_blank"
      className="stackoverflow"
      href="https://stackoverflow.com/users/10262805/yilmaz"
    >
      <FaStackOverflow />
    </a>
    <a
      target="_blank"
      className="linkedin"
      href="https://www.linkedin.com/in/yilmaz-bingol-8b52a961/"
    >
      <FaLinkedinIn />
    </a>
  </div>
);

export default SocialMediaLinks;
