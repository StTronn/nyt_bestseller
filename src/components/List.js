import React from 'react';
import BookCard from './BookCard';
import TopBar from './TopBar';
class List extends React.Component{
  //remove key into gitnore file
  constructor()
  {
    super();
    this.state={
    }
  }

  componentDidMount(){
    fetch(`https://api.nytimes.com/svc/books/v3/lists.json?list-name=Combined-Print-and-E-Book-${this.props.cat}&api-key=` + process.env.REACT_APP_NYT_API_KEY, { method: 'get',
    })
    .then(response => { return response.json(); })
    .then(json => {this.setState({books:json.results}); });
  }
  img_link=()=>{
  }
  render(){
    return(
      <div>
        <TopBar cat={this.props.cat} change={this.props.change}/>
      
        {
          this.state.books && 
          this.state.books.map((item,key)=>
            <BookCard key={key} book={item} />
          )
        }
      </div>
    );
  }
}
export default List;
