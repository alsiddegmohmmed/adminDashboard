import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardGroup,
  Button,
  Row,
  Col,
} from "reactstrap";
import Blog from "../../components/dashboard/Blog.js";
import bg1 from "../../assets/images/bg/bg1.jpg";
import bg2 from "../../assets/images/bg/bg2.jpg";
import bg3 from "../../assets/images/bg/bg3.jpg";
import bg4 from "../../assets/images/bg/bg4.jpg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

const Cards = () => {

  const [titles, setTitles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);


  const navigate = useNavigate(); 
  useEffect(() => {
    fetchCourseTitles();
  }, []);

  const fetchCourseTitles = () => {
    axios.get('http://localhost:5001/api/users/getcoursetitles')
      .then(response => {
        setTitles(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  };



  return (
    <div>
      {/* --------------------------------------------------------------------------------*/}
      {/* Card-1*/}
      {/* --------------------------------------------------------------------------------*/}

      


      <h5 className="mb-3">Basic Card</h5>
      <Row>
        {titles.map((title) => (
          <Col sm="6" lg="6" xl="3" key={title._id}>
            <Blog
              image= {bg1}
              title={title.title}
              subtitle={title.subtitle}
              text={title.description}
              
            />
          </Col>
        ))}
      </Row>
      --------------------------------------------------------------------------------
      {/* Card-2*/}
      --------------------------------------------------------------------------------
    
    </div>
  );
};

export default Cards;
