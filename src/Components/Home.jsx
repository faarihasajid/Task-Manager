import React from "react";
import { Table, Input, Button, Checkbox, Modal, Card, Row, Col, DatePicker } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { addTask, toggleTask, deleteTask } from "../redux/taskSlice";

function Home() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const [taskId, setTaskId] = React.useState("");
  const [dueDate, setDueDate] = React.useState(null);
  const [dialogVisible, setDialogVisible] = React.useState(false);
  const [deleteTaskId, setDeleteTaskId] = React.useState(null);

  function handleAddTask() {
    if (taskId.trim().length > 0) {
      dispatch(addTask({ name: taskId, dueDate: dueDate ? dueDate.format("YYYY-MM-DD") : "" }));
      setTaskId("");
      setDueDate(null);
    } else {
      window.alert("Enter a valid task");
    }
  }

  function confirmDeleteTask(task) {
    setDeleteTaskId(task);
    setDialogVisible(true);
  }

  function handleDeleteTask() {
    dispatch(deleteTask(deleteTaskId));
    setDialogVisible(false);
  }

  const headingStyle = { fontWeight: "bold", fontSize: "16px" };

  const columns = [{
      title: <span style={headingStyle}>Tasks</span>,
      dataIndex: "name",
      render: (text, record) => (
        <span
          style={{
            fontWeight: record.completed ? "bold" : "normal",
            color: record.completed ? "white" : "black",
            padding: record.completed ? 10 : 0,
            textDecoration: record.completed ? "line-through" : "none",
            fontSize: "14px"
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: <span style={headingStyle}>Due Date</span>,
      dataIndex: "dueDate",
      render: (text) => <span>{text || "No due date"}</span>,
    },
    {
      title: <span style={headingStyle}>Completed</span>,
      dataIndex: "completed",
      render: (_, record) => (
        <Checkbox checked={record.completed} onChange={() => dispatch(toggleTask(record.id))} />
      ),
    },
    {
      title: <span style={headingStyle}>Actions</span>,
      render: (_, record) => (
        <Button icon={<DeleteOutlined />} onClick={() => confirmDeleteTask(record.id)} />
      ),
    },
  ];

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const remainingTasks = totalTasks - completedTasks;

  return (
    <div className="flex flex-col justify-center items-center mt-20 bg">
      <Row gutter={[16, 16]} justify="center" className="mb-20" style={{ width: "70%" }}>
        <Col xs={24} sm={12} md={8}>
        <Card 
        title="Total Tasks"
        style={{ backgroundColor: "#23a5c2", color: "white", textAlign: "center", height: 200 }}
        headStyle={{ fontSize: "20px", color: "white" }}
        >
          <h2 style={{ fontSize: "32px", fontWeight: "bold" }}>{totalTasks}</h2>
        </Card>
        </Col>
        
        <Col xs={24} sm={12} md={8}>
        <Card 
        title="Completed Tasks"
        style={{ backgroundColor: "#6ad51f", color: "white", textAlign: "center", height: 200 }}
        headStyle={{ fontSize: "20px", color: "white" }}
        >
          <h2 style={{ fontSize: "32px", fontWeight: "bold" }}>{completedTasks}/{totalTasks}</h2>
        </Card>
        </Col>
        
        <Col xs={24} sm={12} md={8}>
        <Card 
        title="Remaining Tasks"
        style={{ backgroundColor: "#faad14", color: "white", textAlign: "center", height: 200 }}
        headStyle={{ fontSize: "20px", color: "white" }}
        >
          <h2 style={{ fontSize: "32px", fontWeight: "bold" }}>{remainingTasks}/{totalTasks}</h2>
        </Card>
        </Col>
      </Row>

      <div className="mb-20 flex gap-2 w-full justify-center">
        <Input
          value={taskId}
          onChange={(e) => setTaskId(e.target.value)}
          placeholder="Enter task"
          style={{ width: "40%" }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTask();
            }
          }}
        />

        <DatePicker
          value={dueDate}
          onChange={(date) => setDueDate(date)}
          style={{ width: 200 }}
          placeholder="Due date"
        />

        <Button type="primary" onClick={handleAddTask} style={{ padding: "20px" }}>
          Add Task
        </Button>        
      </div>

      <Table
        dataSource={tasks}
        columns={columns}
        rowKey="id"
        style={{
          width: "80%",
          border: "1px solid #ddd",
          borderRadius: "8px",
          overflow: "hidden",
        }}
        onRow={(record) => ({
          style: {
            backgroundColor: record.completed ? "#6ad51f" : "transparent",
          },
          onMouseEnter: (event) => {
            event.currentTarget.style.backgroundColor = record.completed ? "#6ad51f" : "transparent";
          },
          onMouseLeave: (event) => {
            event.currentTarget.style.backgroundColor = record.completed ? "#6ad51f" : "transparent";
          },
        })}
      />

      <Modal
        title="Confirm Deletion"
        visible={dialogVisible}
        onOk={handleDeleteTask}
        onCancel={() => setDialogVisible(false)}
      >
        <p>
          Are you sure you want to delete this task?
        </p>
      </Modal>
    </div>

  );
}

export default Home;
