'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

export function PostModal({ onPost }: { onPost: () => void }) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    if (!title || !content || !user) return;
    setLoading(true);
    const res = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ title, content, email: user.email }),
      headers: { 'Content-Type': 'application/json' }
    });
    if (res.ok) {
      setTitle('');
      setContent('');
      setOpen(false);
      onPost(); // reload posts
    }
    setLoading(false);
  };

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mb-4">Add Post</Button>
      </DialogTrigger>
      <DialogContent>
        <h2 className="text-lg font-semibold mb-2">New Post</h2>
        <Input
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Write your content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button onClick={handlePost} disabled={loading}>
          {loading ? 'Posting...' : 'Post'}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
