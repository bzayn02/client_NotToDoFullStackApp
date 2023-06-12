import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { postTask } from '../helper/axiosHelper';
import { toast } from 'react-toastify';

const TaskForm = ({ getTaskLists }) => {
  const [formData, setFormData] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const responsePromise = postTask(formData);
    toast.promise(responsePromise, {
      pending: 'Please Wait...',
    });
    const { status, message } = await responsePromise;

    console.log(status);
    toast[status](message);

    if (status === 'success') {
      getTaskLists();
    }
    // console.log(formData);
  };

  return (
    <div>
      <Form onSubmit={handleOnSubmit}>
        <Row className="g-2 p-3 bg-info-subtle rounded-4">
          <Col md="6">
            <Form.Control
              type="task"
              placeholder="Enter task"
              name="task"
              onChange={handleOnChange}
            />
          </Col>
          <Col md="3">
            {' '}
            <Form.Control
              type="hour"
              placeholder="Enter Hours"
              name="hour"
              onChange={handleOnChange}
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
