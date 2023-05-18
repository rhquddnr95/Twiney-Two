
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authCtx } from "../../components/store/auth-context";

const LoginPage = (props) => {
  // 로그인 여부 상태관리
  const { isLoggedIn, setIsLoggedIn } = useContext(authCtx)
  // 이메일 입력 상태관리
  const [email, setEmail] = useState("");
  // 패스워드 입력 상태관리
  const [password, setPassword] = useState("");
  // 로그인 버튼 상태관리
  const [button, setButton] = useState(true);

  const navigate = useNavigate();

  /** 이메일 입력값 업데이트 핸들러 함수 */
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  // 로그인 완료하면 메인페이지로 이동
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  /** 비밀번호 입력값 업데이트 핸들러 함수 */
  const pwdInputHandler = (e) => {
    setPassword(e.target.value);
  };


  /** 입력값이 유효하면 제출버튼 활성화시켜주는 핸들러 함수 */
  const changeButtonHandler = () => {
    const emailRegExp =
      /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
    emailRegExp.test(email) && password.length >= 8
      ? setButton(false)
      : setButton(true);
  };

  /** 아이디, 비밀번호 일치하는 경우 로그인 완료 핸들러 함수 */
  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      // 서버에 입력한 email, password를 보내서 토큰 받아옴
      const response = await axios.post(
        "http://34.22.85.44:5000/api/users/login",
        {
          email,
          password,
        }
      );
      const token = response.data.userToken;

      // 아이디, 비밀번호가 일치해서 토큰이 정상적으로 발급된 경우 로그인 진행
      if (token) {
        localStorage.setItem("token", JSON.stringify(token));
        setIsLoggedIn(true);
      }

      // 아이디, 비밀번호가 일치하지 않는 경우
      else {
        alert("이메일이나 비밀번호가 틀렸습니다.");
        return;
      }
    } catch (error) {
      alert("이메일이나 비밀번호가 틀렸습니다.");
      return;
    }
  };

  // 로그인된 상태면 메인페이지로 이동
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <div className="flex flex-col items-center">
        {/* 로그인 Title */}
        <div className="mb-[15px] mt-[50px]">
          <h1 className="text-[32px] font-[600]">로그인</h1>
        </div>

        <div className="flex mb-[30px]">
          <span className="mr-[10px]">아직 회원이 아니신가요?</span>
          <Link to="/signup" className="text-[#AA7373]">
            회원가입 하기
          </Link>
        </div>

        {/* 이메일, 비밀번호 입력 칸 */}
        <div className="flex flex-col">
          {/* 이메일 */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="이메일"
              value={email}
              onChange={emailChangeHandler}
              onKeyUp={changeButtonHandler}
              className="p-[10px] border-[#e5d1d1] border-[2px] 
                w-[500px] h-[55px] mb-[10px] rounded-[10px]
                focus:outline-[#AA7373] focus:outline-[2px]"
            ></input>
          </div>

          {/* 비밀번호 */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="비밀번호 (8자 이상 입력해주세요)"
              value={password}
              onChange={pwdInputHandler}
              onKeyUp={changeButtonHandler}
              className="p-[10px] w-[500px] h-[55px] 
                border-[#e5d1d1] border-[2px] rounded-[10px]
                focus:outline-[#AA7373] focus:outline-[2px]"
            ></input>
          </div>
        </div>

        {/* 로그인 버튼 */}
        <div className="mb-[100px]">
          <button
            type="button"
            disabled={button}
            className="w-[500px] h-[60px] mt-[30px] rounded-[10px] 
              bg-[#7B4848] text-[20px] text-[#FFFFFF]
              disabled:bg-[#e5d1d1] disabled:text-[#262626]"
            onClick={loginSubmitHandler}
          >
            로그인
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
