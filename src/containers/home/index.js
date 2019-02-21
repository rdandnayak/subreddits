import React, { PureComponent } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Media from 'react-bootstrap/Media'
import Button from 'react-bootstrap/Button'
import Post from '../post'
import Spinner from 'react-spinkit'

import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync
} from '../../modules/counter'
import { resolve } from 'rsvp'

class Home extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      loader: true,
      selectedSubReddit: {},
      subreddits: [
        'alternativeart',
        'pics',
        'gifs',
        'adviceanimals',
        'cats',
        'images',
        'photoshopbattles',
        'hmmm',
        'all',
        'aww'
      ]
    }
  }

  selectCard = (e, item) => {
    this.setState({ selectedSubReddit: item })
    var elems = document.querySelectorAll('.active')
    ;[].forEach.call(elems, function(el) {
      el.classList.remove('active')
    })
    e.target.parentElement.className += ' active'
    // console.warn(item)
  }

  componentDidMount() {
    let self = this
    const { subreddits } = this.state
    const promiseList = subreddits.map(item => {
      return new Promise((resolve, reject) => {
        return fetch(`https://www.reddit.com/r/${item}.json`).then(function(
          response
        ) {
          resolve(response.json())
        })
      })
    })
    Promise.all(promiseList).then(function(values) {
      setTimeout(() => {
        self.setState({ list: values, loader: false })
      }, 0)
      console.log(values)
    })
  }
  render() {
    const props = this.props
    const { list, selectedSubReddit, loader } = this.state
    return (
      <Row>
        <section
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 999,
            opacity: 0.5,
            width: '100%',
            height: '100%',
            background: 'black',
            display: !loader ? 'none' : ''
          }}
          className="spinerWrapper">
          <Spinner
            style={{ position: 'fixed', left: '50%', top: '50%', zIndex: 9999 }}
            name="cube-grid"
            color="white"
          />
        </section>
        <section
          id="postSlider"
          style={{ overflow: 'auto', whiteSpace: 'nowrap' }}>
          <div style={{ width: 288 * (list.length + 1) + 'px' }}>
            {list.map((item, index) => {
              const name = item.data.children[1].data.subreddit
              const thumbnail =
                !!item.data.children[1].data.thumbnail &&
                item.data.children[1].data.thumbnail !== 'self'
                  ? item.data.children[1].data.thumbnail
                  : 'http://placehold.it/286x200'
              const title = item.data.children[1].data.title
              return (
                <Card
                  onClick={e => this.selectCard(e, item)}
                  key={index}
                  className="subreddit"
                  style={{
                    width: '18rem',
                    float: 'left',
                    marginRight: '20px',
                    cursor: 'pointer'
                  }}>
                  {thumbnail ? (
                    <Card.Img height="200px" variant="top" src={thumbnail} />
                  ) : (
                    ''
                  )}
                  <Card.Body style={{ whiteSpace: 'normal' }}>
                    <Card.Title>
                      {name.charAt(0).toUpperCase() + name.slice(1)}
                    </Card.Title>
                    {/* <Card.Text>{title}</Card.Text> */}
                    {/* <Button variant="primary">Go somewhere</Button> */}
                  </Card.Body>
                </Card>
              )
            })}
            <div className="clearfix" />
          </div>
        </section>
        <section>
          <Post subRedditList={selectedSubReddit} />
        </section>
      </Row>
    )
  }
}

const mapStateToProps = ({ counter, subreddits }) => ({
  count: counter.count,
  subreddits
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      increment,
      incrementAsync,
      decrement,
      decrementAsync,
      changePage: () => push('/about-us')
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
