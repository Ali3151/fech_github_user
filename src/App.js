import React, {useState,useEffect} from 'react';
import { Form,Card, Icon, Image } from 'semantic-ui-react'
import './App.css';
function App() {
  const [name,setName] = useState('');
  const [userName,setUsername] = useState('');
  const [location,setLocation] = useState('');
  const [follower,setFollowers] = useState('');
  const [following,setFollowing] = useState('');
  const [repos,setRepos] = useState('');
  const [avatar,setAvatar] = useState('');
  const [userInput,setUserInput] = useState('');
  const [error,setError] = useState('');
  
  useEffect(()=>{
    fetch ("https://api.github.com/users/example")
    .then(res => res.json())
    .then(data =>{
   setData(data);
    })
  },[])
  const setData =({name,login,location,followers,following,public_repos,avatar_url})=>{
    setName(name);
    setUsername(login);
    setLocation(location);
    setFollowers(followers);
    setFollowing(following);
    setRepos(public_repos);
    setAvatar(avatar_url);
  };

  const handleSearch =(e) => {
    setUserInput(e.target.value);

  }
  const handleSubmit = () =>{
    fetch (`https://api.github.com/users/${userInput}`)
    .then(res =>res.json())
    .then(data =>{
      if(data.message){
        setError(data.message);
      }else{
      setData(data);
      setError(null);
      }
    })

  }
  return (
    
    <div>
      <div className='navbar'> Get User Information From Github
      </div>
      <div className='search'>
      <Form onSubmit = {handleSubmit}>
    <Form.Group >
      <Form.Input 
       placeholder='Search'
       name ='search' 
       onChange = {handleSearch} />
      <Form.Button content='Search' />
    </Form.Group>
   
    </Form>
      </div>
      {error ? (<h1>{error}</h1>) :(   <div className='card'>
      <Card>
    <Image src={avatar} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{name}</Card.Header>
      <Card.Header>{userName}</Card.Header>
      <Card.Header>{location}</Card.Header>
     
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        {follower} followers
      </a>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        {repos} Repos
      </a>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        {following} following
      </a>
    </Card.Content>
  </Card>
      </div>)}
   
    </div>
  );
}

export default App;

