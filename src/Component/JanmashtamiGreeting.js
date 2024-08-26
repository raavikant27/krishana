// src/components/JanmashtamiGreeting.js
import React, { useState } from 'react';
import { Button, Container, Typography, Box, Card, CardContent, TextField, Divider, IconButton } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

function JanmashtamiGreeting() {
    const [wish, setWish] = useState('');
    const [wishesList, setWishesList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');
    const [comments, setComments] = useState({});
    const [user, setUser] = useState({ name: 'User', avatar: 'https://via.placeholder.com/50' });

    const handleWishChange = (event) => setWish(event.target.value);
    const handleWishSubmit = (event) => {
        event.preventDefault();
        if (wish.trim()) {
            setWishesList([
                ...wishesList,
                {
                    id: uuidv4(),
                    userId: user.name,
                    text: wish,
                    timestamp: new Date(),
                    approved: true,
                    category,
                    likes: [],
                    comments: []
                }
            ]);
            setWish('');
        }
    };

    const handleSearchChange = (event) => setSearchTerm(event.target.value.toLowerCase());
    const handleLike = (wishId) => setWishesList(wishesList.map(wish =>
        wish.id === wishId ? { ...wish, likes: [...wish.likes, user.name] } : wish
    ));
    const handleCommentSubmit = (wishId, comment) => {
        const commentId = uuidv4();
        setComments(prev => ({
            ...prev,
            [wishId]: [
                ...(prev[wishId] || []),
                { id: commentId, text: comment, userId: user.name, timestamp: new Date() }
            ]
        }));
        setWishesList(wishesList.map(wish =>
            wish.id === wishId ? { ...wish, comments: [...wish.comments, { id: commentId, text: comment, userId: user.name }] } : wish
        ));
    };
    const handleShare = (wishId) => alert('Share functionality is not implemented.');

    const filteredWishes = wishesList.filter(wish =>
        wish.text.toLowerCase().includes(searchTerm) &&
        (category ? wish.category === category : true)
    );

    return (
        <Container maxWidth="sm">
            <Box textAlign="center" mt={10} mb={5}>
                <Card style={{ backgroundColor: '#f5f5f5', borderRadius: '10px', marginBottom: '20px' }}>
                    <CardContent>
                        <Typography
                            variant="h2"
                            style={{
                                color: '#ff5722',
                                fontWeight: 'bold',
                                marginBottom: '10px'
                            }}
                            gutterBottom
                        >
                            Jai Shree Krishna! Wishing You a Joyous and Blessed Krishna Janmashtami!
                        </Typography>
                    </CardContent>
                </Card>

                <Card style={{ borderRadius: '10px', overflow: 'hidden', marginBottom: '20px' }}>
                    <img
                        src="https://img.jagranjosh.com/images/2024/August/2582024/krishna-two.jpg"
                        alt="Lord Krishna"
                        style={{
                            width: '100%',
                            height: 'auto',
                            maxHeight: '300px',
                            objectFit: 'cover'
                        }}
                    />
                </Card>

                <TextField
                    label="Search Wishes"
                    variant="outlined"
                    fullWidth
                    onChange={handleSearchChange}
                    style={{ marginBottom: '20px' }}
                />
                <TextField
                    label="Category"
                    variant="outlined"
                    fullWidth
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{ marginBottom: '20px' }}
                />

                <Card style={{ backgroundColor: '#e8f5e9', borderRadius: '10px', padding: '20px', marginBottom: '20px' }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Post Your Wish
                        </Typography>
                        <form onSubmit={handleWishSubmit}>
                            <TextField
                                label="Your Wish"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                value={wish}
                                onChange={handleWishChange}
                                style={{ marginBottom: '20px' }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Post Wish
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <Card style={{ backgroundColor: '#f1f8e9', borderRadius: '10px', padding: '20px' }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Wishes from Others
                        </Typography>
                        <Divider style={{ marginBottom: '20px' }} />
                        {filteredWishes.length === 0 ? (
                            <Typography variant="body1" color="textSecondary">
                                No wishes yet. Be the first to post!
                            </Typography>
                        ) : (
                            filteredWishes.map((wish) => (
                                <Box key={wish.id} mb={2} p={2} border={1} borderColor="#c8e6c9" borderRadius="8px">
                                    <Typography variant="body1">
                                        {wish.text}
                                    </Typography>
                                    <Typography variant="caption" color="textSecondary">
                                        {moment(wish.timestamp).format('MMMM Do YYYY, h:mm:ss a')}
                                    </Typography>
                                    <Box display="flex" alignItems="center" mt={1}>
                                        <IconButton onClick={() => handleLike(wish.id)}>
                                            <ThumbUpIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleCommentSubmit(wish.id, 'Sample comment')}>
                                            <CommentIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleShare(wish.id)}>
                                            <ShareIcon />
                                        </IconButton>
                                    </Box>
                                    <Box mt={2}>
                                        {comments[wish.id] && comments[wish.id].map((comment) => (
                                            <Box key={comment.id} mb={1} p={1} border={1} borderColor="#c8e6c9" borderRadius="8px">
                                                <Typography variant="body2">
                                                    {comment.text}
                                                </Typography>
                                                <Typography variant="caption" color="textSecondary">
                                                    {moment(comment.timestamp).format('MMMM Do YYYY, h:mm:ss a')}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>
                            ))
                        )}
                    </CardContent>
                </Card>

                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => alert('Happy Krishna Janmashtami!')}
                    style={{ marginTop: '20px', marginBottom: '20px' }}
                >
                    Click to Wish
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => setUser(null)}
                >
                    Logout
                </Button>
            </Box>
        </Container>
    );
}

export default JanmashtamiGreeting;
