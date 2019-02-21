import React from 'react'
import Media from 'react-bootstrap/Media'

class Post extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { subRedditList } = this.props
    console.warn(
      subRedditList && subRedditList.data && subRedditList.data.children[1]
    )
    return (
      <section>
        {subRedditList &&
          subRedditList.data &&
          subRedditList.data.children.map((item, index) => {
            const thumbnail = item.data.thumbnail
            const title = item.data.title
            const num_comments = item.data.num_comments
            const ups = item.data.ups
            return (
              <Media
                key={index}
                style={{ marginBottom: '20px', marginTop: '20px' }}>
                {thumbnail && thumbnail !== 'self' ? (
                  <img
                    width={64}
                    height={64}
                    className="mr-3"
                    src={thumbnail}
                  />
                ) : (
                  <img
                    width={64}
                    height={64}
                    className="mr-3"
                    src={'http://placehold.it/64x64'}
                  />
                )}
                <Media.Body>
                  <h5>{title}</h5> <i class="fas fa-comments" /> ({num_comments}
                  ) <i class="far fa-thumbs-up" />({ups})
                </Media.Body>
              </Media>
            )
          })}
      </section>
    )
  }
}

export default Post
