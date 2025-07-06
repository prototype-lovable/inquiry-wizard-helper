
import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Sparkles, Send, Paperclip, X, FileText, Image, Video } from "lucide-react";

interface UserInfo {
  name: string;
  email: string;
  phone: string;
  orderNumber: string;
  companyGuess: string;
}

interface InquiryType {
  id: string;
  label: string;
}

interface AttachedFile {
  name: string;
  size: number;
  type: string;
  file: File;
}

interface InquiryComposerProps {
  inquiryText: string;
  onInquiryTextChange: (text: string) => void;
  isGenerating: boolean;
  onGenerateAI: () => void;
  isSubmitting: boolean;
  onSubmit: () => void;
  onBack: () => void;
  company: string;
  skipCompanySelection: boolean;
  userInfo: UserInfo;
  selectedType: string;
  inquiryTypes: InquiryType[];
}

const InquiryComposer = ({
  inquiryText,
  onInquiryTextChange,
  isGenerating,
  onGenerateAI,
  isSubmitting,
  onSubmit,
  onBack,
  company,
  skipCompanySelection,
  userInfo,
  selectedType,
  inquiryTypes
}: InquiryComposerProps) => {
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileAttach = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles: AttachedFile[] = Array.from(files).map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        file: file
      }));
      setAttachedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="w-4 h-4" />;
    if (type.startsWith('video/')) return <Video className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  };

  return (
    <Card className="border-2 border-gray-200 shadow-lg bg-white">
      <CardHeader>
        <CardTitle className="text-3xl text-center mb-4 text-black">문의 내용을 작성해주세요</CardTitle>
        <p className="text-center text-lg text-gray-600">
          AI가 도와드리니까 키워드만 입력하셔도 됩니다
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-wrap gap-4 mb-6">
          <Button
            onClick={onGenerateAI}
            disabled={isGenerating}
            className="bg-[#00BB66] hover:bg-[#009955] text-white py-4 px-8 text-lg"
            size="lg"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            {isGenerating ? "AI 문구 생성 중..." : "AI 문구 자동 생성"}
          </Button>
          
          <Button
            onClick={handleFileAttach}
            variant="outline"
            className="border-2 border-gray-300 text-black hover:bg-gray-50 py-4 px-8 text-lg"
            size="lg"
          >
            <Paperclip className="w-5 h-5 mr-2" />
            파일 첨부
          </Button>
        </div>

        {/* File Input (Hidden) */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*,.pdf,.doc,.docx,.txt"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Attached Files */}
        {attachedFiles.length > 0 && (
          <div className="space-y-3">
            <Label className="text-lg font-medium text-black">첨부 파일</Label>
            <div className="space-y-2">
              {attachedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-3">
                    {getFileIcon(file.type)}
                    <div>
                      <p className="font-medium text-black">{file.name}</p>
                      <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="space-y-3">
          <Label htmlFor="inquiry" className="text-lg font-medium text-black">문의 내용</Label>
          <Textarea
            id="inquiry"
            value={inquiryText}
            onChange={(e) => onInquiryTextChange(e.target.value)}
            placeholder="문의할 내용을 입력하세요. AI 자동 생성 버튼을 사용하면 더 쉽게 작성할 수 있습니다."
            className="min-h-[250px] border-2 border-gray-200 focus:border-[#00BB66] text-lg"
          />
        </div>
        
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h4 className="font-bold text-lg mb-4 text-black">📋 문의 요약</h4>
          <div className="text-base space-y-2 text-black">
            <p><strong>기업:</strong> {skipCompanySelection ? (userInfo.companyGuess || '저희가 찾아드려요') : company}</p>
            <p><strong>유형:</strong> {inquiryTypes.find(t => t.id === selectedType)?.label}</p>
            <p><strong>이름:</strong> {userInfo.name}</p>
            <p><strong>이메일:</strong> {userInfo.email}</p>
            {attachedFiles.length > 0 && (
              <p><strong>첨부 파일:</strong> {attachedFiles.length}개</p>
            )}
            {skipCompanySelection && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  💡 기업을 선택하지 않으셨어도 괜찮아요! 문의 내용을 분석해서 적절한 기업을 찾아 전달해드릴게요.
                </p>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex space-x-4 pt-6">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="flex-1 py-4 text-lg border-2 border-gray-300 text-black hover:bg-gray-50"
            size="lg"
          >
            이전
          </Button>
          <Button 
            onClick={onSubmit}
            disabled={!inquiryText.trim() || isSubmitting}
            className="flex-1 bg-[#00BB66] hover:bg-[#009955] text-white py-4 text-lg"
            size="lg"
          >
            <Send className="w-5 h-5 mr-2" />
            {isSubmitting ? "전송 중..." : skipCompanySelection ? "문의 접수하기" : "문의 전송"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InquiryComposer;
