

import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import './Header.css';
import { searchResponseContext } from "../services/SearchContext";

function Header({ searchTerm, setSearchTerm }) {
  const [showCalendar, setShowCalendar] = React.useState(false);

  const {setSearchData}=useContext(searchResponseContext)

  return (
    <div className="mt-3 header-div shadow-sm py-3">
      <Container>
        <div className="main d-flex align-items-center justify-content-evenly">
          <div className="user-sec d-flex align-items-center gap-2">
            <img src="https://i.postimg.cc/cJK3cz1s/download.jpg" alt="" />
            <div>
              <b style={{color:'white'}}>John Dane</b>
              <p style={{color:'white'}} className="m-0">johndane@gmail.com</p>
            </div>
          </div>
          <div className="search-sec p-1 d-flex rounded ms-5">
            <img
              src="https://i.postimg.cc/5tgzHLxL/download-removebg-preview-8.png"
              alt=""
            />
            <input
              type="text"
              placeholder="Search anything..."
              value={searchTerm}
              onChange={(e) => setSearchData(e.target.value)}
            />
          </div>
          <div className="icons-sec d-flex gap-5 align-items-center">
            <div
              className="calendar-container"
              onMouseEnter={() => setShowCalendar(true)}
              onMouseLeave={() => setShowCalendar(false)}
            >
              <img
                src="https://i.postimg.cc/LXFZ8VN3/image-17.png"
                alt=""
                className="calendar"
              />
              {showCalendar && (
                <div className="calendar-popup">
                  <Calendar />
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Header;
