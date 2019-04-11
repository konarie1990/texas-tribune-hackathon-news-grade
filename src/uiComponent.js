import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Divider
} from "semantic-ui-react";

// Pass getRefs into onChange, mount component, handle submit and return data
const getRefs = url => {
  let base =
    "https://www.googleapis.com/customsearch/v1?key=AIzaSyB0zqGyHNgmUiWdm9CiofUIldNjhr2jhfM&cx=012673784411427794478:licl7tpt11a&q=";
  fetch(base + "intext: " + url).then(res => {
    res.json().then(data => {
      let items = data["items"].map(r => r.link);
      let total = data["queries"]["request"][0]["totalResults"];
      document.getElementById("output").innerHTML = total.toString();
      console.log("Total is " + total);
      console.log(items);
    });
  });
};

class LoginForm extends Component {
  state = { name: "", submittedName: "" };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const { name } = this.state;

    this.setState({ submittedName: name });
  };

  render() {
    const { name, submittedName } = this.state;

    return (
      <div className="login-form">
        <style>
          {`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}
        </style>
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              News Content Integrity Grade
            </Header>
            <Form onSubmit={this.handleSubmit} size="large">
              <Segment stacked>
                <Form.Input
                  onChange={this.handleChange}
                  name="name"
                  value={name}
                  fluid
                  icon="globe"
                  iconPosition="left"
                  placeholder="Enter URL"
                />

                <Button color="teal" fluid size="large">
                  Search
                </Button>
              </Segment>
            </Form>
            <Message>
              <Header as="h1" color="teal">
                Grade: A
              </Header>
              <Divider />
              <strong>onChange:</strong>
              <pre>{JSON.stringify({ name }, null, 2)}</pre>
              <strong>onSubmit:</strong>
              <pre>{JSON.stringify({ submittedName }, null, 2)}</pre>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
export default LoginForm;
