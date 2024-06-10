function LoginWith(){
    return (
        <>
          <div className="mb-5 text-center text-base">Hoặc đăng nhập với</div>
          <div className="flex justify-center gap-4">
            <a href="#">
              <img src="/images/google.png" alt="" className="w-14 h-14 duration-300 hover:scale-110" />
            </a>
            <a href="#">
              <img src="/images/facebook.png" alt="" className="w-14 h-14 duration-300 hover:scale-110" />
            </a>
          </div>
        </>
    );
}

export default LoginWith;