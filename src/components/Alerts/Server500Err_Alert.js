import Swal from "sweetalert2";

function Server500Err_Alert() {
    return (Swal.fire({
        html: '<img src="/img/logo/modal_fail_logo.png"/></span>',
        title: '<span class="sweet-modal-title">서버통신에 실패했습니다</span>',
        confirmButtonColor: '#F9950F',
        confirmButtonText: '확인',
    })
    );
}

export default Server500Err_Alert;