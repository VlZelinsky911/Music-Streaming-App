import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import toast from "react-hot-toast";

export const useUserAvatar = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        toast.error("Error getting user.");
        return;
      }
      setUserId(data.user?.id || null);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchPhoto = async () => {
      if (!userId) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("avatar_url")
        .eq("id", userId)
        .single();

      if (error) {
        toast.error("Could not upload profile photo.");
        return;
      }

      if (data?.avatar_url) {
        const { data: urlData } = supabase
          .storage
          .from("avatars")
          .getPublicUrl(data.avatar_url);
        setPhoto(urlData?.publicUrl || null);
      }
    };

    fetchPhoto();
  }, [userId]);

  const uploadPhoto = async (file: File) => {
    if (!userId) return;

    try {
      setLoading(true);
      const ext = file.name.split(".").pop();
      const fileName = `${Date.now()}.${ext}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase
        .storage
        .from("avatars")
        .upload(filePath, file);
      if (uploadError) throw uploadError;

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: filePath })
        .eq("id", userId);
      if (updateError) throw updateError;

      const { data: publicUrlData } = supabase
        .storage
        .from("avatars")
        .getPublicUrl(filePath);

      setPhoto(publicUrlData?.publicUrl || null);
			
      toast.success("Photo updated successfully!");
    } catch (error: string | any) {
      toast.error(error.message || "Error updating photo");
    } finally {
      setLoading(false);
    }
  };

	const removeLastUploadedPhoto = async () => {
		if (!userId) {
			toast.error("User ID not found.");
			return;
		}
	
		try {
			const { data: profileData, error } = await supabase
				.from("profiles")
				.select("avatar_url")
				.eq("id", userId)
				.single();
	
			if (error) {
				toast.error("Failed to get avatar_url.");
				return;
			}
	
			const filePath = profileData?.avatar_url;
	
			if (filePath) {
				console.log('Removing photo from storage:', filePath);
	
				const { error: deleteError } = await supabase
					.storage
					.from("avatars")
					.remove([filePath]);
	
				if (deleteError) {
					toast.error("Failed to delete file from bucket");
				} else {
					toast.success("Photo successfully deleted from bucket");
					setPhoto(null);
				}
			} else {
				toast.error("No photo to delete.");
			}
		} catch (error) {
			toast.error("Error removing photo.");
		}
	};
	

  return {
    photo,
    uploadPhoto,
    loading,
		removeLastUploadedPhoto,
  };
};
