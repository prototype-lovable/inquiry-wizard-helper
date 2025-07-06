
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Play, Phone, MessageCircle, Lightbulb, CheckCircle } from "lucide-react";

interface AccessibilityGuideProps {
  onBack: () => void;
}

const AccessibilityGuide = ({ onBack }: AccessibilityGuideProps) => {
  const steps = [
    {
      title: "1단계: 기업 선택하기",
      description: "문의할 기업을 검색하거나 목록에서 선택하세요. 모르셔도 괜찮습니다!",
      tips: ["검색창에 기업명을 입력하세요", "카테고리 버튼으로 필터링할 수 있어요", "모르면 '바로 문의 작성하기' 버튼을 누르세요"]
    },
    {
      title: "2단계: 문의 유형 선택",
      description: "환불, 계정 문제, 일반 문의 등 해당하는 유형을 선택하세요.",
      tips: ["가장 비슷한 유형을 선택하세요", "정확하지 않아도 괜찮습니다", "일반 문의를 선택해도 됩니다"]
    },
    {
      title: "3단계: 기본 정보 입력",
      description: "이름과 연락처를 입력하세요. 답변을 받기 위해 필요합니다.",
      tips: ["이름과 이메일은 필수입니다", "전화번호는 선택사항입니다", "주문번호가 있으면 함께 입력하세요"]
    },
    {
      title: "4단계: 문의 내용 작성",
      description: "AI가 도와드리니까 키워드만 입력하셔도 됩니다.",
      tips: ["'AI 문구 자동 생성' 버튼을 누르세요", "키워드만 입력해도 완전한 문장이 됩니다", "생성된 문구를 수정할 수 있습니다"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="lg" 
              onClick={onBack}
              className="hover:bg-purple-50 text-lg px-6 py-3"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              돌아가기
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">사용 가이드</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* 소개 섹션 */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl mb-4">
              🎯 통합문의 사용법 가이드
            </CardTitle>
            <p className="text-xl text-gray-600 leading-relaxed">
              처음 사용하시는 분들을 위한 친절한 설명입니다.<br/>
              차근차근 따라하시면 쉽게 문의할 수 있어요!
            </p>
          </CardHeader>
        </Card>

        {/* 비디오 가이드 섹션 */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Play className="w-6 h-6 mr-2 text-purple-600" />
              영상으로 배우기 (3분)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 rounded-xl h-64 flex flex-col items-center justify-center mb-4">
              <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                <Play className="w-10 h-10 text-white" />
              </div>
              <p className="text-lg text-gray-600">사용법 설명 영상</p>
              <p className="text-sm text-gray-500">재생 시간: 3분 27초</p>
            </div>
            <Button size="lg" className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 text-xl">
              영상 시청하기
            </Button>
          </CardContent>
        </Card>

        {/* 단계별 가이드 */}
        <div className="space-y-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📝 단계별 사용법</h2>
          
          {steps.map((step, index) => (
            <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                    {index + 1}
                  </div>
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-700 mb-4">{step.description}</p>
                <div className="space-y-2">
                  <p className="font-medium text-gray-800 flex items-center">
                    <Lightbulb className="w-4 h-4 mr-2 text-yellow-500" />
                    도움말:
                  </p>
                  {step.tips.map((tip, tipIndex) => (
                    <div key={tipIndex} className="flex items-start space-x-2 text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 도움이 필요할 때 */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-blue-50">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              🆘 도움이 더 필요하시다면
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                <Phone className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-green-800 mb-2">전화 상담</h3>
                <p className="text-2xl font-bold text-green-900 mb-2">1588-1234</p>
                <p className="text-green-700">평일 9시~18시</p>
                <p className="text-sm text-gray-600 mt-2">친절한 상담원이 직접 도와드려요</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-blue-800 mb-2">문자 접수</h3>
                <p className="text-2xl font-bold text-blue-900 mb-2">010-1234-5678</p>
                <p className="text-blue-700">24시간 접수 가능</p>
                <p className="text-sm text-gray-600 mt-2">문자로 문의 내용을 보내주세요</p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-center">
                💡 <strong>꿀팁:</strong> 전화나 문자로 문의하실 때도 문의할 기업명과 간단한 내용을 말씀해주시면 더 빠르게 도와드릴 수 있어요!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 시작하기 버튼 */}
        <div className="text-center mt-8">
          <Button 
            onClick={onBack}
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-6 text-2xl font-semibold rounded-2xl shadow-lg"
          >
            이제 시작해보기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityGuide;
