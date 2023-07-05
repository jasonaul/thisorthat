import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import usePost from "./usePost";
import usePosts from "./usePosts";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

const useLike = ({ postId, userId }: { postId: string, userId?: string}) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId)
  const { mutate: mutateFetchedPosts } = usePosts(userId);

  const loginModal = useLoginModal();

  const hasLiked = useMemo(() => {
    const list = fetchedPost?.likedIds || [];
    return list.includes(currentUser?.id);
  }, [currentUser?.id, fetchedPost?.likedIds])

  const toggleLike = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
  
    try {
      let request;
      if (hasLiked) {
        console.log('Deleting like:', postId);
        request = () => {
          console.log('Before axios.delete:', postId);
          return axios.delete('/api/like', { params: { postId } }); // Use params instead of data
        };
      } else {
        console.log('Adding like:', postId);
        request = () => {
          console.log('Before axios.post:', postId);
          return axios.post('/api/like', { postId });
        };
      }
  
      console.log('postId:', postId); 
      await request();
      console.log('Like request successful:', postId);
      mutateFetchedPost();
      mutateFetchedPosts();

      toast.success('Success');
    } catch (error) {
      console.log('Error:', error);
      toast.error('Something went wrong');
    }
  }, [
    currentUser,
    hasLiked,
    postId,
    mutateFetchedPost,
    mutateFetchedPosts,
    loginModal
  ]);

  return {
    hasLiked,
    toggleLike
  };
}

export default useLike;
