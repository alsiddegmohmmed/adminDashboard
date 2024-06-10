import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Table, Button } from 'reactstrap';
import axios from 'axios';

const StudentsTables = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getAllStudents();
  }, []);

  const getAllStudents = () => {
    axios.get('http://localhost:5001/api/users/students')
      .then(response => {
        setStudents(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  };


  const deleteUser = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}`)) {
      axios.delete(`http://localhost:5001/api/users/${id}`, {
        withCredentials: true // This ensures cookies are sent with the request
      })
      .then(response => {
        alert(response.data.message);
        getAllStudents();
      })
      .catch(error => {
        console.error('There was an error deleting the user!', error);
        alert('There was an error deleting the user!');
      });
    }
  };

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Students List</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Overview of the students 
          </CardSubtitle>
          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created Time</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student._id} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <img
                        src="https://img.freepik.com/free-photo/serious-pensive-young-student-looking-directly-camera_176532-8154.jpg?t=st=1717641769~exp=1717645369~hmac=a2ddf4c219ac1febb24fdf5beafe0354d0af6f9d6b212de3fae0e1e0af990edf&w=2000"
                        className="rounded-circle"
                        alt="avatar"
                        width="45"
                        height="45"
                      />
                      <div className="ms-3">
                        <h6 className="mb-0">{student.name}</h6>
                        <span className="text-muted"></span>
                      </div>
                    </div>
                  </td>
                  <td><p>{student.email}</p></td>
                  <td><p>{student.role}</p></td>
                  <td><p>{student.createdAt}</p></td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => deleteUser(student._id, student.name)}
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

export default StudentsTables;
