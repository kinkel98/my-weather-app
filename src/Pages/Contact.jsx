import React from "react";
import "../navigation/Nav.css";
import "../Cssfolder/Contact.css";
import { BsLinkedin } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";

import { useState } from "react";
import { useEffect } from "react";

const Contact = () => {
  return (
    <div id="contact" className="contacti">
      <h1 className="cont">Contact me</h1>
      <div className="contact-container">
        <div className="contact-form">
          <h2>Contact Me</h2>
          <p>Interested in working together? Send me a message!</p>
          <form id="contact-form">
            <input type="text" id="name" placeholder="Your Name" required />
            <input type="email" id="email" placeholder="Your Email" required />
            <textarea
              id="message"
              placeholder="Your Message"
              required
            ></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
        <div className="contact-info">
          <h3>Get in Touch</h3>
          <span>
            <FaPhoneAlt />
            <p> Phone: +2349034449103</p>
          </span>
          <span>
            <MdOutlineMail />
            <p> Email: kinkelwellman@gmail.com</p>
          </span>
          <span>
            <HiBuildingOffice2 className="" />
            <p> Office: plt 19 ESt Enugu</p>
          </span>
        </div>
        <div className="social-links">
          <h3>Connect</h3>
          <span>
            <BsLinkedin className="lin" />
            <a href="https://www.linkedin.com/in/kinkel-wellman-9640b020b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
              LinkedIn
            </a>
          </span>
          <span>
            <FaGithub />
            <a href="http://github.com/kinkel98">GitHub</a>
          </span>
          <span>
            <FaWhatsapp className="what" />
            <a className="whats" href="https://wa.me/2349034449103">
              WhatsApp
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};
export default Contact;
