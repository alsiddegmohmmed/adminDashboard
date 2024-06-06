import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Table, Button } from 'reactstrap';
import axios from 'axios';

const ProjectTables = () => {
  const [users, setUsers] = useState([]);
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    getAllTeachers();
  }, []);

  const getAllTeachers = () => {
    axios.get('http://localhost:5000/api/users/teachers') // Adjusted according to proxy setup
      .then(response => {
        setTeachers(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  };
  const getAllUsers = () => {
    axios.get('http://localhost:5000/api/users/teachers') // Adjusted according to proxy setup
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  };

  const deleteUser = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}`)) {
      axios.delete(`http://localhost:5000/api/users/${id}`, {
        withCredentials: true // This ensures cookies are sent with the request
      })
      .then(response => {
        alert(response.data.message);
        getAllUsers();
      })
      .catch(error => {
        console.error('There was an error deleting the user!', error);
        alert('There was an error deleting the user!');
      });
    }
  };
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleAddUser = (newUser) => {
    setUsers([...users, newUser]);
    handleCloseModal();
  };

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Teachers List</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Overview of the Teachers
          </CardSubtitle>
          <Button variant="primary" onClick={handleShowModal}> Add new user </Button>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created At</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map(teacher => (
                <tr key={teacher._id} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <img
                        src="https://www.maldenblueandgold.com/wp-content/uploads/2017/09/DSCN0322-1-e1506611764886.jpg"
                        className="rounded-circle"
                        alt="avatar"
                        width="45"
                        height="45"
                      />
                      <div className="ms-3">
                        <h6 className="mb-0">{teacher.name}</h6>
                        <span className="text-muted"></span>
                      </div>
                    </div>
                  </td>
                  <td><p>{teacher.email}</p></td>
                  <td><p>{teacher.role}</p></td>
                  <td><p>{teacher.createdAt}</p></td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => deleteUser(teacher._id, teacher.name)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProjectTables;
