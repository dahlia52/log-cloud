import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PictureOutlined, SyncOutlined } from '@ant-design/icons'
import Webcam from 'react-webcam';


//카메라 화면
const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

const videoConstraints = {
    facingMode: FACING_MODE_USER
};

//접속 기기 및 브라우저 확인
export function checkBrowser() {
    // 안드로이드 모바일 기기인 경우 webm 지정
    if (/Android/i.test(navigator.userAgent)) {
        return ['android', 'webm']
    }
    // ios 모바일 기기인 경우 mp4 지정
    else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        return ['ios', 'mp4']
    }
    // Windows 의 Chrome 브라우저인 경우 webm 지정
    else if (navigator.userAgent.indexOf("Chrome") > -1) {
        return ['chrome', 'webm']
    }
    // Mac OS 의 Safari 브라우저인 경우 mp4 지정
    else if (navigator.userAgent.indexOf("Safari") > -1) {
        return ['safari', 'mp4']
    }
}

export function CameraRecord() {
    //카메라 전환
    const [facingMode, setFacingMode] = React.useState(FACING_MODE_USER);

    const handleClick = React.useCallback(() => {
        setFacingMode(
            prevState =>
                prevState === FACING_MODE_USER
                    ? FACING_MODE_ENVIRONMENT
                    : FACING_MODE_USER
        );
    }, []);


    let [name, videoType] = ['', '']
    useEffect(() => {
        [name, videoType] = checkBrowser()
    }, [])


    //영상 녹화
    const webcamRef = React.useRef(null);
    const mediaRecorderRef = React.useRef(null);
    const [recording, setRecording] = React.useState(false);
    const [recordedChunks, setRecordedChunks] = React.useState([]);
  
    const handleStartRecordClick = React.useCallback(() => {
        setRecording(true);
        mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
            mimeType: `video/${videoType}`
        });
        mediaRecorderRef.current.addEventListener(
            "dataavailable",
            handleDataAvailable
        );
        mediaRecorderRef.current.start();
    }, [webcamRef, setRecording, mediaRecorderRef]);
  
    const handleDataAvailable = React.useCallback(
        ({ data }) => {
            if (data.size > 0) {
                setRecordedChunks((prev) => prev.concat(data));
            }
        },
        [setRecordedChunks]
    );
  
    const handleStopRecordClick = React.useCallback(() => {
        mediaRecorderRef.current.stop();
        setRecording(false);
    }, [mediaRecorderRef, webcamRef, setRecording]);
  
    

    //동영상 업로드 (갤러리)
    const [selectedVideo, setSelectedVideo] = useState(null);
    const fileInputRef = React.useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedVideo(file);
    };

    const handleFileIconClick = React.useCallback(() => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }, [fileInputRef]);


    //영상 서버에 업로드
    const handleUpload = async (selectedVideo) => {
        console.log("버튼 클릭")

        if (selectedVideo) {
            console.log("영상 있음")
            const formData = new FormData();
            formData.append('video', selectedVideo);

            try {
                const response = await fetch('/record', {
                    method: 'POST',
                    headers: {},
                    body: formData,
                }).then(response => {
                    console.log(response)
                    if (response.status === 200) {
                        console.log('성공');
                    }
                    if (response.status === 400) {
                        console.log('Error during video upload:');
                    }
                });
            } 
            catch (error) {
                console.error('Error during video upload:', error);
            }
        } 

        else if (recordedChunks.length) {
            const blob = new Blob(recordedChunks, { type: "video/mp4" });
            const formData = new FormData();
            formData.append('video', blob);

            console.log('영상 녹화 완료')

            try {
                const response = await fetch('/record', {
                    method: 'POST',
                    headers: {},
                    body: formData,
                }).then(response => {
                    console.log(response)
                    if (response.status === 200) {
                        console.log('성공');
                    }
                    if (response.status === 400) {
                        console.log('Error during video upload:');
                    }
                });
            } 
            catch (error) {
                console.error('Error during video upload:', error);
            }
        }

        else {
            console.log('No video recorded.');
        }
    };
    
    
    
    return (
        <>
        <div className="camera-box">
            <Webcam 
            audio={true}
            muted={true}
            ref={webcamRef} 
            videoConstraints={{
                ...videoConstraints,
                facingMode,
                width: 522,
                height: 351
            }} />
        </div>

        <div className="camera-navigator">
            <input type="file" accept="video/*" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
            <PictureOutlined className="gallery" onClick={handleFileIconClick}/>

            {recording ? (
                <div className="camera-button" onClick={handleStopRecordClick}>
                    <div className="recording-stop-button"></div>
                </div>
            ) : (
                <div className="camera-button" onClick={handleStartRecordClick}>
                    <div className="recording-start-button"></div>
                </div>
                
            )}
            
            <SyncOutlined className="switch" onClick={handleClick}/>
        </div>

        <div className="upload-button">
            <Link to={'/upload'} state={{ prevURL: '/record' }} className="upload-link">
                <div onClick={() => handleUpload(selectedVideo)}>UPLOAD</div>
            </Link>
        </div>
        </>
    );
};
