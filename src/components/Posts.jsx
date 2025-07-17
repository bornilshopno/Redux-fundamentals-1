import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../redux/features/posts/PostSlice';

const Posts = () => {
    const dispatch = useDispatch()
    const { posts, isLoading, isError, error } = useSelector((state) => state.posts);
    useEffect(() => {
        dispatch(fetchPosts())
    }, [dispatch])

    let content;

    if (isLoading) {
        content = <><h1> ...Loading posts...</h1></>
    }

    else if (!isLoading && isError) {
        content = <><h1>{error}</h1></>
    }

    else if (!isLoading && !isError && posts.length === 0) {
        content = <><h1>No Posts Found</h1></>
    }

    else if (!isLoading && !isError && posts.length > 0) {
        content = <><ul className=' grid gap-5 grid-cols-2 justify-items-center'>
            {posts.map((post, idx) => <li key={idx}>{post.name}</li>)}</ul></>
    }
    return (
        <div className=' '>
            {content}
        </div>
    );
};

export default Posts;