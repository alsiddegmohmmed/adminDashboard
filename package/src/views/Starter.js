import { Col, Row } from "reactstrap";
import { useState, useEffect } from "react";
import SalesChart from "../components/dashboard/SalesChart.js";
import Feeds from "../components/dashboard/Feeds.js";
import ProjectTables from "../components/dashboard/ProjectTable.js";
import TopCards from "../components/dashboard/TopCards.js";
import Blog from "../components/dashboard/Blog.js";
import bg1 from "../assets/images/bg/bg1.jpg";
import bg2 from "../assets/images/bg/bg2.jpg";
import bg3 from "../assets/images/bg/bg3.jpg";
import bg4 from "../assets/images/bg/bg4.jpg";
import { fetchUserCount, fetchStudentCount, fetchTeacherCount } from '../utils/api.js'; // Import the functions





const BlogData = [
  {
    image: bg1,
    title: "This is simple blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg2,
    title: "Lets be simple blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg3,
    title: "Don't Lamp blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg4,
    title: "Simple is beautiful",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
];

const Starter = () => {

  const [userCount, setUserCount] = useState(0); // State to store the user count
  const [studentCount, setStudentCount] = useState(0); // State to store the student count
    const [teacherCount, setTeacherCount] = useState(0); 

    useEffect(() => {
        const getUserCount = async () => {
          const userCount = await fetchUserCount();
          const studentCount = await fetchStudentCount();
          const teacherCount = await fetchTeacherCount();

          setUserCount(userCount);
          setStudentCount(studentCount);
          setTeacherCount(teacherCount);
        };

        getUserCount();
    }, []);


  return (
    <div>
      {/***Top Cards***/}
      <Row>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-success text-success"
            title="Profit"
            subtitle="Number Of Users"
            earning={userCount}
            icon="bi bi-wallet"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-danger text-danger"
            title="Refunds"
            subtitle="Number Of Teachers"
            earning={teacherCount}
            icon="bi bi-coin"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-warning text-warning"
            title="New Project"
            subtitle="Number Of Students"
            earning={studentCount}
            icon="bi bi-basket3"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-info text-into"
            title="Sales"
            subtitle="Weekly Sales"
            earning="210"
            icon="bi bi-bag"
          />
        </Col>
      </Row>
      
      {/***Table ***/}
      <Row>
        <Col lg="12">
          <ProjectTables />
        </Col>
      </Row>
      {/* **Sales & Feed**
      <Row>
        <Col sm="6" lg="6" xl="7" xxl="8">
          <SalesChart />
        </Col>
        <Col sm="6" lg="6" xl="5" xxl="4">
          <Feeds />
        </Col>
      </Row> */}
      {/***Blog Cards***/}
      <Row>
        <h1>Teachears Courses </h1>
        {BlogData.map((blg, index) => (
          <Col sm="6" lg="6" xl="3" key={index}>
            <Blog
              image={blg.image}
              title={blg.title}
              subtitle={blg.subtitle}
              text={blg.description}
              color={blg.btnbg}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Starter;
