var CommentBox = React.createClass({
  getInitialState: function(){
    return {data: []};
  },
  handleCommentSubmit: function(comment){
    var comments = this.state.data;
    var newComments = comments.concat(comment);
    this.setState({data: newComments});
  },
  render: function(){
    return (
      <div className="commentBox">
        <h1>Comment Box</h1>
        <CommentList data={this.state.data}/>
        <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function(){
    var commentNodes = this.props.data.map(function(comment){
      return (
        <Comment author={comment.author} content={comment.content} />
      )
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  handleSubmit: function(e){
    e.preventDefault();
    var author = React.findDOMNode(this.refs.author).value.trim();
    var comment = React.findDOMNode(this.refs.content).value.trim();
    if (!author || !comment){
      return;
    }
    React.findDOMNode(this.refs.author).value = "";
    React.findDOMNode(this.refs.content).value = "";
    this.props.onCommentSubmit({author: author, content: comment});
  },
  render: function(){
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" ref="author" />
        <input type="text" placeholder="Your comment" ref="content" />
        <input type="submit" value="Submit" />
      </form>
    );
  }
});

var Comment = React.createClass({
  rawMarkup: function(){
    var rawMarkup = marked(this.props.content.toString(), {sanitize: true});
    return {__html: rawMarkup};
  },
  render: function(){
    return (
      <div className="comment">
        <b>{this.props.author}:</b>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});

React.render(
  <CommentBox />,
    document.getElementById("content")
);

