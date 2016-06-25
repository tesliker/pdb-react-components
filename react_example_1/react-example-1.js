var data = [
    {id: 1, author: "Pete Hunt", text: "This is one comment"},
    {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
];

var CommentList = React.createClass({
    render: function() {
/*        var commentNodes = this.props.data.map(function(comment) {
            return (
                <Comment author={comment.author} key={comment.id}>
            {comment.text}
            </Comment>
            );
        });*/
        console.log(this.props.data.data);
        if (this.props.data.data != null)
        {
            return (
                <div className="commentList"><h2> {this.props.data.data.nodeQuery[0]['title']}</h2></div>
            );
        }
        else {
            return false;
        }
    }
});

var CommentForm = React.createClass({
    render: function() {
        return (
            <div className="commentForm">
            Hello, world! I am a CommentForm.
        </div>
        );
    }
});

var CommentBox = React.createClass({
    loadCommentsFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            type: 'POST',
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    render: function() {
        return (
            <div className="commentBox">
            <h1>Comments</h1>
            <CommentList data={this.state.data} />
            <CommentForm />
            </div>
        );
    }
});

// tutorial4.js
var Comment = React.createClass({
    render: function() {
        return (
            <div className="comment">
            <h2 className="commentAuthor">
            {this.props.author}
        </h2>
        {this.props.children}
        </div>
        );
    }
});

ReactDOM.render(
    <CommentBox url="/d8/graphql?query={ nodeQuery {   id: nid,   title,   author: uid {     targetId   },   } }" pollInterval={1000000} />,
    document.getElementById('react-example-1')
);