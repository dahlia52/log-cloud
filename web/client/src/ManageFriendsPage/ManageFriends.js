import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navigation } from '../AppPage/AppComponents'
import { SearchOutlined } from '@ant-design/icons'
import { ManageFriendsHeader, PendingRequests, MyFriends, SearchingMyFriends, SearchingMoreResults } from './ManageFriendsComponents'
import './ManageFriends.css'
import {getProfileImage} from "../ProfilePage/ProfileComponents";

function ManageFriendsPage() {
    const [friendUsername, setFriendUsername] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    const [friendList, setFriendList] = useState(JSON.parse(sessionStorage.getItem('friendList')));
    const [pendingReceivedRequests, setPendingReceivedRequests] = useState(JSON.parse(sessionStorage.getItem('pendingReceivedRequests')));
    const [pendingSentRequests, setPendingSentRequests] = useState(JSON.parse(sessionStorage.getItem('pendingSentRequests')));

    const [searchResult, setSearchResult] = useState([]);

    // console.log(friendList);
    // console.log(pendingReceivedRequests);
    // console.log(pendingSentRequests);

    const updatePendingSentRequests = (friendUsername, isSent) => {
        if (isSent) {
            setPendingSentRequests([...pendingSentRequests, friendUsername]);
        } else {
            setPendingSentRequests(pendingSentRequests.filter(username => username !== friendUsername));
        }
        sessionStorage.setItem('pendingSentRequests', pendingSentRequests);
    };


    useEffect(() => {
        //검색중인지 확인
        if (friendUsername !== "") {
            setIsSearching(true);
        }
        else {
            setIsSearching(false);
        }
    }, [friendUsername]);


    useEffect(() => {
        async function fetchSearchResult() {
            try {
                const response = await fetch('/search_user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({'searchString': friendUsername}),
                });
                if (response.status===200) {
                    const data = await response.json();
                    // console.log(data);
                    setSearchResult(data.users);
                } else if (response.status===202) {
                    setSearchResult([]);
                } else {
                    console.log('Error fetching friend data');
                    setSearchResult([]);
                }
            } catch (error) {
            console.error('Error fetching data:', error);
            }
        }
        fetchSearchResult();
    }, [friendUsername]);

    useEffect( () => {
        async function fetchProfileImage() {
            for (const user of searchResult) {
                if (!sessionStorage[user]) {
                    sessionStorage.setItem(user, await getProfileImage(user));
                }
            }
        }

        fetchProfileImage();
    }, [searchResult]);

    useEffect( () => {
        async function fetchProfileImage() {
            for (const user of friendList) {
                if (!sessionStorage[user]) {
                    sessionStorage.setItem(user, await getProfileImage(user));
                }
            }
        }

        fetchProfileImage();
    }, [friendList]);

    const handleSetFriendName = (e) => {
        setFriendUsername(e.target.value);
        // console.log(friendUsername);

    };

    return (
        <div className="manage-friends-page">
            <AnimatePresence mode='wait'>
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, when: "afterChildren" }}
                transition={{ duration: 0.5 }}
                >

                <ManageFriendsHeader />

                <div className='search-friends-box'>
                    <SearchOutlined className='search-icon' />
                    <input value={friendUsername} onChange={(e) => handleSetFriendName(e)} placeholder='add or search friends' className='search-friends'></input>
                </div>

                
                {!isSearching && (
                    <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, when: "afterChildren" }}
                    transition={{ duration: 0.5 }}
                    >
                        <PendingRequests friendList={friendList} pendingReceivedRequests={pendingReceivedRequests} pendingSentRequests={pendingSentRequests} />
                        <MyFriends friendList={friendList} />
                    </motion.div>
                )}

                {isSearching && (
                    <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, when: "afterChildren" }}
                    transition={{ duration: 0.5 }}
                    >
                        <SearchingMyFriends friendList={friendList} searchString={friendUsername} />
                        <SearchingMoreResults searchResult={searchResult} pendingSentRequests={pendingSentRequests} updatePendingSentRequests={updatePendingSentRequests} />
                    </motion.div>
                )}
 
                </motion.div>
            </AnimatePresence>

            <Navigation />
        </div>
    )
}

export default ManageFriendsPage;