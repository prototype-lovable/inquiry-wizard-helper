
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, CreditCard, User, AlertCircle } from "lucide-react";

interface InquiryType {
  id: string;
  label: string;
  icon: typeof FileText;
  description: string;
}

interface InquiryTypeSelectionProps {
  selectedType: string;
  onTypeSelect: (type: string) => void;
  onNext: () => void;
}

const InquiryTypeSelection = ({ selectedType, onTypeSelect, onNext }: InquiryTypeSelectionProps) => {
  const inquiryTypes: InquiryType[] = [
    { id: "refund", label: "환불/교환", icon: CreditCard, description: "제품 환불이나 교환을 요청하고 싶어요" },
    { id: "account", label: "계정 문제", icon: User, description: "로그인이나 계정 관련 문제가 있어요" },
    { id: "complaint", label: "불만/클레임", icon: AlertCircle, description: "서비스나 제품에 문제가 있어요" },
    { id: "general", label: "일반 문의", icon: FileText, description: "기타 궁금한 점이 있어요" }
  ];

  return (
    <Card className="border-2 border-gray-200 shadow-lg bg-white">
      <CardHeader>
        <CardTitle className="text-3xl text-center mb-4 text-black">문의 유형을 선택해주세요</CardTitle>
        <p className="text-center text-lg text-gray-600">
          가장 비슷한 유형을 선택하시면 더 정확한 답변을 받을 수 있어요
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {inquiryTypes.map((type) => (
          <Card
            key={type.id}
            className={`cursor-pointer transition-all duration-200 ${
              selectedType === type.id
                ? "border-2 border-[#00BB66] bg-gray-50 shadow-lg scale-105"
                : "border-2 border-gray-200 hover:border-[#00BB66] hover:shadow-md"
            }`}
            onClick={() => onTypeSelect(type.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                  selectedType === type.id ? "bg-[#00BB66]" : "bg-gray-100"
                }`}>
                  <type.icon className={`w-8 h-8 ${
                    selectedType === type.id ? "text-white" : "text-gray-600"
                  }`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl text-black">{type.label}</h3>
                  <p className="text-gray-600 text-base mt-1">{type.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        <Button 
          className="w-full mt-8 py-6 text-xl bg-[#00BB66] hover:bg-[#009955] text-white" 
          onClick={onNext}
          disabled={!selectedType}
          size="lg"
        >
          다음 단계
        </Button>
      </CardContent>
    </Card>
  );
};

export default InquiryTypeSelection;
