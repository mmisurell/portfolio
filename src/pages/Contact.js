import React from "react";

function Contact() {
  return (
    <div className="contact-page">
      <div className="two-column-layout">
        <div className="column_left">
          <img
            className="contact_image"
            src="/horseandpony_contact_image.jpg"
            alt="Horse & Pony Gallery"
          />
          <p>Hell Yes! installation image by Rocco Ruglio</p>
        </div>
        <div className="column_right">
          <br />
          <h1>Contact Information</h1>
          <table className="contact-table">
            <tbody>
              <tr>
                <td>
                  <h2>Email:</h2>*
                </td>
                <td>
                  <div className="email_link">
                    <a href="mailto:info@horseandpony.online">
                      info@horseandpony.online
                    </a>
                    <br />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <h2>Social:</h2>
                </td>
                <td>
                  <div className="social">
                    <a
                      href="https://www.instagram.com/horseandpony_berlin/?hl=en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="insta-link"
                    >
                      <img
                        src="/Insta.svg"
                        alt="Instagram Logo"
                        width="24px"
                        height="24px"
                        className="social-img"
                      />
                    </a>
                    &nbsp;
                    <a
                      href="https://www.facebook.com/horseandpony.online/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="facebook-link"
                    >
                      <img
                        src="/Fb.svg"
                        alt="Facebook Logo"
                        width="24px"
                        height="24px"
                        className="social-img"
                      />
                    </a>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <h2>Address:</h2>
                </td>
                <td>
                  Altenbrakerstr 18, 12053 <br />
                  Neukölln, Berlin <br />
                  U-bahn: Leinestraße
                  <br />
                  S-bahn: Hermannstraße
                  <div className="directions">
                    <a
                      href="https://www.google.de/maps/place/Horse+%26+Pony/@52.4704306,13.4296101,16z/data=!3m1!4b1!4m6!3m5!1s0x47a84f9970d53bbb:0x46fc0c8467fb036f!8m2!3d52.4704306!4d13.432185!16s%2Fg%2F11clsy56j6?entry=ttu&g_ep=EgoyMDI1MDExNS4wIKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Directions
                    </a>
                  </div>
                  <br />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="email_list">
            * Email us to subscribe to our newsletter.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
