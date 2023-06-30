import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import usePost from "./usePost";
import usePosts from "./usePosts";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

const useLikeTwo = ({ postId, userId }: { postId: string, userId?: string}) => {
    const { data: currentUser } = useCurrentUser();
    const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId)
    const { mutate: mutateFetchedPosts } = usePosts(userId);


    const loginModal = useLoginModal();

    const hasLikedTwo = useMemo(() => {
        const list = fetchedPost?.likedIdsTwo || [];

        return list.includes(currentUser?.id);
    }, [currentUser?.id, fetchedPost?.likedIdsTwo])

    const toggleLikeTwo = useCallback(async () => {
        if (!currentUser) {
            return loginModal.onOpen();
        }
    
        try {
            let request;
            if (hasLikedTwo) {
                request = () => axios.delete('/api/likeTwo', { data: { postId } });
            } else {
                request = () => axios.post('/api/likeTwo', { postId });
            }
    
            await request();
            mutateFetchedPost();
            mutateFetchedPosts();
    
            toast.success('Success');
        } catch (error) {
            toast.error('Something went wrong');
        }
    }, [
        currentUser,
        hasLikedTwo,
        postId,
        mutateFetchedPost,
        mutateFetchedPosts,
        loginModal
    ]);
    
    

    return {
        hasLikedTwo,
        toggleLikeTwo
    }

}

export default useLikeTwo