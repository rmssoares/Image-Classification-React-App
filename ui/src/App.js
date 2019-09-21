import React, { Component } from 'react';
import './App.css';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      hasImage: false,
      formData: {
        city_img: '',
      },
      fileUrl: null,
      file:null,
      result: ""
    };
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    var formData = this.state.formData;
    var hasImage = this.state.hasImage;
    console.log(formData.city_img)
    formData[name] = value;
    hasImage = formData.city_img != '';
    this.setState({
      hasImage,
      formData,
      fileUrl: URL.createObjectURL(event.target.files[0]),
      file:event.target.files[0],
    });
  }

  handlePredictClick = (event) => {
    const file = this.state.file;

    const data = new FormData();
    data.append('file', file);

    this.setState({ isLoading: true });
    fetch('http://127.0.0.1:5000/prediction/', 
      {
        // headers: {
        //   'Accept': 'application/json',
        //   'Content-Type': 'application/json'
        // },
        method: 'POST',
        body: data
      })
      .then(response => response.json())
      .then(response => {
        console.log(response)
        this.setState({
          result: response.result,
          isLoading: false
        });
      });
  }

  handleCancelClick = (event) => {
    this.setState({ result: "", hasImage: false, formData:{city_img:''}});
  }

  render() {
    const hasImage = this.state.hasImage;
    const isLoading = this.state.isLoading;
    const formData = this.state.formData;
    const result = this.state.result;
    const fileUrl = this.state.fileUrl;

    return (
      <Container>
        <div>
          <h1 className="title">ML React App</h1>
        </div>
        <div className="content">
          <Form>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Upload Image</Form.Label>
                <Form.Control
                  type="file" 
                //   placeholder="Text Field 1" 
                  name="city_img"
                  value={formData.city_img}
                  onChange={this.handleChange} />
              </Form.Group>
            </Form.Row>
            <Row>
                { hasImage ?
                <Col>
                    <Image width={300} height={300} src={fileUrl} roundedCircle />
                </Col> : null }
            </Row>
            
            <Row>
              <Col>
                <Button
                  block
                  variant="success"
                  disabled={isLoading}
                  onClick={!isLoading ? this.handlePredictClick : null}>
                  { isLoading ? 'Making prediction' : 'Predict' }
                </Button>
              </Col>
              <Col>
                <Button
                  block
                  variant="danger"
                  disabled={isLoading}
                  onClick={this.handleCancelClick}>
                  Reset prediction
                </Button>
              </Col>
            </Row>
          </Form>
          {result === "" ? null :
            (<Row>
              <Col className="result-container">
                <h5 id="result">{result}</h5>
              </Col>
            </Row>)
          }
        </div>
      </Container>
    );
  }
}

export default App;