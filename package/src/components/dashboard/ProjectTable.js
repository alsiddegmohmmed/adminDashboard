import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Table, Button } from 'reactstrap';
import axios from 'axios';

const ProjectTables = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    axios.get('http://localhost:5000/api/getusers') // Adjusted according to proxy setup
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

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Project Listing</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Overview of the projects
          </CardSubtitle>
          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Team Lead</th>
                <th>Project</th>
                <th>Status</th>
                <th>Weeks</th>
                <th>Budget</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <img
                        src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=3431&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        className="rounded-circle"
                        alt="avatar"
                        width="45"
                        height="45"
                      />
                      <div className="ms-3">
                        <h6 className="mb-0">{user.name}</h6>
                        <span className="text-muted">{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td><p>placeholder</p></td>
                  <td><p>placeholder</p></td>
                  <td><p>placeholder</p></td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => deleteUser(user._id, user.name)}
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
