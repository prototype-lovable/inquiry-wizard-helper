
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Play, Phone, MessageCircle, Lightbulb, CheckCircle, MessageSquare } from "lucide-react";

interface AccessibilityGuideProps {
  onBack: () => void;
}

const AccessibilityGuide = ({ onBack }: AccessibilityGuideProps) => {
  const steps = [
    {
      title: "1단계: 문의 유형 선택",
      description: "환불, 계정 문제, 일반 문의 등 해당하는 유형을 선택하세요.",
      tips: ["가장 비슷한 유형을 선택하세요", "정확하지 않아도 괜찮습니다", "일반 문의를 선택해도 됩니다"]
    },
    {
      title: "2단계: 정보 입력 및 문의 작성",
      description: "기본 정보를 입력하고 키워드를 넣으면 문의 내용이 자동으로 생성됩니다.",
      tips: ["이름과 이메일은 필수입니다", "키워드만 입력해도 완전한 문장이 됩니다", "생성된 문구를 수정할 수 있습니다"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onBack}
                className="hover:bg-gray-50 px-4 py-2 text-black"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                돌아가기
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-black">대신문의</h1>
                  <p className="text-sm text-gray-600">사용 가이드</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* 소개 섹션 */}
        <Card className="border-2 border-gray-200 shadow-lg bg-white mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl mb-3 text-black">
              🎯 대신문의 사용법 가이드
            </CardTitle>
            <p className="text-lg text-gray-600 leading-relaxed">
              처음 사용하시는 분들을 위한 친절한 설명입니다.<br/>
              차근차근 따라하시면 쉽게 문의할 수 있어요!
            </p>
          </CardHeader>
        </Card>

        {/* 비디오 가이드 섹션 */}
        <Card className="border-2 border-gray-200 shadow-lg bg-white mb-8">
          <CardHeader>
            <CardTitle className="text-xl flex items-center text-black">
              <Play className="w-5 h-5 mr-2 text-blue-600" />
              영상으로 배우기 (3분)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 rounded-xl h-48 flex flex-col items-center justify-center mb-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-3">
                <Play className="w-8 h-8 text-white" />
              </div>
              <p className="text-base text-gray-600">사용법 설명 영상</p>
              <p className="text-sm text-gray-500">재생 시간: 3분 27초</p>
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12">
              영상 시청하기
            </Button>
          </CardContent>
        </Card>

        {/* 단계별 가이드 */}
        <div className="space-y-6 mb-8">
          <h2 className="text-xl font-bold text-black mb-4">📝 단계별 사용법</h2>
          
          {steps.map((step, index) => (
            <Card key={index} className="border-2 border-gray-200 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="text-lg flex items-center text-black">
                  <div className="w-6 h-6 bg-[#00BB66] text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                    {index + 1}
                  </div>
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base text-gray-700 mb-3">{step.description}</p>
                <div className="space-y-2">
                  <p className="font-medium text-gray-800 flex items-center text-sm">
                    <Lightbulb className="w-4 h-4 mr-2 text-[#00BB66]" />
                    도움말:
                  </p>
                  {step.tips.map((tip, tipIndex) => (
                    <div key={tipIndex} className="flex items-start space-x-2 text-gray-600 text-sm">
                      <CheckCircle className="w-4 h-4 text-[#00BB66] mt-0.5 flex-shrink-0" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 도움이 필요할 때 */}
        <Card className="border-2 border-gray-200 shadow-lg bg-white mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-center text-black">
              🆘 도움이 더 필요하시다면
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <Phone className="w-10 h-10 text-[#00BB66] mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-black mb-2">전화 상담</h3>
                <p className="text-xl font-bold text-black mb-1">1588-1234</p>
                <p className="text-[#00BB66] text-sm">평일 9시~18시</p>
                <p className="text-xs text-gray-600 mt-2">친절한 상담원이 직접 도와드려요</p>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <MessageCircle className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-black mb-2">문자 접수</h3>
                <p className="text-xl font-bold text-black mb-1">010-1234-5678</p>
                <p className="text-blue-600 text-sm">24시간 접수 가능</p>
                <p className="text-xs text-gray-600 mt-2">문자로 문의 내용을 보내주세요</p>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-gray-50 border-2 border-gray-200 rounded-lg">
              <p className="text-gray-800 text-center text-sm">
                💡 <strong>꿀팁:</strong> 전화나 문자로 문의하실 때도 문의할 기업명과 간단한 내용을 말씀해주시면 더 빠르게 도와드릴 수 있어요!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 시작하기 버튼 */}
        <div className="text-center">
          <Button 
            onClick={onBack}
            className="bg-[#00BB66] hover:bg-[#009955] text-white px-8 h-12 text-lg font-semibold rounded-lg shadow-lg"
          >
            이제 시작해보기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityGuide;
