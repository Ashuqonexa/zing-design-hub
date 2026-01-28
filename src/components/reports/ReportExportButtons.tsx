import { Button } from "@/components/ui/button";
import { FileText, FileSpreadsheet, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ReportType } from "@/types/reports";

interface ReportExportButtonsProps {
  reportType: ReportType;
}

export function ReportExportButtons({ reportType }: ReportExportButtonsProps) {
  const { toast } = useToast();

  const reportTypeLabels: Record<ReportType, string> = {
    attendance: "Attendance",
    leave: "Leave",
    payroll: "Payroll",
  };

  const handleExportPDF = () => {
    // Simulate PDF generation
    const content = generateReportContent(reportType, "pdf");
    downloadFile(content, `${reportType}-report.pdf`, "application/pdf");
    
    toast({
      title: "PDF Downloaded",
      description: `${reportTypeLabels[reportType]} report has been downloaded as PDF.`,
    });
  };

  const handleExportExcel = () => {
    // Simulate Excel generation (CSV format)
    const content = generateReportContent(reportType, "csv");
    downloadFile(content, `${reportType}-report.csv`, "text/csv");
    
    toast({
      title: "Excel Downloaded",
      description: `${reportTypeLabels[reportType]} report has been downloaded as Excel.`,
    });
  };

  return (
    <div className="flex gap-3">
      <Button onClick={handleExportPDF} className="gap-2">
        <FileText className="h-4 w-4" />
        Export PDF
      </Button>
      <Button onClick={handleExportExcel} variant="outline" className="gap-2">
        <FileSpreadsheet className="h-4 w-4" />
        Export Excel
      </Button>
    </div>
  );
}

function generateReportContent(reportType: ReportType, format: "pdf" | "csv"): string {
  const date = new Date().toLocaleDateString();
  
  if (format === "csv") {
    switch (reportType) {
      case "attendance":
        return `Attendance Report - Generated on ${date}\n\nMonth,Present,Absent,Late,Remote\nAugust,20,1,2,2\nSeptember,19,2,3,1\nOctober,21,0,1,3\nNovember,18,2,3,2\nDecember,19,1,2,3\nJanuary,18,1,2,1`;
      case "leave":
        return `Leave Report - Generated on ${date}\n\nType,Approved,Pending,Rejected\nAnnual,12,3,2\nSick,8,1,1\nPersonal,5,2,0\nMaternity,1,0,0\nUnpaid,2,1,1`;
      case "payroll":
        return `Payroll Report - Generated on ${date}\n\nMonth,Gross Pay,Deductions,Net Pay\nAugust,720000,86400,633600\nSeptember,735000,88200,646800\nOctober,745000,89400,655600\nNovember,750000,90000,660000\nDecember,780000,93600,686400\nJanuary,795000,95400,699600`;
    }
  }
  
  // For PDF, return text content (in a real app, you'd use a PDF library)
  return `${reportType.toUpperCase()} REPORT\n\nGenerated on: ${date}\n\nThis is a sample ${reportType} report.\nIn a production environment, this would be a properly formatted PDF document.`;
}

function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
