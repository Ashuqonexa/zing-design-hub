import { useState, useRef } from "react";
import { Camera, Upload, Trash2, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface ProfilePhotoCardProps {
  currentPhoto?: string;
  name: string;
  onPhotoChange?: (photoUrl: string) => Promise<{ error: Error | null }>;
  saving?: boolean;
}

export function ProfilePhotoCard({ currentPhoto, name, onPhotoChange, saving }: ProfilePhotoCardProps) {
  const { user } = useAuth();
  const [photo, setPhoto] = useState<string | undefined>(currentPhoto);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "U";

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid File",
        description: "Please select an image file (JPG, PNG, GIF, etc.)",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please select an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      // Upload to Supabase Storage
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}/avatar.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from("employee-documents")
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("employee-documents")
        .getPublicUrl(fileName);

      const publicUrl = urlData.publicUrl;

      // Update profile with new avatar URL
      if (onPhotoChange) {
        const { error } = await onPhotoChange(publicUrl);
        if (error) throw error;
      }

      setPhoto(publicUrl);
      toast({
        title: "Photo Updated",
        description: "Your profile photo has been updated successfully.",
      });
    } catch (error: any) {
      console.error("Error uploading photo:", error);
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload photo. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemovePhoto = async () => {
    if (!user || !onPhotoChange) return;

    try {
      setIsUploading(true);
      
      // Update profile to remove avatar URL
      const { error } = await onPhotoChange("");
      if (error) throw error;

      setPhoto(undefined);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      toast({
        title: "Photo Removed",
        description: "Your profile photo has been removed.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to remove photo. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5 text-primary" />
          Profile Photo
        </CardTitle>
        <CardDescription>
          Upload a professional photo for your profile
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <Avatar className="h-32 w-32 border-4 border-border">
          <AvatarImage src={photo || currentPhoto} alt={name} />
          <AvatarFallback className="text-3xl font-semibold bg-primary text-primary-foreground">
            {initials}
          </AvatarFallback>
        </Avatar>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading || saving}
          >
            {isUploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Upload Photo
              </>
            )}
          </Button>
          {(photo || currentPhoto) && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleRemovePhoto}
              disabled={isUploading || saving}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Remove
            </Button>
          )}
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Recommended: Square image, at least 200x200px. Max size: 5MB
        </p>
      </CardContent>
    </Card>
  );
}
