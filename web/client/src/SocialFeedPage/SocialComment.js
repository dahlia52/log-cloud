import React from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import { Navigation } from '../AppPage/AppComponents'
import { LogHeader, ProfileDate, LikeList, Comment, AddComment } from './SocialCommentComponents'
import './SocialComment.css';

export function SocialComment({ data, setPage, prevPage, setPrevPage }) {
    return (
        <div className="social-comment-page">
            
            <LogHeader setPage={setPage} setPrevPage={setPrevPage} />

            <ProfileDate date={data.date} id="test_id" profile_img_src="profile.png" />

            <AnimatePresence mode='wait'>
                {prevPage === 'social-detail' && (
                    <motion.div
                    initial={{ opacity: 0, y: '100%' }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: '200%', when: "afterChildren" }}
                    transition={{ duration: 0.5 }}
                    style={{ zIndex: 1 }}
                    >

                    <div className='comments-like-box'>

                        <LikeList like_id_list={ ['test_idtest_id1test_id1', 'test_id2', 'test_id2', 'test_id2', 'test_id2'] } setPage={setPage} setPrevPage={setPrevPage} />

                        {/* 댓글 개수만큼 */}
                        <div className='comments-box'>
                            <Comment img_src='profile.png' id='test_id1' value= '댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글' />
                            <Comment img_src='profile.png' id='test_id2' value= '댓글2댓글2' />
                            <Comment img_src='profile.png' id='test_id1' value= '댓글3' />
                            <Comment img_src='profile.png' id='test_id2' value= '댓글2댓글4' />
                            <Comment img_src='profile.png' id='test_id1' value= '댓글3' />
                            <Comment img_src='profile.png' id='test_id2' value= '댓글2댓글4' />
                            <Comment img_src='profile.png' id='test_id1' value= '댓글3' />
                        </div>

                        <AddComment />
                    </div>

                    
                    </motion.div>   
                )}

                {prevPage === 'social-like' && (
                    <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1}}
                    exit={{ opacity: 0, when: "afterChildren" }}
                    transition={{ duration: 0.5 }}
                    style={{ zIndex: 1 }}
                    >

                    <div className='comments-like-box'>

                        <LikeList like_id_list={ ['test_idtest_id1test_id1', 'test_id2', 'test_id2', 'test_id2', 'test_id2'] } setPage={setPage} setPrevPage={setPrevPage} />

                        {/* 댓글 개수만큼 */}
                        <div className='comments-box'>
                            <Comment img_src='profile.png' id='test_id1' value= '댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글' />
                            <Comment img_src='profile.png' id='test_id2' value= '댓글2댓글2' />
                            <Comment img_src='profile.png' id='test_id1' value= '댓글3' />
                            <Comment img_src='profile.png' id='test_id2' value= '댓글2댓글4' />
                            <Comment img_src='profile.png' id='test_id1' value= '댓글3' />
                            <Comment img_src='profile.png' id='test_id2' value= '댓글2댓글4' />
                            <Comment img_src='profile.png' id='test_id1' value= '댓글3' />
                        </div>

                        <AddComment />
                    </div>

                    
                    </motion.div>   
                )}
                
            </AnimatePresence>

            <Navigation/>
        </div>

    );

};