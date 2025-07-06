
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { FileText, CreditCard, User, AlertCircle } from "lucide-react";
import InquiryHeader from "./inquiry/InquiryHeader";
import InquiryTypeSelection from "./inquiry/InquiryTypeSelection";
import UserInfoForm from "./inquiry/UserInfoForm";
import InquiryComposer from "./inquiry/InquiryComposer";
import { useInquiryAI } from "@/hooks/useInquiryAI";

interface InquiryFlowProps {
  company: string;
  onBack: () => void;
  skipCompanySelection?: boolean;
}

const InquiryFlow = ({ company, onBack, skipCompanySelection = false }: InquiryFlowProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedType, setSelectedType] = useState<string>("");
  const [inquiryText, setInquiryText] = useState("");
  const [keywords, setKeywords] = useState("");
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    orderNumber: "",
    companyGuess: ""
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { generateAIInquiry } = useInquiryAI();

  const inquiryTypes = [
    { id: "refund", label: "환불/교환", icon: CreditCard, description: "제품 환불이나 교환을 요청하고 싶어요" },
    { id: "account", label: "계정 문제", icon: User, description: "로그인이나 계정 관련 문제가 있어요" },
    { id: "complaint", label: "불만/클레임", icon: AlertCircle, description: "서비스나 제품에 문제가 있어요" },
    { id: "general", label: "일반 문의", icon: FileText, description: "기타 궁금한 점이 있어요" }
  ];

  const handleGenerateAI = () => {
    generateAIInquiry(selectedType, company, userInfo, keywords, setInquiryText, setIsGenerating);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      
      if (skipCompanySelection) {
        toast({
          title: "문의 접수 완료",
          description: "저희가 적절한 기업을 찾아 문의를 전달하고 답변을 안내해드리겠습니다.",
        });
      } else {
        toast({
          title: "문의 전송 완료",
          description: `${company}에 문의가 성공적으로 전송되었습니다. 답변은 이메일로 받아보실 수 있습니다.`,
        });
      }
      
      onBack();
    }, 1500);
  };

  const progress = (currentStep / 3) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <InquiryHeader 
        onBack={onBack}
        company={company}
        skipCompanySelection={skipCompanySelection}
        currentStep={currentStep}
        progress={progress}
      />

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {currentStep === 1 && (
          <InquiryTypeSelection
            selectedType={selectedType}
            onTypeSelect={setSelectedType}
            onNext={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 2 && (
          <UserInfoForm
            userInfo={userInfo}
            onUserInfoChange={setUserInfo}
            keywords={keywords}
            onKeywordsChange={setKeywords}
            selectedType={selectedType}
            skipCompanySelection={skipCompanySelection}
            onBack={() => setCurrentStep(1)}
            onNext={() => setCurrentStep(3)}
          />
        )}

        {currentStep === 3 && (
          <InquiryComposer
            inquiryText={inquiryText}
            onInquiryTextChange={setInquiryText}
            isGenerating={isGenerating}
            onGenerateAI={handleGenerateAI}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
            onBack={() => setCurrentStep(2)}
            company={company}
            skipCompanySelection={skipCompanySelection}
            userInfo={userInfo}
            selectedType={selectedType}
            inquiryTypes={inquiryTypes}
          />
        )}
      </div>
    </div>
  );
};

export default InquiryFlow;
