import React from "react";
import { Link } from "react-router-dom";
function About() {
  return (
    <div className="row m-0 mt-2 p-2">
      <p className="h2  about-us-title">About Elactive</p>
      <div className="row p-2 about-us-container ">
        <div className="col-md-6 col-sm-12 elactive-description mt-2 ">
          <p>Your user stories success built on a powerful Estimation tool.</p>
          <div className="col solution-description">
            Effort estimation is an important part of software project
            management, particularly for planning and monitoring a software
            project. The accuracy of effort estimation has implications on the
            outcome of a software project; underestimation may lead to schedule
            and budget overruns, while overestimation may have a negative impact
            on organizational competitiveness.
          </div>
          <div className="col solution-description mt-2">
            <Link to="/documentation">
              <button className="btn btn-dark learnMoreButton ">
                Learn More{" "}
              </button>
            </Link>
            <Link to="/try-it">
              <button className="btn btn-dark startEstimatingButton m-2">
                Start estimating
              </button>
            </Link>
          </div>
        </div>

        <div className="col elactive-statistics m-0 row ">
          <div className="col-6 elactiveStatisticContainer m-0 p-0 "></div>
          <div className="col-6  elactiveStatisticContainer m-0 p-0 "></div>
          <div className="col-6  elactiveStatisticContainer m-0 p-0 "></div>
          <div className="col-6 elactiveStatisticContainer m-0 p-0 "></div>
        </div>
      </div>
    </div>
  );
}

export default About;
