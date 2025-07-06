
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, Building2, Filter } from "lucide-react";

interface CompanySearchProps {
  onCompanySelect: (company: string) => void;
  onBack: () => void;
  onSkipCompanySelection: () => void;
}

const CompanySearch = ({ onCompanySelect, onBack, onSkipCompanySelection }: CompanySearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "전체" },
    { id: "tech", label: "IT/인터넷" },
    { id: "electronics", label: "전자제품" },
    { id: "ecommerce", label: "쇼핑몰" },
    { id: "finance", label: "금융" },
    { id: "telecom", label: "통신" },
    { id: "automotive", label: "자동차" }
  ];

  const popularCompanies = [
    { name: "삼성전자", category: "electronics" },
    { name: "네이버", category: "tech" },
    { name: "쿠팡", category: "ecommerce" },
    { name: "카카오", category: "tech" },
    { name: "현대자동차", category: "automotive" },
    { name: "LG전자", category: "electronics" },
    { name: "SK텔레콤", category: "telecom" },
    { name: "KB국민은행", category: "finance" },
    { name: "11번가", category: "ecommerce" },
    { name: "GS25", category: "retail" },
    { name: "이마트", category: "retail" },
    { name: "CJ대한통운", category: "logistics" }
  ];

  const filteredCompanies = popularCompanies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || company.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-4 mb-4">
            <Button 
              variant="ghost" 
              size="lg" 
              onClick={onBack}
              className="hover:bg-gray-50 text-lg px-6 py-3 text-black"
            >
              <ArrowLeft className="w-6 h-6 mr-2" />
              돌아가기
            </Button>
            <h1 className="text-3xl font-bold text-black">기업 선택</h1>
          </div>
          
          {/* Skip Option */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <p className="text-black mb-4 text-xl font-medium">
              💡 어떤 기업에 문의할지 모르시겠나요?
            </p>
            <Button 
              onClick={onSkipCompanySelection}
              variant="outline"
              size="lg"
              className="bg-white border-2 border-[#00BB66] text-[#00BB66] hover:bg-gray-50 text-lg px-8 py-4"
            >
              기업을 선택하지 않고 바로 문의 작성하기
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="max-w-3xl mx-auto mb-8">
          <Card className="border-2 border-gray-200 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-center text-3xl mb-4 text-black">자주 찾는 기업</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <Input
                  type="text"
                  placeholder="기업명을 검색하세요"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 py-4 text-xl border-2 border-gray-200 focus:border-[#00BB66] rounded-xl"
                />
              </div>
              
              {/* Category Filter */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-gray-600" />
                  <span className="text-lg font-medium text-black">카테고리</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="lg"
                      onClick={() => setSelectedCategory(category.id)}
                      className={`text-base px-4 py-2 ${
                        selectedCategory === category.id 
                          ? "bg-[#00BB66] text-white hover:bg-[#009955]" 
                          : "bg-white border-2 border-gray-200 text-black hover:border-[#00BB66]"
                      }`}
                    >
                      {category.label}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Companies Grid */}
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-semibold mb-6 text-black">
            {searchTerm ? `"${searchTerm}" 검색 결과` : selectedCategory === "all" ? '기업 목록' : `${categories.find(c => c.id === selectedCategory)?.label} 기업`}
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company) => (
              <Card 
                key={company.name}
                className="border-2 border-gray-200 hover:border-[#00BB66] hover:shadow-xl transition-all duration-300 cursor-pointer bg-white"
                onClick={() => onCompanySelect(company.name)}
              >
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center">
                      <Building2 className="w-8 h-8 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl text-black mb-2">{company.name}</h4>
                      <Badge variant="secondary" className="text-sm bg-gray-100 text-black px-3 py-1">
                        {categories.find(c => c.id === company.category)?.label}
                      </Badge>
                    </div>
                  </div>
                  
                  <Button size="lg" variant="ghost" className="w-full text-[#00BB66] hover:bg-gray-50 text-lg py-3">
                    문의하기 →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCompanies.length === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-3">검색 결과가 없습니다</h3>
              <p className="text-gray-500 text-lg mb-4">다른 키워드로 검색해보거나 카테고리를 변경해보세요</p>
              <Button 
                onClick={onSkipCompanySelection}
                size="lg"
                className="bg-[#00BB66] text-white hover:bg-[#009955] px-8 py-3 text-lg"
              >
                기업을 찾지 못했다면 바로 문의 작성하기
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanySearch;
