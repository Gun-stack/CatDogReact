import Swal from "sweetalert2";

// 로고 주소 html 컨텐트 안에 들어가는 로고 
// <img src="/img/logo/modal_notice_logo.png"/></span> 주의 - 조건에 부합 하지 않을때
// <img src="/img/logo/modal_success_logo.png"/></span> 조건에 부합 한다거나, 생성에 성공했을때
// <img src="/img/logo/modal_fail_logo.png"/></span> 변경 등 실패했을때
// '<span class="sweet-modal-title">수정 되었습니다</span>', -타이틀 텍스트

const IMAGE_URLS = {
    notice: '/img/logo/modal_notice_logo.png',
    success: '/img/logo/modal_success_logo.png',
    fail: '/img/logo/modal_fail_logo.png',
    agree : '/img/logo/modal_agree_logo.png',
    modi : '/img/logo/modal_modi_logo.png',
}

function SwalCustomAlert(imageType, titleText, confirmButtonColor = '#F9950F', confirmButtonText = '확인', 
showCancelButton=false, cancelButtonText='취소', reverseButtons=true) {
    const imageUrl = IMAGE_URLS[imageType] || IMAGE_URLS.notice; // 기본 이미지는 notice로 설정
    const htmlContent = `<img src="${imageUrl}">`;

    const title = `<span class="sweet-modal-title">${titleText}</span>`;

    return (
        Swal.fire({
            html: htmlContent,
            title: title,
            confirmButtonColor: confirmButtonColor,
            confirmButtonText: confirmButtonText,
            showCancelButton: showCancelButton,
            cancelButtonText: cancelButtonText,
            reverseButtons: reverseButtons,
        })
    );
}

export default SwalCustomAlert;