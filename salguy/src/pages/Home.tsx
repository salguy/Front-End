import { useEffect, useState } from "react"
import mailImg from './mail-01.png';
import phoneImg from './phone.png';
import sunImg from './sun.png';
import settingImg from './settings-02.png';
import announceImg from './announcement-01.png';
import sirenImg from './Frame 1707488126.png';
import characterImg from './character.png';

interface UserInfo {
  user_id: number;
  name: string;
  profile_img: string;
}

export default function Home() {
  const [message, setMessage] = useState("도움이 필요하시면 불러주세요") // 기본 메시지
  const [currentDate, setCurrentDate] = useState("");
  const [ampm, setAmpm] = useState("");
  const [timeOnly, setTimeOnly] = useState("");
  const API_URL = import.meta.env.VITE_API_URL

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  console.log("✅ Home.tsx 렌더링 시작");

  useEffect(() => {
    fetch(`${API_URL}/api/user/me`, {
      credentials: "include", // 쿠키 기반 인증
    })
      .then((res) => res.json())
      .then((data: UserInfo) => {
        setUserInfo(data);
        console.log("user info:", data);

      })
      .catch((err) => {
        console.error("유저 정보 가져오기 실패:", err);
      });
  }, []);


  useEffect(() => {
      if (!userInfo) {
        console.log("유저 정보가 없습니다. 이벤트 소스를 생성하지 않습니다.");
        return;
      }
  
      console.log("userInfo???:", userInfo);
  
      const eventSource = new EventSource(`${API_URL}/api/events/${userInfo.user_id}`);
  
      eventSource.onmessage = (event) => {
        console.log("Event received:", event.data);
        setMessage(event.data);
      };
  
      return () => {
        eventSource.close();
      };
    }, [userInfo]);

  useEffect(() => {
    const updateTimeAndDate = () => {
      const now = new Date();

      // 시간
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const am = hours >= 12 ? "오후" : "오전";
      const displayHour = hours % 12 === 0 ? 12 : hours % 12;

      setAmpm(am);
      setTimeOnly(`${displayHour}:${minutes}`);
      
      // 날짜
      const month = now.getMonth() + 1;
      const date = now.getDate();
      const weekdayNames = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
      const weekday = weekdayNames[now.getDay()];
      setCurrentDate(`${month}월 ${date}일 ${weekday}`);
    };

    updateTimeAndDate(); // 컴포넌트가 마운트될 때 즉시 호출
    const interval = setInterval(updateTimeAndDate, 60000);
    return () => clearInterval(interval);
  }, []);


  if (userInfo && userInfo.profile_img) console.log(`Profile Img URL: ${API_URL}${userInfo?.profile_img ?? ""}`)
  else console.log("Profile Img URL: 없음");

  return (
    <div className="relative w-screen h-screen grid grid-cols-12 bg-white text-gray-800">

      {/* 좌측 사이드바 */}
      <div className="col-span-2 bg-gradient-to-b flex flex-col items-center justify-between py-8 z-10">
        {/* 프로필 */}
        {userInfo && (
        <div className="flex flex-col items-center">
          {userInfo.profile_img && (
            <img
              src={`${API_URL}${userInfo.profile_img}`}
              alt="profile"
              className="w-16 h-16 rounded-full mb-2"
            />
          )}
          {userInfo.name && (
            <div className="text-sm font-semibold">{userInfo.name}</div>
          )}
        </div>
        )}

        {/* 버튼 목록 */}
        <div className="flex flex-col items-center gap-6">
          <button className="w-20 h-20 bg-[#FAFAFA] border-2 border-[#A7ACB0] rounded-full flex items-center justify-center">
            <img src={mailImg} alt="편지" className="w-12 h-12" />
          </button>
          <button className="w-20 h-20 bg-[#FAFAFA] border-2 border-[#A7ACB0] rounded-full flex items-center justify-center">
            <img src={phoneImg} alt="전화" className="w-12 h-12" />
          </button>
        </div>
        <div>
          <button className="w-20 h-20 bg-[#FAFAFA] border-2 border-[#ECA5A5] rounded-full flex items-center justify-center">
            <img src={sirenImg} alt="사이렌" className="w-12 h-12" />
          </button>
        </div>
      </div>

      {/* 중앙 캐릭터 + 말풍선 */}
      <div className="col-span-8 flex flex-col items-center justify-center relative">
        {/* 오른쪽 위 시간/날짜 */}


        {/* 캐릭터 */}
        <div className="w-[600px] h-[600px] rounded-full flex items-center justify-center mb-8 z-10">
          <img src={characterImg} alt="character" className="w-70 h-70 rounded-full" />
        </div>

        {/* 말풍선 */}
        <div className="absolute bottom-20 px-10 py-4 w-[50vw] h-[20vh] bg-white rounded-full shadow-md border flex text-center items-center justify-center text-[35px] font-medium leading-tight z-10">
          {message}
        </div>
      </div>

      {/* 우측 슬라이더 + 설정 */}
      <div className="col-span-2 flex flex-col items-end text-right justify-between py-6 z-10 pr-24">

        <div className="flex flex-col top-8 right-8">
          {ampm && timeOnly && (
            <div className="w-[218px] h-[56px]">
              <span className="text-[32px] text-gray-400 mr-1">{ampm}</span>
              <span className="text-[50px] font-bold text-gray-800">{timeOnly}</span>
            </div>
          )}
          <div className="text-[20px] text-[#9CA4A8] w-[218px] h-[30px]">{currentDate}</div>
        </div>

        <div className="flex flex-col items-center gap-6">
          <button className="w-20 h-20 bg-[#E7E7E7] border-2 border-[#D8D8D8] rounded-full flex items-center justify-center text-xl">
            <img src={sunImg} alt="밝기" className="w-12 h-12" />
          </button>
          <button className="w-20 h-20 bg-[#E7E7E7] border-2 border-[#D8D8D8] rounded-full flex items-center justify-center text-xl">
            <img src={announceImg} alt="소리" className="w-12 h-12" />
          </button>
        </div>
        <div>
          <button className="w-20 h-20 bg-[#E7E7E7] border-2 border-[#B4BBBE] rounded-full flex items-center justify-center">
            <img src={settingImg} alt="설정" className="w-12 h-12" />
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[61vh] bg-gradient-to-b from-[#FFFFFF] to-[#C6CBD0] z-0"></div>

    </div>
  );

}
