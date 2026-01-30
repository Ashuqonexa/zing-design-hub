import { useState } from "react";
import { FileText, Upload, Trash2, Eye, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";

interface Document {
  id: string;
  fileName: string;
  documentType: string;
  fileSize: string;
  uploadedAt: string;
  verified: boolean;
}

const documentTypes = [
  { value: "id-proof", label: "ID Proof (Passport/License)" },
  { value: "pan-card", label: "PAN Card" },
  { value: "aadhar-card", label: "Aadhar Card" },
  { value: "address-proof", label: "Address Proof" },
  { value: "education", label: "Education Certificate" },
  { value: "experience", label: "Experience Letter" },
  { value: "offer-letter", label: "Offer Letter" },
  { value: "relieving-letter", label: "Relieving Letter" },
  { value: "other", label: "Other Document" },
];

// Mock documents for demo (without auth)
const mockDocuments: Document[] = [
  {
    id: "1",
    fileName: "pan_card.pdf",
    documentType: "pan-card",
    fileSize: "256 KB",
    uploadedAt: "2024-01-15",
    verified: true,
  },
  {
    id: "2",
    fileName: "degree_certificate.pdf",
    documentType: "education",
    fileSize: "1.2 MB",
    uploadedAt: "2024-01-10",
    verified: true,
  },
  {
    id: "3",
    fileName: "aadhar_card.pdf",
    documentType: "aadhar-card",
    fileSize: "180 KB",
    uploadedAt: "2024-02-01",
    verified: false,
  },
];

export function DocumentUploadCard() {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [selectedType, setSelectedType] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please select a file smaller than 10MB.",
          variant: "destructive",
        });
        return;
      }
      // Validate file type
      const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: "Please upload a PDF, JPG, or PNG file.",
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleUpload = async () => {
    if (!selectedFile || !selectedType) {
      toast({
        title: "Missing Information",
        description: "Please select both a file and document type.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    // Simulate upload (in production, this would upload to Supabase Storage)
    setTimeout(() => {
      const newDoc: Document = {
        id: Date.now().toString(),
        fileName: selectedFile.name,
        documentType: selectedType,
        fileSize: formatFileSize(selectedFile.size),
        uploadedAt: new Date().toISOString().split("T")[0],
        verified: false,
      };

      setDocuments([...documents, newDoc]);
      setSelectedFile(null);
      setSelectedType("");
      setIsUploading(false);

      // Reset file input
      const fileInput = document.getElementById("document-upload") as HTMLInputElement;
      if (fileInput) fileInput.value = "";

      toast({
        title: "Document Uploaded",
        description: "Your document has been uploaded and is pending verification.",
      });
    }, 1500);
  };

  const handleDelete = (id: string) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
    toast({
      title: "Document Deleted",
      description: "The document has been removed.",
    });
  };

  const getDocumentTypeLabel = (value: string) => {
    return documentTypes.find((t) => t.value === value)?.label || value;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Documents
        </CardTitle>
        <CardDescription>
          Upload ID proofs, certificates, and other documents
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Section */}
        <div className="rounded-lg border-2 border-dashed border-muted-foreground/25 p-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="documentType">Document Type</Label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {documentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="document-upload">Select File</Label>
              <Input
                id="document-upload"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileSelect}
                className="cursor-pointer"
              />
            </div>
            <div className="flex items-end">
              <Button
                onClick={handleUpload}
                disabled={!selectedFile || !selectedType || isUploading}
                className="w-full"
              >
                <Upload className="mr-2 h-4 w-4" />
                {isUploading ? "Uploading..." : "Upload"}
              </Button>
            </div>
          </div>
          {selectedFile && (
            <p className="mt-2 text-sm text-muted-foreground">
              Selected: {selectedFile.name} ({formatFileSize(selectedFile.size)})
            </p>
          )}
          <p className="mt-2 text-xs text-muted-foreground">
            Accepted formats: PDF, JPG, PNG. Max size: 10MB
          </p>
        </div>

        {/* Documents Table */}
        {documents.length > 0 ? (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Uploaded</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        {doc.fileName}
                      </div>
                    </TableCell>
                    <TableCell>{getDocumentTypeLabel(doc.documentType)}</TableCell>
                    <TableCell>{doc.fileSize}</TableCell>
                    <TableCell>{doc.uploadedAt}</TableCell>
                    <TableCell>
                      {doc.verified ? (
                        <Badge variant="default" className="bg-green-500">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          <Clock className="mr-1 h-3 w-3" />
                          Pending
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" title="View">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          title="Delete"
                          onClick={() => handleDelete(doc.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="py-8 text-center text-muted-foreground">
            <FileText className="mx-auto h-12 w-12 opacity-50" />
            <p className="mt-2">No documents uploaded yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
