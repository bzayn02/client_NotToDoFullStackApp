import React from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';

const TaskLists = ({ list }) => {
  return (
    <div>
      <Row className="mt-4">
        <Col md="6">
          <h3>Entry List</h3>
          <hr />
          <Table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>S.N.</th>
                <th>Tasks</th>
                <th>Hours</th>
                <th></th>
              </tr>
            </thead>
            {list.map((item, id) => (
              <tbody>
                <tr key={id}>
                  <td>{id + 1}</td>
                  <td>{item.task}</td>
                  <td>{item.hour}</td>
                  <td className="g-2">
                    <Button variant="info">
                      <i class="fa-solid fa-trash"></i>
                    </Button>
                    <Button variant="info">
                      <i class="fa-solid fa-arrow-right"></i>
                    </Button>
                  </td>
                </tr>{' '}
              </tbody>
            ))}
          </Table>
        </Col>
        <Col md="6">
          <h3>Bad List</h3>
          <hr />
        </Col>
      </Row>
    </div>
  );
};

export default TaskLists;
