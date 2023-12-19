import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';



function UserGalleryView() {
    const navigate = useNavigate();
    const params = useParams();
    const [gallery, setGallery] = useState({});
    const [writer, setWriter] = useState({});
    const [comment, setComment] = useState([]);
    const [commentList, setCommentList] = useState([]);
    const [like, setLike] = useState();
    const user = useSelector((state) => state.user);
    const [isPost, setIsPost] = useState(false);
    const formData = new FormData();

 

    function goBack(e) {
        e.preventDefault();
        navigate(-1);
    }
    
    //Enter key 누르면 댓글등록
    const handleOnKeyPress = (e) => {
        if (e.key === 'Enter') {
            postComment();
        }
    };

    const postComment = () => {
        formData.append("userNum", user.num);
        formData.append("galNum", gallery.num);
        formData.append("content", comment);
        console.log(formData);
        axios.post('http://localhost:8090/usergallerycomment', formData)
            .then((res) => {
                console.log(res.data);
                setIsPost(!isPost);
                setComment('');
            })
            .catch((err) => {
                console.log(err);
            })
    }


    const deleteComment = (e) => {
        let commentNum = e.currentTarget.value;
        console.log(commentNum);
        if (!commentNum) {
            console.error("댓글 번호가 없습니다.");
            return;
        }
        axios.post(`http://localhost:8090/usergallerycommentdelete?commentNum=${commentNum}`)

            .then((res) => {
                console.log(res.data);
                setIsPost(!isPost);
            })
            .catch((err) => {
                console.error(err);
            })
    }


    const likeClick = () => {
        const fomrData = new FormData();
        fomrData.append("galNum", gallery.num);
        fomrData.append("userNum", user.num);

        axios.post('http://localhost:8090/usergallerylike', fomrData)
            .then((res) => {
                console.log(res.data);
                setLike(res.data);
            }
            )
            .catch((err) => {
                console.log(err);
            })
    }

    const onChageComment = (e) => { 
        setComment(e.target.value);
    }

    useEffect(() => {
        console.log(params);

        axios.get(`http://localhost:8090/usergallerydetail?galNum=${params.usergalnum}&userNum=${user.num}`)
            .then((res) => {
                console.log(res.data);
                setGallery(res.data.userGallery);
                setWriter(res.data.writer);
                setLike(res.data.isLike);
                setCommentList(res.data.comments);
                console.log(commentList);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [like, isPost]);



    return (
        <div>

            <section className="st-gallery-section">
                <div className="st-gallery-view">
                    <div className="st-gallery-view-img">
                        <div className="view-gallery-profile-container magin-l-1">
                            <img src={`http://localhost:8090/usergalview/${params.usergalnum}`} alt="프로필 이미지" className="view-profile-img" />
                            <div className="view-img-nickname">{writer.nickname} </div>
                        </div>

                        <div className="view-img-container">
                            <img src={`http://localhost:8090/usergalview/${params.usergalnum}`} alt="유저갤러리 사진" className="view-img" />
                        </div>
                        <div className="view-img-icons magin-l-1">
                            <span onClick={likeClick} >{like === true ? <i className="fa-solid fa-heart hover-icon"></i> : <i className="fa-regular fa-heart hover-icon"></i>} {gallery.likeCnt} </span>
                            <span><i className="fa-regular fa-comment"></i> {gallery.commentCnt} </span>



                            <div>
                                {commentList.map((comments,num) => (
                                    <div key={num} className="view-comment">
                                        <div>
                                            <span className="view-comment-nickname"> {comments.userNickname} </span>
                                            <span className="view-comment-text"> {comments.content} </span>
                                        </div>
                                        <div>
                                            <span className="view-comment-text tx-gray"> ({comments.date}) </span>
                                            {comments.userId === user.id && <button value={comments.num} onClick={deleteComment} className='view-comment-more'><i class="fas fa-times"></i></button>}

                                        </div>
                                    </div>
                                ))}
                            </div>



                            <div className='gal-comment-container'>
                                <input type='text' value={comment} onChange={onChageComment} onKeyDown={handleOnKeyPress} className='input-text gal-text' />
                                <button className='add-comment-btn' onClick={postComment}>댓글 달기</button>
                            </div>

                            <button className="view-comment-more">덧글 더보기</button>

                        </div>
                    </div>
                </div>

                <div>
                    <button onClick={goBack} className="main-btn main-sm-btn btn-text">목록으로</button>
                </div>
            </section>


        </div>
    );
}

export default UserGalleryView;