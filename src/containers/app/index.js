import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import { Route, Link } from 'react-router-dom'
import Home from '../home'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: []
    }
  }

  selectPosts = posts => {
    if (posts) this.setState({ posts: [...posts] })
  }
  render() {
    return (
      <Container>
        <header>
          <Navbar fixed="top" bg="dark" variant="dark">
            <Navbar.Brand href="#home">Reddit</Navbar.Brand>
            {/* <Nav className="mr-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link>
      </Nav> */}
          </Navbar>
        </header>
        <main>
          <Route exact path="/" component={Home} />
        </main>
      </Container>
    )
  }
}

export default App
