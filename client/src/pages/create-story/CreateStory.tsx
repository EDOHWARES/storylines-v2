import React, { useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { Story } from "../../types/Story";
import { createStory } from '../../services/storyAPI';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { IconBold, IconItalic, IconList, IconListNumbers, IconH2 } from '@tabler/icons-react';
import { sanitizeHtml } from '../../utils/htmlSanitizer';

const CreateStory: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [storyTitle, setStoryTitle] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  const prevStoryId = location.state?.prevStoryId;
  const themeRoomId = location.state?.themeRoomId;
  const rootNode = location.state?.rootNode

  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Start writing your story here...</p>',
  });

  const processContent = (content: string): string => {
    const sanitizedContent = sanitizeHtml(content);
    return sanitizedContent.replace(/<\/p><p>/g, '</p><br><p>');
  };

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const newStory: Partial<Story> = {
        title: storyTitle,
        content: processContent(editor?.getHTML() || ''),
        type: rootNode ? 'root' : 'child',
        themeRoomId: themeRoomId,
        prev: prevStoryId ? [prevStoryId] : [],
        author: ['66a8449eb7c52cb3dec16071'],
      };
      await createStory(newStory);
      navigate(-1);
    } catch (err) {
      console.error('Error creating story:', err);
      setError('Failed to create story. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [storyTitle, editor, rootNode, themeRoomId, prevStoryId, navigate]);



  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto py-8">
        <Card className="shadow-lg">
          <form onSubmit={handleSubmit}>
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-2xl">Create a New Story</CardTitle>
              <Input
                type="text"
                placeholder="Enter your story title"
                value={storyTitle}
                onChange={(e) => setStoryTitle(e.target.value)}
                className="text-3xl font-bold mt-2 bg-transparent border-none focus:ring-0 p-0"
              />
            </CardHeader>
            <CardContent>
              <div className="border rounded-md p-2 mb-4">
                <div className="flex items-center space-x-2 mb-2 overflow-x-auto pb-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                    className={`p-1 ${editor?.isActive('bold') ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                  >
                    <IconBold className="h-5 w-5" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                    className={`p-1 ${editor?.isActive('italic') ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                  >
                    <IconItalic className="h-5 w-5" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`p-1 ${editor?.isActive('heading', { level: 2 }) ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                  >
                    <IconH2 className="h-5 w-5" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor?.chain().focus().toggleBulletList().run()}
                    className={`p-1 ${editor?.isActive('bulletList') ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                  >
                    <IconList className="h-5 w-5" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                    className={`p-1 ${editor?.isActive('orderedList') ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                  >
                    <IconListNumbers className="h-5 w-5" />
                  </Button>
                </div>
                <div className="prose dark:prose-invert max-w-none min-h-[300px] max-h-[500px] overflow-y-auto">
                  <EditorContent editor={editor} />
                </div>
              </div>
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Creating...' : 'Create Story'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CreateStory;