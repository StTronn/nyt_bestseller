import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';

const styles = muiBaseTheme => ({
    card: {
      marginBottom:muiBaseTheme.spacing(2),
      width: 800,
      margin: "auto",
      transition: "0.3s",
      boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
      "&:hover": {
        boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
      }
    },
    media: {
      marginRight:"20px",
      width:125,
      height:200,
      float:'left'
    },
    content: {
      textAlign: "left",
      padding: muiBaseTheme.spacing(3)
    },
    divider: {
      margin: `${muiBaseTheme.spacing(3)}px 0`
    },
    heading: {
      fontWeight: "bold"
    },
    subheading: {
      lineHeight: 1.8
    },
    title: {
      display:'inline-block',
      float:'left',
      marginRight:'590px'
    },
    subheader:{
      lineHeight:'2.0em'
    },
    headerRoot:{
    }
  });

export class BookCard extends React.Component{
  constructor(props){
    super(props);
    this.state={
      img:""
    }
  }
  componentDidMount(){
    let isbn=this.props.book.isbns[0].isbn10 ||this.props.book.isbns[0].isbn13;
    fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn + "&key=" + process.env.REACT_APP_GOOGLE_BOOKS_API, {
      method: 'get'
    })
    .then(response => { return response.json(); })
    .then(data => {
      console.log(data);
      let img = data.items[0].volumeInfo.imageLinks.thumbnail;
      img = img.replace(/^http:\/\//i, 'https://');
      this.setState({img});
    })  
    .catch(error=> {   
      console.log(error);
    });
  }
  render(){
        let book ={
          title:this.props.book.book_details[0].title,
          author:this.props.book.book_details[0].author,
          description:this.props.book.book_details[0].description,
          rank:this.props.book.rank,
          weeksOnList:this.props.book.weeks_on_list,  
          isbn:this.props.book.isbns[0]
        }
        let shortDescp=book.description.slice(0,Math.min(180,book.description.length) ); 
        let classes=this.props.classes;
        return( 
            <Card className={classes.card}>
            <CardHeader 
              classes={{
                root:classes.headerRoot,
                title: classes.title,
                subheader:classes.subheader
              }} 
              title={book.rank}
              subheader={ book.weeksOnList===0? 'New this week':book.weeksOnList+` week${book.weeksOnList===1?"":"s"} on the list`}              
              />
            <CardMedia
              className={classes.media}
              image={
                this.state.img
              }
              src={"img"}
              />
            <CardContent className={classes.content}>
              <Typography
                className={"MuiTypography--heading"}
                variant={"h6"}
                >
                {book.title}
              </Typography>
              <Typography 
                className={"MuiTypography-subtitle2"}
                variant={"subtitle2"} >
                {book.author}
              </Typography> 
              <Divider className={classes.divider} light />
                <Typography
                    className={"MuiTypography--subheading"}
                    variant={"caption"}
                    >
                    {shortDescp}
                </Typography>
            </CardContent>
          </Card>
        );
      }
    }
export default withStyles(styles)(BookCard);