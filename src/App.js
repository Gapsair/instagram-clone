import React, { useState, useEffect} from 'react'
import './App.css';
import Post from './Post';
import {auth, db} from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed';

function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function App() {

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);


  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const [email, setEmail] = useState([]);
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unSubcribe = auth.onAuthStateChanged((authUser) =>{
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
      }else{
        setUser(null)
      }
    })
    return() =>{
      unSubcribe();
    }
  }, [user, username])


  useEffect(() => {
    db.collection("posts").orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({ 
        id:doc.id,
        post:doc.data()
      })))
    })
  }, []);

  const signUp = (event) =>{
    event.preventDefault();

    auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName:username
      })
    })
    .catch((error) => alert(error.message))

    setOpen(false)
  }

  const signIn = (event) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email,password)
    .catch((error) => alert(error.message))
    
    setOpenSignIn(false)
  }
  


  return (
    <div className="app">


      <Modal
        open={open}
        onClose={() => setOpen(false)} 
         >
        <div style={modalStyle} className={classes.paper}>
          <form className="app_signup">
            <center>
          <img className="app_headerImage" 
          src="http://pngimg.com/uploads/instagram/small/instagram_PNG5.png" 
          alt="" />
           </center>
        <Input
               type="text"
               placeholder="username"
               value={username}
               onChange={(e) => setUsername(e.target.value)}></Input>

        <Input placeholder="email"
               type="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}></Input>

        <Input placeholder="password"
               type="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}></Input>       
    <Button type="submit" onClick={signUp}>Sign Up</Button>
  </form>  

    </div>
      </Modal>
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)} 
         >
        <div style={modalStyle} className={classes.paper}>
          <form className="app_signup">
            <center>
          <img className="app_headerImage" 
          src="http://pngimg.com/uploads/instagram/small/instagram_PNG5.png" 
          alt="" />
           </center>

        <Input placeholder="email"
               type="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}></Input>

        <Input placeholder="password"
               type="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}></Input>       
    <Button type="submit" onClick={signIn}>Sign in</Button>
  </form>  
    </div>
      </Modal>

      <div className="app_header">
        <img className="app_headerImage" src="http://pngimg.com/uploads/instagram/small/instagram_PNG5.png" alt="" className="app_headerImage"/>
     
      {user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>
        ):(
          <div className="app_loginContainer">
              <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
              <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
        )}
       </div>

       <div className="app_posts">
         <div className="app_postsLeft">
          {
            posts.map(({id, post}) =>(
              <Post key={id} 
              postId={id}
              user={user}
              username={post.username} 
              caption={post.caption} 
              imageUrl={post.imageUrl} />
            ))
          }
         </div>

          <div className="app_postsRight">

            <InstagramEmbed
                url='https://instagr.am/p/Zw9o4/'
                maxWidth={320}
                hideCaption={false}
                containerTagName='div'
                protocol=''
                injectScript
                onLoading={() => {}}
                onSuccess={() => {}}
                onAfterRender={() => {}}
                onFailure={() => {}}
              />
        </div>
       </div>
      
      {user?.displayName ?  (
        <ImageUpload  username={user.displayName}/>
      ):(
        <h3>Sorry You need to login to Upload</h3>
      )}
    </div>
  );
}

export default App;
