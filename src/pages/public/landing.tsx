import React from "react";
import { ContentLayout } from "../../layout/ContentLayout";
import websites from "../../assets/website.jpg";
import "./social.css";
function Landing() {
  return (
    <ContentLayout title="Landing">
      <div className="formDiv">
        <div className="">
          <div className="row">
            <div className="col-md-7 make-center">
              <div className="editimgDiv">
                <ul>
                  <li>
                    <h5>Hi , This project is done by Aishwarya Raj Tyagi </h5>
                  </li>
                  <li>
                    <div className="social-menu">
                      <ul>
                        <li>
                          <a href="https://github.com/aishrt" target="blank">
                            <i className="fa-brands fa-github ficn"></i>
                          </a>
                        </li>
                        <li>
                          <a href="tel:+917451020300">
                            <i className="fa-solid fa-phone ficn"></i>
                          </a>
                        </li>{" "}
                        {/* <li>
                          <a href="https://www.instagram.com" target="blank">
                            <i className="fa-brands fa-instagram  ficn"></i>
                          </a>
                        </li> */}
                        <li>
                          <a
                            href="https://www.linkedin.com/in/aish-raj-tyagi/"
                            target="blank"
                          >
                            <i className="fa-brands fa-linkedin  ficn"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-5 make-center">
              <img src={websites} alt="Home Page" />
            </div>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}

export default Landing;
