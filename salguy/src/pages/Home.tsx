export default function Home() {
    return (
      <div className="grid grid-cols-12 h-screen text-gray-800 font-sans">
  
        {/* 왼쪽: 프로필 + 버튼 */}
        <div className="col-span-2 flex flex-col items-center justify-between py-6 bg-gradient-to-b from-gray-100 to-white">
          <div className="flex flex-col items-center">
            <img src="https://via.placeholder.com/60" className="w-14 h-14 rounded-full mb-4 border" />
            <div className="text-xs font-medium text-center">양예순</div>
          </div>
          <div className="flex flex-col items-center space-y-6">
            <button className="w-10 h-10 bg-gray-200 rounded-full">📩</button>
            <button className="w-10 h-10 bg-gray-200 rounded-full">📞</button>
            <button className="w-10 h-10 bg-red-200 rounded-full">🚨</button>
          </div>
        </div>
  
        {/* 가운데 캐릭터 + 말풍선 */}
        <div className="col-span-8 flex flex-col items-center justify-center relative">
          <div className="absolute top-6 right-6 text-right text-sm">
            <div className="text-lg font-semibold">오후 06:27</div>
            <div className="text-xs text-gray-500">4월 15일 수요일</div>
          </div>
          <div className="w-64 h-64 bg-gray-200 rounded-full flex items-center justify-center shadow-inner text-4xl">
            😊
          </div>
          <div className="mt-6 px-6 py-3 rounded-full bg-white shadow-md border text-center text-sm leading-tight">
            죄송해요 할머니<br />
            다시 말씀해주시겠어요?
          </div>
        </div>
  
        {/* 오른쪽 밝기/설정 */}
        <div className="col-span-2 flex flex-col items-center justify-between py-6">
          <div className="flex flex-col items-center space-y-2 text-sm">
            <span>밝게</span>
            <input type="range" min={1} max={100} defaultValue={40} className="rotate-[-90deg] h-28" />
            <span>어둡게</span>
          </div>
          <button className="w-10 h-10 bg-gray-200 rounded-full">⚙️</button>
        </div>
      </div>
    )
  }
  