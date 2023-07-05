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
    }, [currentUser?.id, fetchedPost?.likedIdsTwo]);

    const toggleLikeTwo = useCallback(async () => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        try {
            let request;
            if (hasLikedTwo) {
                console.log('Deleting like:', postId);
                request = () => axios.delete('/api/likeTwo', { params: { postId } });
            } else {
                console.log('Adding like:', postId);
                request = () => axios.post('/api/likeTwo', { postId });
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
        hasLikedTwo,
        postId,
        mutateFetchedPost,
        mutateFetchedPosts,
        loginModal
    ]);

    return {
        hasLikedTwo,
        toggleLikeTwo
    };
}

export default useLikeTwo;
