

import React, { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "sonner";
import { addTaskApi, delTaskApi, getTaskApi, singleTaskApi, UpdateTaskApi } from "../services/allApis";
import { searchResponseContext } from "../services/SearchContext";

function Todo() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [tasks, setTasks] = useState({
    title: "",
    description: "",
    deadline: "",
    category: "",
  });
  const [allTasks, setAllTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [singleData, setSingleData] = useState({
    title: "",
    description: "",
    deadline: "",
    category: "",
    _id: ""
  });
  
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState(null);
  const {searchData}=useContext(searchResponseContext)


  const setInputs = (e) => {
    const { name, value } = e.target;
    setTasks({ ...tasks, [name]: value });
  };

  const setDatas = (e) => {
    const { name, value } = e.target;
    setSingleData({ ...singleData, [name]: value });
  };

  const handleEdit = async (id) => {
    const out = await singleTaskApi(id);
    setSingleData(out.data);
    handleShowEditModal();
  };


  //function for update task
  const updateModel = async () => {
    let id = singleData._id;
    const result = await UpdateTaskApi(id, singleData);
    if (result.status === 200) {
      toast.success("Successfully Updated");
      handleCloseEditModal();
      getTask();
    }
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setTasks({
      title: "",
      description: "",
      deadline: "",
      category: "",
    });
  };


  //function to add
  const handleAdd = async (e) => {
    setLoading(true);
    e.preventDefault();
    const { title, description, deadline, category } = tasks;
    if (!title || !description || !deadline || !category) {
      toast.warning("Please Fill All Datas!");
    } else {
      const out = await addTaskApi(tasks);
      if (out.status === 201) {
        toast.success("Successfully Added");
        handleCloseAddModal();
        getTask();
      }
    }
    setLoading(false);
  };


  //function to fetch task
  const getTask = async () => {
    const result = await getTaskApi(searchData);
    setAllTasks(result.data);
    setLoading(false);
  };

  // function to delete task
  const handleDelete = async (id) => {
    const result = await delTaskApi(id);
    if (result.status === 200) {
      toast.success("Task Deleted Successfully");
      getTask();
    } else {
      toast.error("Failed to Delete Task");
    }
  };

  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = () => setShowEditModal(true);

  useEffect(() => {
    getTask();
  }, [searchData]);


  useEffect(() => {
    let tasks = allTasks || [];
    if (filter !== "All") {
      tasks = tasks.filter((task) => task.category === filter);
    }
    if (sort === "Asc") {
      tasks = tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    } else if (sort === "Des") {
      tasks = tasks.sort((a, b) => new Date(b.deadline) - new Date(a.deadline));
    }
    setFilteredTasks(tasks);
  }, [allTasks, filter, sort, searchData]);



  return (
    <>
      <div
        className="button takenote-sec d-flex align-items-center gap-2 mb-3"
        onClick={handleShowAddModal}
      >
        <img
          src="https://i.postimg.cc/59ghwKXY/360-F-598235670-Dl981-Yv8-AQAf2rks-Nk-W2slst-Lx-ZWEFo-R.jpg"
          alt=""
        />
        <div className="button-details">
          <div className="d-flex">
            <img src="https://i.postimg.cc/XJWFdqPf/image-19.png" alt="" />
            <p
              style={{ fontSize: "10px", fontWeight: "700", color: "white" }}
              className="ms-2 m-0"
            >
              Take Note
            </p>
          </div>
          <b style={{ color: "white" }}>Take a Note</b>
        </div>
      </div>

      <div className="todo-sec rounded shadow p-3 pt-4">
        <div className="d-flex align-items-center justify-content-between flex-wrap">
          <div className="text-todo fw-bold">To-Do</div>
          <div className="d-flex gap-3 ms-5 sort-btn-div">
            <button className={`sort-btn ${filter === "All" ? "sort-btn-active" : ""}`} onClick={() => setFilter("All")}>
              All
            </button>
            <button className={`sort-btn ${filter === "Home" ? "sort-btn-active" : ""}`} onClick={() => setFilter("Home")}>
              Home
            </button>
            <button className={`sort-btn ${filter === "Office" ? "sort-btn-active" : ""}`} onClick={() => setFilter("Office")}>
              Office
            </button>
            <button className={`sort-btn ${filter === "School" ? "sort-btn-active" : ""}`} onClick={() => setFilter("School")}>
              School
            </button>
            <button className={`sort-btn ${filter === "Others" ? "sort-btn-active" : ""}`} onClick={() => setFilter("Others")}>
              Others
            </button>
          </div>
          <div className="dropdown">
            <button className="dropbtn">
              <img
                src="https://i.postimg.cc/d3tYm2sY/filter-icon-2048x1617-97le7v6v.png"
                alt=""
                className="filter-icon"
              />
              Sort By
            </button>
            <div className="dropdown-content">
              <button className="sort-btn" onClick={() => setSort("Asc")}>
                Asc
              </button>
              <button className="sort-btn" onClick={() => setSort("Des")}>
                Des
              </button>
            </div>
          </div>
        </div>
        <div className="cards-sec d-flex justify-content-center flex-wrap gap-3">
          {!loading ? (
           filteredTasks && filteredTasks.length > 0 ? (
              filteredTasks.map((i) => (
                <Card
                  className="border-0 card-sec-div  text-black shadow"
                  key={i._id}
                  style={{ width: "18rem" }}
                >
                  <Card.Body>
                    <div className="d-flex justify-content-between mb-2">
                      <p
                        className="category-div m-0"
                        style={{
                          backgroundColor:
                            i.category === "Home"
                              ? "#bbf264"
                              : i.category === "Office"
                              ? "#7dd1fc"
                              : i.category === "School"
                              ? "#fcab4d"
                              : "#dbb4fe",
                        }}
                      >
                        {i.category}
                      </p>
                      <div className="icon-eddlt d-flex gap-3 ">
                        <img
                          src="https://i.postimg.cc/90W7C9Gs/edit-246.png"
                          alt="edit"
                          onClick={() => handleEdit(i._id)}
                        />
                        <img
                          src="https://i.postimg.cc/cJtfdjH3/free-delete-736-470378.png"
                          alt="dlt"
                          onClick={() => handleDelete(i._id)}
                        />
                      </div>
                    </div>
                    <p className="title-text">{i.title}</p>
                    <p className="category-text">{i.description}</p>
                    <div className="d-flex justify-content-end ">
                      <p className="deadline-text">{i.deadline}</p>
                    </div>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <img
                src="https://i.postimg.cc/FRV8f9z7/59727218100.png"
                alt="no-record"
                style={{ width: "300px" }}
              />
            )
          ) : (
            <div className="boxes mt-5">
              <div className="box">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className="box">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className="box">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className="box">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Task Modal */}
      <Modal show={showAddModal} onHide={handleCloseAddModal} centered>
  <Modal.Header>
    <Modal.Title>Add To-Do</Modal.Title>
  </Modal.Header>
  <Modal.Body className="d-flex flex-column gap-3">
    <div>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        id="title"
        className="form-control"
        onChange={setInputs}
      />
    </div>

    <div>
      <label htmlFor="description">Description</label>
      <textarea
        name="description"
        id="description"
        rows={3}
        className="form-control"
        onChange={setInputs}
      />
    </div>
    <div>
      <label htmlFor="deadline">Deadline</label>
      <input
        type="date"
        name="deadline"
        className="form-control"
        onChange={setInputs}
      />
    </div>
    <div>
      <label>Category</label>
      <div className="d-flex flex-row justify-content-between">

        <div className="d-flex align-items-center mb-2">
        <label htmlFor="home">Home</label>

          <input
            type="radio"
            name="category"
            id="home"
            value="Home"
            className=" ms-2"
            checked={tasks.category === "Home"}
            onChange={setInputs}
          />
        </div>
        <div className="d-flex align-items-center mb-2">
        <label htmlFor="office">Office</label>

          <input
            type="radio"
            name="category"
            id="office"
            value="Office"
            className=" ms-2"
            checked={tasks.category === "Office"}
            onChange={setInputs}
          />
        </div>
        <div className="d-flex align-items-center mb-2">
        <label htmlFor="school">School</label>

          <input
            type="radio"
            name="category"
            id="school"
            value="School"
            className=" ms-2"
            checked={tasks.category === "School"}
            onChange={setInputs}
          />
        </div>
        <div className="d-flex align-items-center mb-2">
        <label htmlFor="others">Others</label>

          <input
            type="radio"
            name="category"
            id="others"
            value="Others"
            className=" ms-2"
            checked={tasks.category === "Others"}
            onChange={setInputs}
          />
        </div>
      </div>
    </div>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseAddModal}>
      Cancel
    </Button>
    <button
      className="btn text-white"
      style={{ backgroundColor: "#031224" }}
      onClick={handleAdd}
    >
      Add
    </button>
  </Modal.Footer>
</Modal>

{/* Edit Task Modal */}
<Modal show={showEditModal} onHide={handleCloseEditModal} centered>
  <Modal.Header>
    <Modal.Title>Update To-Do</Modal.Title>
  </Modal.Header>
  <Modal.Body className="d-flex flex-column gap-3">
    <div>
      <label htmlFor="edit-title">Title</label>
      <input
        type="text"
        name="title"
        id="edit-title"
        className="form-control"
        onChange={(e) => {
          setDatas(e);
        }}
        value={singleData.title}
      />
    </div>

    <div>
      <label htmlFor="edit-description">Description</label>
      <textarea
        name="description"
        id="edit-description"
        rows={3}
        className="form-control"
        onChange={(e) => {
          setDatas(e);
        }}
        value={singleData.description}
      />
    </div>
    <div>
      <label htmlFor="edit-deadline">Deadline</label>
      <input
        type="date"
        name="deadline"
        id="edit-deadline"
        className="form-control"
        onChange={(e) => {
          setDatas(e);
        }}
        value={singleData.deadline}
      />
    </div>
    <div>
      <label>Category</label>
      <div className="d-flex justify-content-evenly">
        <div className="d-flex align-items-center">
          <label htmlFor="edit-home">Home</label>
          <input
            type="radio"
            name="category"
            value="Home"
            className="mt-1 ms-2"
            checked={singleData.category === "Home"}
            onChange={(e) => {
              setDatas(e);
            }}
          />
        </div>
        <div className="d-flex align-items-center">
          <label htmlFor="edit-office">Office</label>
          <input
            type="radio"
            name="category"
            value="Office"
            className="mt-1 ms-2"
            checked={singleData.category === "Office"}
            onChange={(e) => {
              setDatas(e);
            }}
          />
        </div>
        <div className="d-flex align-items-center">
          <label htmlFor="edit-school">School</label>
          <input
            type="radio"
            name="category"
            value="School"
            className="mt-1 ms-2"
            checked={singleData.category === "School"}
            onChange={(e) => {
              setDatas(e);
            }}
          />
        </div>
        <div className="d-flex align-items-center">
          <label htmlFor="edit-others">Others</label>
          <input
            type="radio"
            name="category"
            value="Others"
            className="mt-1 ms-2"
            checked={singleData.category === "Others"}
            onChange={(e) => {
              setDatas(e);
            }}
          />
        </div>
      </div>
    </div>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseEditModal}>
      Cancel
    </Button>
    <Button
      className="btn text-white"
      style={{ backgroundColor: "#031224" }}
      onClick={updateModel}
    >
      Update
    </Button>
  </Modal.Footer>
</Modal>
    </>
  );
}

export default Todo;
