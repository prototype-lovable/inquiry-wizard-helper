
import { useToast } from "@/hooks/use-toast";

interface UserInfo {
  name: string;
  email: string;
  phone: string;
  orderNumber: string;
  companyGuess: string;
}

export const useInquiryAI = () => {
  const { toast } = useToast();

  const generateAIInquiry = async (
    selectedType: string,
    company: string,
    userInfo: UserInfo,
    keywords: string,
    setInquiryText: (text: string) => void,
    setIsGenerating: (loading: boolean) => void
  ) => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const templates = {
        refund: `안녕하세요, ${company || userInfo.companyGuess || '[기업명]'} 고객센터입니다.

주문번호 ${userInfo.orderNumber || 'XXX-XXX-XXX'} 관련하여 ${keywords || '제품'}에 대한 환불을 요청드리고자 연락드립니다.

${keywords ? `구체적인 사유: ${keywords}` : '구체적인 사유를 말씀해주시면 빠른 처리가 가능합니다.'}

빠른 처리 부탁드리며, 추가 서류가 필요하시면 언제든 말씀해주세요.

감사합니다.`,
        
        account: `안녕하세요, ${company || userInfo.companyGuess || '[기업명]'} 고객센터입니다.

계정 관련 문제로 연락드립니다.
${keywords ? `문제 상황: ${keywords}` : '로그인 또는 계정 접근에 어려움이 있습니다.'}

등록된 이메일: ${userInfo.email || '이메일 주소'}
연락처: ${userInfo.phone || '연락처'}

빠른 해결 방안을 안내해주시면 감사하겠습니다.

감사합니다.`,
        
        complaint: `안녕하세요, ${company || userInfo.companyGuess || '[기업명]'} 고객센터입니다.

서비스 이용 중 불편한 점이 있어 연락드립니다.
${keywords ? `불편사항: ${keywords}` : '구체적인 불편사항을 설명드리겠습니다.'}

${userInfo.orderNumber ? `관련 주문번호: ${userInfo.orderNumber}` : ''}

개선 방안과 해결책을 제시해주시면 감사하겠습니다.

감사합니다.`,
        
        general: `안녕하세요, ${company || userInfo.companyGuess || '[기업명]'} 고객센터입니다.

${keywords || '서비스'}에 대해 문의드리고자 합니다.

${keywords ? `문의 내용: ${keywords}` : '자세한 내용은 다음과 같습니다.'}

빠른 답변 부탁드립니다.

감사합니다.`
      };

      setInquiryText(templates[selectedType as keyof typeof templates] || templates.general);
      setIsGenerating(false);
      
      toast({
        title: "AI 문구 생성 완료",
        description: "문의 내용이 자동으로 작성되었습니다. 수정하여 사용하세요.",
      });
    }, 2000);
  };

  return { generateAIInquiry };
};
