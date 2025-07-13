import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Plus, Upload, Trash2, LogOut, Settings } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { useAuth } from "@/hooks/useAuth";
import AnimationControls from "./AnimationControls";
import DesignControls from "./DesignControls";

interface AdminPanelProps {
  onClose: () => void;
}

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  videoUrl: string;
  thumbnail: string;
  tags: string[];
  type: "long" | "short";
  videoType: "youtube" | "vimeo";
  youtubeId: string;
}

interface SocialLinks {
  instagram: string;
  twitter: string;
  linkedin: string;
}

const AdminPanel = ({ onClose }: AdminPanelProps) => {
  const { logout } = useAuth();
  const {
    profileData = {},
    longFormProjects = [],
    shortFormProjects = [],
    updateProfile,
    addProject,
    deleteProject,
  } = usePortfolioData();

  const [activeTab, setActiveTab] = useState("profile");
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    category: "",
    videoUrl: "",
    thumbnail: "",
    tags: "",
    type: "long" as "long" | "short",
    videoType: "youtube" as "youtube" | "vimeo",
    youtubeId: ""
  });

  // Fallback for socials to avoid undefined errors
  const socials = profileData.socials ?? { instagram: "", twitter: "", linkedin: "" };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
    onClose();
  };

  const validateVideoUrl = (url: string): { isValid: boolean; type: "youtube" | "vimeo" | null; id: string } => {
    const youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^#&?]*).*/;
    const vimeoRegex = /^(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com\/)(\d+)/;
    
    const youtubeMatch = url.match(youtubeRegex);
    const vimeoMatch = url.match(vimeoRegex);

    if (youtubeMatch && youtubeMatch[1]) {
      return { isValid: true, type: "youtube", id: youtubeMatch[1] };
    } else if (vimeoMatch && vimeoMatch[1]) {
      return { isValid: true, type: "vimeo", id: vimeoMatch[1] };
    }
    
    return { isValid: false, type: null, id: "" };
  };

  const validateSocialUrl = (type: keyof SocialLinks, url: string): boolean => {
    const patterns = {
      instagram: /^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_\.]+\/?$/,
      twitter: /^https?:\/\/(www\.)?twitter\.com\/[a-zA-Z0-9_]+\/?$/,
      linkedin: /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9\-]+\/?$/
    };
    return patterns[type].test(url);
  };

  // Add this helper if not present
  const extractYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : '';
  };

  const handleProfileUpdate = (field: string, value: string) => {
    try {
      if (!field) throw new Error("Field name is required");

      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        if (parent === 'socials') {
          const socialType = child as keyof SocialLinks;
          if (!value.trim()) {
            updateProfile({ 
              socials: { 
                ...socials,
                [child]: '' 
              } 
            });
            toast({
              title: "Profile Updated",
              description: `${field} has been updated successfully.`,
            });
            return;
          }
          if (!validateSocialUrl(socialType, value)) {
            throw new Error(`Invalid ${socialType} URL format`);
          }
          updateProfile({ 
            socials: { 
              ...socials,
              [child]: value.trim()
            }
          });
          toast({
            title: "Profile Updated",
            description: `${field} has been updated successfully.`,
          });
          return;
        }
        const parentData = profileData[parent as keyof typeof profileData];
        if (!parent || !child) throw new Error("Invalid field path");
        if (parentData && typeof parentData === 'object') {
          updateProfile({ 
            [parent]: { 
              ...parentData,
              [child]: value.trim() 
            } 
          });
        }
      } else {
        updateProfile({ [field]: value.trim() });
      }
      toast({
        title: "Profile Updated",
        description: `${field} has been updated successfully.`,
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: error instanceof Error ? error.message : "Failed to update profile",
        variant: "destructive"
      });
    }
  };

  const handleAddProject = async () => {
    try {
      // Validate required fields
      if (!newProject.title.trim()) throw new Error("Title is required");
      if (!newProject.description.trim()) throw new Error("Description is required");
      if (!newProject.videoUrl.trim()) throw new Error("Video URL is required");

      // Validate video URL
      const videoValidation = validateVideoUrl(newProject.videoUrl);
      if (!videoValidation.isValid) {
        throw new Error("Invalid video URL. Please enter a valid YouTube or Vimeo URL");
      }

      const project: Project = {
        ...newProject,
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        tags: newProject.tags.split(",")
          .map(tag => tag.trim())
          .filter(tag => tag.length > 0),
        videoType: videoValidation.type as "youtube" | "vimeo",
        youtubeId: videoValidation.id
      };

      // Await addProject if it returns a Promise, otherwise just call it
      await Promise.resolve(addProject(project));

      toast({
        title: "Success",
        description: "Project added successfully",
      });

      // Reset form
      setNewProject({
        title: "",
        description: "",
        category: "",
        videoUrl: "",
        thumbnail: "",
        tags: "",
        type: "long",
        videoType: "youtube",
        youtubeId: ""
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add project",
        variant: "destructive"
      });
    }
  };

  const handleDeleteProject = async (id: string, type: "long" | "short") => {
    try {
      if (!id || !type) throw new Error("Invalid project details");
      
      await deleteProject(id, type);
      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto bg-gray-900 text-white border-gray-700">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-2xl font-bold">Admin Panel</DialogTitle>
            <div className="flex gap-2">
              <Button onClick={handleLogout} variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
              <Button onClick={onClose} variant="ghost" size="sm">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <DialogDescription>
            Manage your portfolio content, design, animations, and media settings
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-gray-800">
            <TabsTrigger value="profile" className="data-[state=active]:bg-indigo-600">
              Profile
            </TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-indigo-600">
              Projects
            </TabsTrigger>
            <TabsTrigger value="design" className="data-[state=active]:bg-indigo-600">
              Design
            </TabsTrigger>
            <TabsTrigger value="animations" className="data-[state=active]:bg-indigo-600">
              Animations
            </TabsTrigger>
            <TabsTrigger value="media" className="data-[state=active]:bg-indigo-600">
              Media
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <Input
                  value={profileData.name}
                  onChange={(e) => handleProfileUpdate("name", e.target.value)}
                  className="bg-gray-800 border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Bio</label>
                <Textarea
                  value={profileData.bio}
                  onChange={(e) => handleProfileUpdate("bio", e.target.value)}
                  className="bg-gray-800 border-gray-600"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  value={profileData.email}
                  onChange={(e) => handleProfileUpdate("email", e.target.value)}
                  className="bg-gray-800 border-gray-600"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Instagram</label>
                  <Input
                    value={socials.instagram}
                    onChange={(e) => handleProfileUpdate("socials.instagram", e.target.value)}
                    className="bg-gray-800 border-gray-600"
                    placeholder="https://instagram.com/username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Twitter</label>
                  <Input
                    value={socials.twitter}
                    onChange={(e) => handleProfileUpdate("socials.twitter", e.target.value)}
                    className="bg-gray-800 border-gray-600"
                    placeholder="https://twitter.com/username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">LinkedIn</label>
                  <Input
                    value={socials.linkedin}
                    onChange={(e) => handleProfileUpdate("socials.linkedin", e.target.value)}
                    className="bg-gray-800 border-gray-600"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Add New Project</h3>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <Input
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      className="bg-gray-700 border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <Input
                      value={newProject.category}
                      onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                      className="bg-gray-700 border-gray-600"
                      placeholder="Documentary, Commercial, etc."
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    className="bg-gray-700 border-gray-600"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Video URL <span className="text-red-500">*</span></label>
                    <Input
                      value={newProject.videoUrl}
                      onChange={(e) => {
                        const url = e.target.value;
                        setNewProject({
                          ...newProject,
                          videoUrl: url,
                          videoType: url.includes('youtube.com') || url.includes('youtu.be') ? 'youtube' : 'vimeo',
                          youtubeId: url.includes('youtube.com') || url.includes('youtu.be') ? extractYoutubeId(url) : ''
                        });
                      }}
                      className="bg-gray-700 border-gray-600"
                      placeholder="YouTube or Vimeo URL"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Thumbnail URL</label>
                    <Input
                      value={newProject.thumbnail}
                      onChange={(e) => setNewProject({ ...newProject, thumbnail: e.target.value })}
                      className="bg-gray-700 border-gray-600"
                      placeholder="https://..."
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
                    <Input
                      value={newProject.tags}
                      onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
                      className="bg-gray-700 border-gray-600"
                      placeholder="editing, motion graphics, color grading"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Type</label>
                    <select
                      value={newProject.type}
                      onChange={(e) => setNewProject({ ...newProject, type: e.target.value as "long" | "short" })}
                      className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                    >
                      <option value="long">Long Form</option>
                      <option value="short">Short Form</option>
                    </select>
                  </div>
                </div>
                <Button onClick={handleAddProject} className="bg-indigo-600 hover:bg-indigo-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Project
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Existing Projects</h3>
              
              <div>
                <h4 className="text-md font-medium mb-2">Long Form Projects</h4>
                <div className="space-y-2">
                  {longFormProjects.map((project) => (
                    <div key={project.id} className="flex justify-between items-center bg-gray-800 p-3 rounded-lg">
                      <span>{project.title}</span>
                      <Button
                        onClick={() => handleDeleteProject(project.id, "long")}
                        variant="destructive"
                        size="sm"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-md font-medium mb-2">Short Form Projects</h4>
                <div className="space-y-2">
                  {shortFormProjects.map((project) => (
                    <div key={project.id} className="flex justify-between items-center bg-gray-800 p-3 rounded-lg">
                      <span>{project.title}</span>
                      <Button
                        onClick={() => handleDeleteProject(project.id, "short")}
                        variant="destructive"
                        size="sm"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="design" className="space-y-6">
            <DesignControls />
          </TabsContent>

          <TabsContent value="animations" className="space-y-6">
            <AnimationControls />
          </TabsContent>

          <TabsContent value="media" className="space-y-6">
            <div className="text-center py-12 bg-gray-800 rounded-lg border-2 border-dashed border-gray-600">
              <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">Upload Media</h3>
              <p className="text-gray-400 mb-4">Drag and drop video files or click to browse</p>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                Choose Files
              </Button>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Media Library</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">No media uploaded</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AdminPanel;
