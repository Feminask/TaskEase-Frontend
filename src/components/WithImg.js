import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Toaster, toast } from "sonner";
import { addWITaskApi, delWITaskApi, getWITaskApi, singleWITaskApi, UpdateWITaskApi } from "../services/allApis";
import { searchResponseContext } from "../services/SearchContext";

function WithImg() {
  const [show2, setShow2] = useState(false);
  const [show4, setShow4] = useState(false);
  const [loading, setLoading] = useState(false);
  const {searchData}=useContext(searchResponseContext)

  const [fieldData, setFieldData] = useState({
    imgUrl: "",
    title: "",
  });
  const [allTasks,setGetallTasks]=useState([]);

  const [singleField, setSingleField] = useState({
    imgUrl: "",
    title: "",
    _id:"",
  });


  const setInputs = (e) => {
    const { name, value } = e.target;
    setFieldData({ ...fieldData, [name]: value });
  };

  const setDatas = (e) => {
    const { name, value } = e.target;
    setSingleField({ ...singleField, [name]: value });
  };


  const handleClose2 = () => {
    setShow2(false);
    setFieldData({
      imgUrl: "",
      title: "",
    })
  };



  //function to add

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { imgUrl,title } = fieldData;
    if (!imgUrl || !title ) {
      toast.warning("Please Fill All Datas!");
    } else {
      const out = await addWITaskApi(fieldData);
      // console.log(out.data);
      if (out.status === 201) {
        toast.success("Successfully Added");
        handleClose2();
        getWITask()
      }
    }
    setLoading(false);
  };




//function to get fetch data

  const getWITask=async()=>{
    const result=await getWITaskApi(searchData)
    setGetallTasks(result.data);
    setLoading(false);
    }
    
  //function to fetch single task data,when we click the edit
  const handleeditmodal=async(id)=>{
    const out = await singleWITaskApi(id) 
    // console.log(out); 
    setSingleField(out.data);
  handleShow4()
   }
   
//function to update
const updateModel = async () => {
  let id=singleField._id
  const result = await UpdateWITaskApi(id, singleField)
  // console.log(result);
  if (result.status === 200) {
    toast.success("Successfully Updated");
    handleClose4()  
   getWITask()
}}


//function to delete
const handledelete = async (id) => {
  const result = await delWITaskApi(id);
  if (result.status === 200) {
    toast.success("Task Deleted Successfully");
    getWITask();
  } else {
    toast.error("Failed to Delete Task");
  }
};


  const handleShow2 = () => setShow2(true);

  const handleClose4 = () => {
    setShow4(false);
  };
  const handleShow4 = () => setShow4(true);

  useEffect(()=>{
    getWITask()
  },[searchData])

  // console.log(allTasks);


  return (
    <>
      <div
        className="button withimg-sec d-flex align-items-center gap-2 mb-3"
        onClick={handleShow2}
      >
        <img
          src="https://i.postimg.cc/g2XnZZk5/premium-picture-icon-logo-line-260nw-749843887.png"
          alt=""
        />
        <div className="button-details">
          <div className="d-flex">
            <img src="https://i.postimg.cc/XJWFdqPf/image-19.png" alt="" />
            <p
              style={{ fontSize: "10px", fontWeight: "700",color:'white' }}
              className="ms-2 m-0"
            >
              Take Note
            </p>
          </div>
          <b style={{color:'white'}}>With Image</b>
        </div>
      </div>
      <div className="note-sec rounded shadow p-3 pt-4 d-flex flex-column">
        <div className="ms-3 text-withImg align-self-start fw-bold">Notes</div>
        <div className="card-with-img d-flex justify-content-center flex-wrap gap-3">
        {!loading ? (
          allTasks &&  allTasks.length > 0 ? (
              allTasks.map((i) => (
                <div className="card-withImg shadow" key={i._id}>
                  <img src={i.imgUrl} alt="" />
                  <div className="card__content d-flex flex-column justify-content-between">
                    <p className="card__title text-white">{i.title}</p>

                    <div className="icon-eddlt  d-flex justify-content-between">
                      <img
                        src="https://i.postimg.cc/L5rCwcx5/download-removebg-preview-7.png"
                        alt="Edit"
                        onClick={() => handleeditmodal(i._id)}
                        style={{ cursor: "pointer" }}
                      />
                      <img
                        className="delete-icon"
                        src="https://i.postimg.cc/d3MWhZ2R/3807871.png"
                        alt="Delete"
                        onClick={() => handledelete(i._id)}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </div>
                </div>
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
      <Modal show={show2} onHide={handleClose2} centered>
        <Modal.Header>
          <Modal.Title>Add Note With Image</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column gap-3">
          <div>
            <label htmlFor="">Image-Url</label>
            <input
              type="text"
              className="form-control mt-1"
              name="imgUrl"
              onChange={setInputs}
              />
          </div>
          <div>
            <label htmlFor="">Title</label>
            <input
              type="text"
              className="form-control mt-1"
              name="title"
              onChange={setInputs}
              />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Cancel
          </Button>
          <button
            className="btn text-white"
            style={{ backgroundColor: "#031224" }}
            onClick={
              handleAdd
            }
          >
            Add
          </button>
        </Modal.Footer>
      </Modal>
{/* edit     */}
  <Modal show={show4} onHide={handleClose4} centered>
        <Modal.Header>
          <Modal.Title>Update Note With Image</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column gap-3">
          <div>
            <label htmlFor="">Image-Url</label>
            <input
              type="text"
              className="form-control mt-1"
              name="imgUrl"
              onChange={(e) => {
                setDatas(e);
              }}
              value={singleField.imgUrl}
              />
          </div>
          <div>
            <label htmlFor="">Title</label>
            <input
              type="text"
              className="form-control mt-1"
              name="title"
              onChange={(e) => {
                setDatas(e);
              }}
           value={singleField.title}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose4}>
            Cancel
          </Button>
          <button
            className="btn text-white"
            style={{ backgroundColor: "#031224" }}
            onClick={
              updateModel
            }
          >
            Update
          </button>
        </Modal.Footer>
      </Modal>
      <Toaster richColors />
    </>
  );
}

export default WithImg;
