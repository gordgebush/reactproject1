//import { useState } from 'react'
import React from 'react';
import PostList from './components/PostList';
import CreatePostForm from './components/CreatePostForm';
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'

const App: React.FC = () => {
    return (
        <div className="App">
            <h1>nice board</h1>
            <CreatePostForm />
            <PostList /> {}
        </div>
    );
};

export default App;