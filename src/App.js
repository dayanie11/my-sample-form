import { useState, createRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './App.css';
import FilePreview from "./FilePreview.js"

// Bootstrap for rows and columns
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

function App() {

  const formik = useFormik({
    initialValues: {
      fname: '',
      lname: '',
      desc: '',
      email: '',
    },
    
    validationSchema: Yup.object({
      fname: Yup.string()
        .required('First Name is required.'),
      lname: Yup.string()
        .required('Last Name is required.'),
      desc: Yup.string()
      .required('Small Description is required.'),
      email: Yup.string()
        .email('Invalid email address.')
        .required('Email is required.'),
    }),
    onSubmit: (values, { resetForm }) => {
      
      if ((!(images.length===0) && formik.isValid && formik.dirty)) {
        setIsValid(values,true);
       
      }
      
      window.scrollTo(0, 0);
      //let result = JSON.stringify(values);
      //alert ("JSON data result:" + result);
     
      // Resets data and images.
      //resetForm();
      //setImages([]); 
    },
  });

  let [images, setImages] = useState([]);

  let [isValid, setIsValid] = useState(false);

  function onFileSelect(event) {
    let currentImages = images.concat(
      Array.from(event.currentTarget.files).map(function(file){
        return URL.createObjectURL(file);
       })
    );

    setImages(currentImages); 

  }

  let fileInput = createRef();

  function openFileSelect(event) {
      fileInput.current.click();
  }

 
  return (

  
  <div className="App-container">
    <div className="form-container shadow">
      <h5>Simple Form</h5>

      {isValid 
          ? <Alert variant="success">  <Alert.Heading>Success </Alert.Heading>Form successfully saved</Alert>
          : <Alert variant="light" style={{display:"none"}}></Alert>
    }
      
      <form action="#" onSubmit={formik.handleSubmit} autoComplete="off">
        <Container>
          <Row>
            <Col sm={12} md={12} lg={6}>
                  <input 
                    type="text"
                    name="fname"
                    id="fname"
                    placeholder="First Name"
                    {...formik.getFieldProps('fname')}
                  />
                  {formik.errors.fname && formik.touched.fname ? (
                    <div className="error">{formik.errors.fname}</div>
                  ) : null}
            </Col>

            <Col sm={12} md={12} lg={6}>
                  <input 
                    type="text"
                    name="lname"
                    id="lname"
                    placeholder="Last Name"
                    {...formik.getFieldProps('lname')}
                  />
                  {formik.errors.lname && formik.touched.lname ? (
                    <div className="error">{formik.errors.lname}</div>
                  ) : null}
            </Col>


          </Row>
          <Row>
            <Col sm={12} md={12} lg={12}>
            <textarea
              name="desc"
              id="desc"
              placeholder="Small Description"
              {...formik.getFieldProps('desc')}
               >

            </textarea>
            {formik.errors.desc && formik.touched.desc ? (
                    <div className="error">{formik.errors.desc}</div>
                  ) : null}
            </Col>
          </Row>

          <Row>
            <Col sm={12} md={12} lg={12}>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email Address"
              {...formik.getFieldProps('email')}
            />
              {formik.errors.email && formik.touched.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
            </Col>
          </Row>

          <input style={{display:"none"}} ref={fileInput} name="file" id="file" type="file" multiple onInput={onFileSelect}/>
          <FilePreview images={images}/>
        
          <Row className="button-container">
            <Col sm={12} md={12} lg={12}>
            <button type="button" className="button first-button" onClick={openFileSelect}>+ ADD IMAGE</button>
          <button type="submit" className="button" disabled={!(!(images.length===0) && formik.isValid && formik.dirty)}>
              SAVE
            </button>
            </Col>
          </Row>

          </Container>
      
      </form>
    </div>
  </div>
 
  );
}

export default App;
