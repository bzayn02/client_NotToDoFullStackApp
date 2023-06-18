import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { addTaskList } from '../redux/taskAction';

const TaskForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    dispatch(addTaskList(formData));
    // console.log(formData);
  };

  return (
    <div>
      <Form onSubmit={handleOnSubmit}>
        <Row className="p-4 bg-info-subtle rounded-4">
          <Col md="6">
            <Form.Control
              type="task"
              placeholder="Enter task"
              name="task"
              onChange={handleOnChange}
              required
            />
          </Col>
          <Col md="3">
            {' '}
            <Form.Control
              type="hour"
              placeholder="Enter Hours"
              name="hour"
              onChange={handleOnChange}
              required
            />
          </Col>
          <Col md="3" className=" d-grid">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default TaskForm;
